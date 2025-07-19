from sqlalchemy.orm import Session
from sqlalchemy import desc
from fastapi import APIRouter, HTTPException, Depends
from models import Data
from database import SessionLocal


router = APIRouter()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

#
@router.get("/data")
def obtener_datos(db: Session = Depends(get_db)):
    try:
        # Obtener los últimos 90 registros ordenados cronológicamente
        resultados = (
            db.query(Data)
            .order_by(desc(Data.created_at))
            .limit(40)
            .all()
        )
        # Revertir el orden
        resultados.reverse()
        # Formatear los resultados
        resultado_form = []
        for dato in resultados:
            resultado_form.append({
                "temperatura": dato.temperature,
                "humedad": dato.humidity,
                "tiempo": dato.created_at.strftime("%H:%M"),  # solo hora:minuto
            })


        return resultado_form
    except Exception as e:
        raise HTTPException(status_code=500, detail="Error al consultar datos del casillero " + str(e))
