from flask_sqlalchemy import SQLAlchemy
from marshmallow_sqlalchemy import SQLAlchemyAutoSchema
from marshmallow import fields

db = SQLAlchemy()

class Genero(db.Model):
    id = db.Column(db.Integer, primary_key = True)
    descripcin = db.Column(db.String(128))
    