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

@router.get("/consultar/{usuario_id}")
def consultar_prescripciones(usuario_id: int, db: Session = Depends(get_db)):
    try:
        #consulta prescripciones del usuario
        prescripciones = db.query(Prescripcion).filter(Prescripcion.usuario_id == usuario_id)
        return prescripciones.all()
    except Exception as e:
        raise HTTPException(status_code=500, detail="Error al consultar las prescripciones: " + str(e))

