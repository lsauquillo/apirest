const express =  require('express');
const cors = require('cors');

class Server{

  constructor(){
    this.app = express();
    this.port = process.env.PORT;
    this.usuariosPath = '/api/usuarios';

   this.middlewares();

    this.routes();
  }

  // Middlewares

  middlewares(){
    
    // cors
    this.app.use(cors());

    // Lectura y parseo del body
    this.app.use(express.json());

    // Directorio público
    this.app.use(express.static('public'))
  }

  // Rutas de la aplicación

  routes(){
    
    this.app.use(this.usuariosPath, require('../routes/usuarios'))

  }

  listen(){
    {
      this.app.listen( this.port,  ()=>{
        console.log('Server escuchando en el puerto ' + this.port);
      })
    }
  }
}

module.exports = Server;