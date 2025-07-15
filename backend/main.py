from fastapi import FastAPI
from contextlib import asynccontextmanager
from mqtt_client import start_mqtt

#declaracion de contexto para manejar el ciclo de vida de la aplicacion
@asynccontextmanager
async def lifespan(app: FastAPI):
    #iniciar el cliente mqtt y suscribirse al tema/canal
    print("cliente mqtt iniciado")
    start_mqtt()
    yield
    #todo lo que esta después de yield se ejecuta al apagar la aplicacion
    print("servidor backend terminado")

app = FastAPI(lifespan=lifespan)
