const express = require('express');
const path = require('path');

const app = express();

app.use(express.static(__dirname + '/front-end/tutorial-canciones/src'));

app.get('/*', function(req,res) {
res.sendFile(path.join(__dirname + '/front-end/tutorial-canciones/src/index.html'));
console.log("__dirname" +  __dirname)
});

app.listen(process.env.PORT || 5000);
