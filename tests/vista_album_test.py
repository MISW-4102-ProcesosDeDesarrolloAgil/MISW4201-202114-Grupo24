from werkzeug.wrappers import response
from flaskr.modelos.modelos import Album
import unittest
import json

from flaskr.vistas import VistaAlbum

class vista_album_test(unittest.TestCase):

    def setUp(self):
        self.app = VistaAlbum

    def testInsertarAlbumConGenero(self):
        album = json.dumps({
            "titulo": "prueba json",
            "anio": "2021",
            "genero": {
                    "llave": "SALSA",
                    "valor": 1
                    },
            "descripcion": "Prueba descripcion json",
            "medio": {
                    "llave": "DISCO",
                    "valor": 1
                    } 
        })

        response = self.app.post('/usuario/12345/albumes', headers={"Content-Type": "application/json"}, data=album)
        self.assertEqual(str, type(response.json['id']))
        self.assertEqual(200, response.status_code)