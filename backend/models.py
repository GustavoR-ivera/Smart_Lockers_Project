
from sqlalchemy import Column, Integer, String, Float, DateTime, ForeignKey, Boolean, TIMESTAMP
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from database import Base

# definicion de modelo ORM de prueba
class Data(Base):
    # asociacion del modelo con la tabla "data"
    __tablename__ = "data"

    # relacion de campos de la tabla
    id = Column(Integer, primary_key=True, index=True)
    temperature = Column(Float, nullable=False)
    created_at = Column(TIMESTAMP, server_default=func.now())


#modelos asociados al negocio smart-lockers-system

class Usuario(Base):
    __tablename__ = "usuarios"

    id = Column(Integer, primary_key=True)
    nombre = Column(String, nullable=False)
    apellido = Column(String, nullable=False)
    cedula = Column(String, unique=True, nullable=False)
    email = Column(String, unique=True, nullable=False)
    telefono = Column(String, nullable=True)
    created_at = Column(DateTime, server_default=func.now())

    citas = relationship("Cita", back_populates="usuario", cascade="all, delete-orphan")
    prescripciones = relationship("Prescripcion", back_populates="usuario", cascade="all, delete-orphan")


class Casillero(Base):
    __tablename__ = "casilleros"

    id = Column(Integer, primary_key=True)
    ubicacion = Column(String, nullable=False)
    equipamento = Column(String, nullable=True)
    temperatura = Column(Float, nullable=True)
    humedad = Column(Float, nullable=True)
    objeto_detectado = Column(Boolean, default=False, nullable=True)
    estado = Column(String, default="disponible", nullable=True)    
    created_at = Column(DateTime, server_default=func.now())

    citas = relationship("Cita", back_populates="casillero")


class Prescripcion(Base):
    __tablename__ = "prescripciones"

    id = Column(Integer, primary_key=True)
    descripcion = Column(String, nullable=False)
    usuario_id = Column(Integer, ForeignKey("usuarios.id"), nullable=False)
    usuario = relationship("Usuario", back_populates="prescripciones")
    created_at = Column(DateTime, server_default=func.now())


    cita = relationship("Cita", back_populates="prescripcion", uselist=False)


class Cita(Base):
    __tablename__ = "citas"

    id = Column(Integer, primary_key=True)
    fecha_hora = Column(DateTime, nullable=False)
    lugar = Column(String, nullable=False)
    codigo = Column(String(6), nullable=False)
    estado = Column(String, default="pendiente")
    created_at = Column(DateTime, server_default=func.now())

    
    usuario_id = Column(Integer, ForeignKey("usuarios.id"), nullable=False)
    prescripcion_id = Column(Integer, ForeignKey("prescripciones.id"), unique=True, nullable=False)
    casillero_id = Column(Integer, ForeignKey("casilleros.id"), nullable=False)

    usuario = relationship("Usuario", back_populates="citas")
    prescripcion = relationship("Prescripcion", back_populates="cita", uselist=False)
    casillero = relationship("Casillero", back_populates="citas")
