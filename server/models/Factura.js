import mongoose from "mongoose";

const facturaSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Types.ObjectId },
    clientName: String,
    route: String,
    commerceName: String,
    city: String,
    billNumber: Number,
    cellphoneNumber: Number,
    vendorName: String,
    customerAdress: String,
    products: [
      {
        description: String,
        units: Number,
        unitValue: Number,
        totalValue: Number,
        docePaTrece: Number
      }
    ],
    totalValue: Number,
    estado: String,
  }
);

facturaSchema.pre('save', function (next) {
  const doc = this;
  if (doc.isNew) {
    // Encontrar el contador de facturas o crear uno nuevo
    Contador.findOneAndUpdate(
      { _id: 'billNumber' },
      { $inc: { sequence_value: 1 } },
      { upsert: true, new: true },
      function (error, contador) {
        if (error) return next(error);
        doc.billNumber = contador.sequence_value + 945; // A partir de 35
        next();
      }
    );
  } else {
    next();
  }
});

// Definir modelo
const Factura = mongoose.model('Factura', facturaSchema);

// Definir esquema para el contador de facturas
const contadorSchema = new mongoose.Schema({
  _id: {
    type: String,
    required: true
  },
  sequence_value: {
    type: Number,
    default: 0
  }
});

// Definir modelo para el contador de facturas
const Contador = mongoose.model('Contador', contadorSchema);

export default Factura;