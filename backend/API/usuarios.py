from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from database import SessionLocal
from models import Usuario

router = APIRouter()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

#consultar el usuario que tenga el doc. indicado
@router.get("/validar/{documento}")
def validar_usuario(documento: str, db: Session = Depends(get_db)):
    usuario = db.query(Usuario).filter(Usuario.cedula == documento).first()
    if usuario:
        #print({"valid": True, "usuario_id": usuario.id, "nombre": usuario.nombre, "apellido": usuario.apellido, "cedula": usuario.cedula})
        return {"valid": True, "usuario_id": usuario.id, "nombre": usuario.nombre, "apellido": usuario.apellido, "cedula": usuario.cedula}
    return {"valid": False}
