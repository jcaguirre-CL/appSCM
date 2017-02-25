var mongoose = require('mongoose');
var RegistroSchema = new mongoose.Schema({
  descripcion: String,
  completada: Boolean,
  responsable: String,
  operador: String,
  programa: String,
  areafalla: String,
  tipofalla: String,
  senal: String,
  servicio: String,
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
  commited_at: { type: Date },
  fechaevento: { type: Date },
});
module.exports = mongoose.model('Registro', RegistroSchema);
