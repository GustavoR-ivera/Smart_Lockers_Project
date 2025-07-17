from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from models import Prescripcion
from database import SessionLocal
 
router = APIRouter()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

#obtener las prescripciones de un usuario
@router.get("/consultar/{usuario_id}")
def consultar_prescripciones(usuario_id: int, db: Session = Depends(get_db)):
    try:
        #consulta prescripciones del usuario
        prescripciones = db.query(Prescripcion).filter(Prescripcion.usuario_id == usuario_id)
        return prescripciones.all()
    except Exception as e:
        raise HTTPException(status_code=500, detail="Error al consultar las prescripciones: " + str(e))

#consultar info de una prescripcion especifica
@router.get("/consultar/prescripcion_id/{prescripcion_id}")
def consultar_prescripcion(prescripcion_id: int, db: Session = Depends(get_db)):
    try:
        #consulta prescripcion especifica
        prescripcion = db.query(Prescripcion).filter(Prescripcion.id == prescripcion_id).first()
        if not prescripcion:
            raise HTTPException(status_code=404, detail="Prescripción no encontrada")
        return prescripcion
    except Exception as e:
        raise HTTPException(status_code=500, detail="Error al consultar la prescripción: " + str(e))