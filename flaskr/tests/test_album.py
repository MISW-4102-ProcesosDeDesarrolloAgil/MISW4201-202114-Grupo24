import unittest
import requests
import responses
import json
from unittest.mock import patch

class vista_album_test(unittest.TestCase):

    @patch('requests.post')
    def testInsertarAlbumConGenero(self, mock_post):
        album = {
            "titulo": "prueba json",
            "anio": "2021",
            "genero": "SALSA",
            "descripcion": "Prueba descripcion json",
            "medio": "DISCO",
            "canciones":[]      
        }
        response = requests.post('http://localhost:5000/usuario/3/albumes', data=album, headers={'Content-Type': 'application/json', 'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJmcmVzaCI6ZmFsc2UsImlhdCI6MTYzMDgyMjQ5MSwianRpIjoiYjJmZDQyZDEtMjI4Ny00MGQ0LWExOGYtMzc1N2MxNDIzMTNjIiwidHlwZSI6ImFjY2VzcyIsInN1YiI6MywibmJmIjoxNjMwODIyNDkxLCJleHAiOjE2MzA4MjMzOTF9._DVz9CRfqyQRJKHDZsZloiRYI1-r2xAq0WCZ6UNMb5U'} )      
        mock_post.assert_called_with('http://localhost:5000/usuario/3/albumes', data=album, headers={'Content-Type': 'application/json', 'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJmcmVzaCI6ZmFsc2UsImlhdCI6MTYzMDgyMjQ5MSwianRpIjoiYjJmZDQyZDEtMjI4Ny00MGQ0LWExOGYtMzc1N2MxNDIzMTNjIiwidHlwZSI6ImFjY2VzcyIsInN1YiI6MywibmJmIjoxNjMwODIyNDkxLCJleHAiOjE2MzA4MjMzOTF9._DVz9CRfqyQRJKHDZsZloiRYI1-r2xAq0WCZ6UNMb5U'})

    @responses.activate
    def testListarAlbumConGenero(self):
        responses.add(**{
            'method'         : responses.GET,
            'url'            : 'http://localhost:5000/album/1',
            'status'         : 200,
            'content_type'   : 'application/json',
            'adding_headers' : {'X-Foo': 'Bar'}
        })
        response = requests.get('http://localhost:5000/album/1')
        self.assertEqual(200, response.status_code)

    def testListarGeneros(self):
        response = requests.get('http://localhost:5000/generos')
        print(response.content)



