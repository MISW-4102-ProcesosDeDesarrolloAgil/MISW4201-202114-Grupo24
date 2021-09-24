from flask_sqlalchemy import SQLAlchemy
from marshmallow_sqlalchemy import SQLAlchemyAutoSchema
from marshmallow import fields
import enum

db = SQLAlchemy()

albumes_canciones = db.Table('album_cancion',
    db.Column('album_id', db.Integer, db.ForeignKey('album.id'), primary_key = True),
    db.Column('cancion_id', db.Integer, db.ForeignKey('cancion.id'), primary_key = True))

class Medio(enum.Enum):
    DISCO = 1
    CASETE = 2
    CD = 3


"""Se adjunta atributo genero @William Sanchez"""
class Album(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    titulo = db.Column(db.String(128))
    anio = db.Column(db.Integer)
    descripcion = db.Column(db.String(512))
    medio = db.Column(db.Enum(Medio))
    usuario = db.Column(db.Integer, db.ForeignKey("usuario.id"))
    canciones = db.relationship('Cancion', secondary = 'album_cancion', back_populates="albumes")
    genero = db.Column(db.Integer, db.ForeignKey("genero.id"))

class EnumADiccionario(fields.Field):
    def _serialize(self, value, attr, obj, **kwargs):
     if value is None:
        return None
     return {"llave": value.name, "valor": value.value}


"""Se adjunta atributo genero @William Sanchez"""
class AlbumSchema(SQLAlchemyAutoSchema):
    medio = EnumADiccionario(attribute=("medio"))
    genero = EnumADiccionario(attribute=("genero"))
    class Meta: 
         model = Album
         include_relationships = True
         load_instance = True
