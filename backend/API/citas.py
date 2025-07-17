from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from models import Cita
from database import SessionLocal
from datetime import datetime
import random

router = APIRouter()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

#aagendamiento cita, los parametros se envian como query params
@router.post("/agendar")
def agendar_cita(usuario_id: int, fecha_hora: datetime, lugar: str, prescripcion_id: int, db: Session = Depends(get_db)):
        
    #id casillero, por defecto se indica el numero1
    # Generar código de recolección
    codigo_acceso = str(random.randint(100000, 999999))

    # Registrar cita
    nueva_cita = Cita(
        usuario_id=usuario_id,
        lugar=lugar,
        prescripcion_id=prescripcion_id,
        casillero_id = 1,
        fecha_hora=fecha_hora,
        codigo=codigo_acceso
    )
    try:
        db.add(nueva_cita)
        db.commit()
        db.refresh(nueva_cita)

        return {
            "message": "Cita agendada exitosamente.",
            "codigo_acceso": codigo_acceso
        }
    except Exception as e:
        db.rollback()
        raise HTTPException(status_code=500, detail="Error al agendar la cita: " + str(e))
    
# validar si el usuario tiene una cita agendada para una prescripcion especifica
@router.get("/consultar/{usuario_id}/{prescripcion_id}")
def consultar_citas_por_prescripcion(usuario_id: int, prescripcion_id: int, db: Session = Depends(get_db)):
    try:
        #consulta citas agendadas para una prescripcion
        citas = db.query(Cita).filter((Cita.usuario_id == usuario_id) & (Cita.prescripcion_id == prescripcion_id)).all()
        return citas
    except Exception as e:
        raise HTTPException(status_code=500, detail="Error al consultar citas: " + str(e))


# validar citas agendadas para un usuario 
@router.get("/consultar/{usuario_id}")
def consultar_citas(usuario_id: int, db: Session = Depends(get_db)):
    try:
        #consulta citas agendadas
        citas = db.query(Cita).filter(Cita.usuario_id == usuario_id).all()
        return citas
    except Exception as e:
        raise HTTPException(status_code=500, detail="Error al consultar citas: " + str(e))

