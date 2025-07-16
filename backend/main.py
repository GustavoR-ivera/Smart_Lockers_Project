from fastapi import FastAPI
from contextlib import asynccontextmanager
from mqtt_client import start_mqtt
from API import usuarios, prescripciones, citas
from fastapi.middleware.cors import CORSMiddleware



#declaracion de contexto para manejar el ciclo de vida de la aplicacion
@asynccontextmanager
async def lifespan(app: FastAPI):
    #iniciar el cliente mqtt y suscribirse al tema/canal
    print("cliente mqtt iniciado")
    start_mqtt()
    yield
    #todo lo que esta después de yield se ejecuta al apagar la aplicacion
    print("servidor backend terminado")

#creacion de aplicacion
app = FastAPI(lifespan=lifespan)


#configuracion de CORS para permitir peticiones desde el frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # ["http://localhost:5173"] frontend
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)



#usar las rutas del modulo usuarios
app.include_router(usuarios.router, prefix="/usuarios", tags=["usuarios"])
#prescripciones
app.include_router(prescripciones.router, prefix="/prescripciones", tags=["prescripciones"])
#citas
app.include_router(citas.router, prefix="/citas", tags=["citas"])


