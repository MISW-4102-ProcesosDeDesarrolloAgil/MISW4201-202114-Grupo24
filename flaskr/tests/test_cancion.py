import unittest
import json
from unittest import TestCase
from unittest.mock import patch
import requests

class VistaCancionTestCase (unittest.TestCase):
    def test_prueba(self):
        self.assertEqual(0, 0)
    
    def test_listaCanciones(self):
        """Prueba el listado de canciones"""
        ##info = {"titulo": "De Musica Ligera","minutos": 3,"segundos": 30,"interprete": "Soda Stereo","favorita":"true"}
        resp = requests.get("http://localhost:5000/canciones") 
                            ##data=json.dumps(info), 
                            ##headers={'Content-Type': 'application/json'})
        self.assertEqual(resp.status_code, 200)  

    def test_crearCancion(self):
        """Prueba la insersion de cancion nueva"""
        info = {
                "titulo": "De Musica Ligera",
                "minutos": 3,
                "segundos": 30,
                "interprete": "Soda Stereo",
                "favorita": True,
                "genero": "ROCK"
                }
        resp = requests.post("http://localhost:5000/canciones", 
                            data=json.dumps(info), 
                            headers={'Content-Type': 'application/json'})
        self.assertEqual(resp.status_code, 200)

    def test_modificarCancion(self):
        """Prueba la modificacion de cancion"""
        info = {
                "titulo": "De Musica Ligera",
                "minutos": 3,
                "segundos": 60,
                "interprete": "Soda Stereo",
                "favorita": False,
                "genero": "POP"
                }
        resp = requests.put("http://localhost:5000/cancion/34", 
                            data=json.dumps(info), 
                            headers={'Content-Type': 'application/json'})
        self.assertEqual(resp.status_code, 200)

