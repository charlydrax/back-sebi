const http = require('http');
const app = require('./app');
const port = 8080;

const express = require('express');
const router = require('./routes/users');
// const router = require('./routes/users');
app.use(express.json())
app.use(router)



const errorHandler = error => {
    if (error.syscall !== 'listen') {
      throw error;
    }
    const address = server.address();
    const bind = typeof address === 'string' ? 'pipe ' + address : 'port: ' + port;
    switch (error.code) {
      case 'EACCES':
        console.error(bind + ' requires elevated privileges.');
        process.exit(1);
        break;
      case 'EADDRINUSE':
        console.error(bind + ' is already in use.');
        process.exit(1);
        break;
      default:
        throw error;
    }
  };


app.get('/coucou', (req, res)=>{
    console.log("bon");
    res.status(200).send('envoie')
})
app.listen(port, () => {
    console.log(`Server is listening on port http://localhost:${port}`)
});