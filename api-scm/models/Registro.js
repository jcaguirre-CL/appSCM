var mongoose = require('mongoose');
var RegistroSchema = new mongoose.Schema({
  titulo: String,
  descripcion: String,
  completada: Boolean,
  responsable: String,
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
  commited_at: { type: Date },
});
module.exports = mongoose.model('Registro', RegistroSchema);
