const express = require('express');
const path = require('path');

const app = express();

app.use(express.static(__dirname + '/front-end/tutorial-canciones/src'));

app.get('/*', function(req,res) {
res.sendFile(path.join('./front-end/tutorial-canciones/src/index.html'));
});

app.listen(process.env.PORT || 5000);
