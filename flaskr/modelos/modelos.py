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

class Genero(enum.Enum):
    SALSA =1
    ROCK =2
    POP = 3
    BALADA = 4
    CLASICA = 5
    
class Cancion(db.Model):
    id = db.Column(db.Integer, primary_key = True)
    titulo = db.Column(db.String(128))
    minutos = db.Column(db.Integer)
    segundos = db.Column(db.Integer)
    interprete = db.Column(db.String(128))
    albumes = db.relationship('Album', secondary = 'album_cancion', back_populates="canciones")
    """ @farojasp1 se adiciona campo para marca favorita - HU25 """
    favorita = db.Column(db.Boolean)
    """ @farojasp1 se adiciona campo genero a la cancion - HU31"""
    genero = db.Column(db.Enum(Genero))

"""Se adjunta atributo genero @William Sanchez"""
class Album(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    titulo = db.Column(db.String(128))
    anio = db.Column(db.Integer)
    descripcion = db.Column(db.String(512))
    medio = db.Column(db.Enum(Medio))
    usuario = db.Column(db.Integer, db.ForeignKey("usuario.id"))
    canciones = db.relationship('Cancion', secondary = 'album_cancion', back_populates="albumes")
    genero = db.Column(db.Enum(Genero))
    
class Usuario(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    nombre = db.Column(db.String(50))
    contrasena = db.Column(db.String(50))
    albumes = db.relationship('Album', cascade='all, delete, delete-orphan')

class EnumADiccionario(fields.Field):
    def _serialize(self, value, attr, obj, **kwargs):
        if value is None:
            return None
        return {"llave": value.name, "valor": value.value}

""" @farojasp1 se adiciona el trabuto genero a la cancion - HU31 """
class CancionSchema(SQLAlchemyAutoSchema):
    genero = EnumADiccionario(attribute=("genero"))
    class Meta:
         model = Cancion
         include_relationships = True
         load_instance = True
         
"""Se adjunta atributo genero @William Sanchez"""
class AlbumSchema(SQLAlchemyAutoSchema):
    medio = EnumADiccionario(attribute=("medio"))
    genero = EnumADiccionario(attribute=("genero"))
    class Meta: 
         model = Album
         include_relationships = True
         load_instance = True

class UsuarioSchema(SQLAlchemyAutoSchema):
    class Meta:
         model = Usuario
         include_relationships = True
         load_instance = True