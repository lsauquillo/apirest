const express =  require('express');
const cors = require('cors');
const { dbConnection } = require('../database/config');

class Server{

  constructor(){
    this.app = express();
    this.port = process.env.PORT;
    this.usuariosPath = '/api/usuarios';

    // conectar a la base de datos
    this.conectarDB()

    this.middlewares();

    this.routes();
  }

  async conectarDB(){
    await dbConnection()
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