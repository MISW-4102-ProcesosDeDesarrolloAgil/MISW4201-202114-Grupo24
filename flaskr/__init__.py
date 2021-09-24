from flask import Flask

def create_app(config_name):
    app = Flask(__name__)  
    #app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///tutorial_canciones.db'
    app.config['SQLALCHEMY_DATABASE_URI'] = "postgresql://huxrrzeosbtwwc:2793dec6e7ba24633a32485950f132c5c357fa4b2e05d93189db5c2c7c14956d@ec2-35-171-171-27.compute-1.amazonaws.com:5432/d2skvblgapceqp"
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
    app.config['JWT_SECRET_KEY']='frase-secreta'
    app.config['PROPAGATE_EXCEPTIONS'] = True
    return app
