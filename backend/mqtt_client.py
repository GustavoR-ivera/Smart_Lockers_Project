import paho.mqtt.client as mqtt
import json
from database import SessionLocal
from models import Data
from sqlalchemy.orm import Session
import os
from dotenv import load_dotenv

load_dotenv()

MQTT_BROKER = os.getenv("MQTT_BROKER", "localhost")
MQTT_PORT = int(os.getenv("MQTT_PORT", 1883))
MQTT_TOPIC = os.getenv("MQTT_TOPIC", "smart_locker/data")


#registro de datos en bd
def insert_data(payload):
    db: Session = SessionLocal()
    #recibir los datos desde el casillero { "humedad": 50, "temperatura": 23.7, "isEmpty": 1, "estado": "reservado"}
    #gestionar la actualizacion de los datos en bd
    #instancias modelo Data
    #asignar valor, el primer valor es el campo de la tabla
    data = Data(temperature=payload.get("temperatura"),
                humidity=payload.get("humedad"))
    db.add(data)
    db.commit()
    db.close()
    print(f"datos insertados en bd")

#funcion que maneja los mensajes recibidos del broker mqtt
def on_message(client, userdata, msg):
    try:
        #tratamiento de datos recibidos
        print(f"msg received: {msg.payload}")
        payload = json.loads(msg.payload.decode())
        print(f"payload: {payload} {type(payload)}")
        temperatura = float(payload.get("temperatura"))
        humedad = float(payload.get("humedad"))
        print(f"temperatura: {temperatura}, humedad: {humedad}")
        #insertar datos en la base de datos
        insert_data(payload)
    except Exception as e:
        print(f"Error procesando datos recibidos desde MQTT broker: {e}")


def start_mqtt():
    client = mqtt.Client()
    client.connect(MQTT_BROKER, MQTT_PORT, 60)
    client.subscribe(MQTT_TOPIC)
    client.on_message = on_message
    client.loop_start()
