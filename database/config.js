const mongoose = require('mongoose');

const dbConnection = async ()=>{
  try {
    await mongoose.connect(process.env.MONGODB_ATLAS, {
      useNewUrlParser: true,
      useUnifiedTopology: true,      
      useCreateIndex: true,
      useFindAndModify: false
    });
    console.log('Base de datos online...');
  } catch (error) {
    console.log(error);
    throw new Error("Problema al conectar con la base de datoss")
  }
}

module.exports = {
  dbConnection
}

