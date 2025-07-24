import paho.mqtt.client as mqtt
import json
from database import SessionLocal
from models import Data, Cita, Casillero
from sqlalchemy.orm import Session
import os
from dotenv import load_dotenv

load_dotenv()

MQTT_BROKER = os.getenv("MQTT_BROKER", "localhost")
MQTT_PORT = int(os.getenv("MQTT_PORT", 1883))
MQTT_TOPIC = os.getenv("MQTT_TOPIC", "ESP2APP")


#registro de datos en bd
def insert_data(data):
    db: Session = SessionLocal()
    #recibir los datos desde el casillero
    humedad = data[0]
    temperatura = data[1]
    objeto = data[2]
    estado_recoleccion = data[3]

    #gestionar la actualizacion de los datos en bd
    #instanciar modelo Data (registro historico de mediciones)
    #asignar valor, el primer valor es el campo de la tabla
    data = Data(temperature=temperatura,
                humidity=humedad)
    db.add(data)

    #actualizar estado de la cita (la unica agendada)
    if estado_recoleccion:
        # Buscar la única cita pendiente del unico casillero
        cita = db.query(Cita).filter(
            Cita.estado == "pendiente"
        ).first()

        if cita:
            cita.estado = "entregado"
            db.add(cita)  # opcional, SQLAlchemy la marca como dirty automáticamente
            print(f"Cita con ID {cita.id} actualizada a estado 'entregado'")
        else:
            print("No se encontró cita pendiente para actualizar")

    #actualizar (el unico casillero que hay) a la ultima medicion de variables en tabla casilleros 
    casillero = db.query(Casillero).first()

    if casillero:
        casillero.temperatura = temperatura
        casillero.humedad = humedad
        casillero.objeto_detectado = objeto
        print(f"Casillero ID {casillero.id} actualizado con ultima medicion")

    db.commit()
    db.close()
    print(f"datos insertados en bd")

#funcion que maneja los mensajes recibidos del broker mqtt
def on_message(client, userdata, msg):
    try:
        #tratamiento de datos recibidos
        print(f"msg received: {msg.payload}")
        payload = msg.payload.decode()
        print(f"payload: {payload} type {type(payload)}")

        #obtener cada dato de la cadena original y guardarla sin espacios adicionales en una
        #lista de elementos de tipo float
        data = [float(item.strip()) for item in payload.split(":")]
        print(f"data: {data} type {type(data)}")
        #obtener datos individuales
        humedad = data[0]
        temperatura = data[1]
        objeto = data[2]
        estado_recoleccion = data[3]
        print(f"temperatura: {temperatura}, humedad: {humedad}, objeto: {objeto}, estado_recoleccion: {estado_recoleccion}")
        #insertar datos en la base de datos
        insert_data(data)
    except Exception as e:
        print(f"Error procesando datos recibidos desde MQTT broker: {e}")


def start_mqtt():
    client = mqtt.Client()
    client.connect(MQTT_BROKER, MQTT_PORT, 60)
    client.subscribe(MQTT_TOPIC)
    client.on_message = on_message
    client.loop_start()
