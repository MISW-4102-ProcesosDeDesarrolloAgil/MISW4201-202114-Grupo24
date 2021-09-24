from flask_sqlalchemy import SQLAlchemy
from marshmallow_sqlalchemy import SQLAlchemyAutoSchema
from marshmallow import fields

db = SQLAlchemy()

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
    genero = db.Column(db.Integer, db.ForeignKey("genero.id"))

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