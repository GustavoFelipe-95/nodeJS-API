const mongoose = require('mongoose');

const estacionamentoSchema = new mongoose.Schema(
    {
        paid: Boolean,
        left: Boolean,
        plate: String,
        reservation: String,
        parking_entrance: Date,
        parking_payment: Date,
        parking_exit: Date,
    },{
        timestamps: true,
    }
)

estacionamentoSchema.pre('save', function (next) {
    let now = Date.now();

    this.paid = false;
    this.left = false;
    this.parking_payment = null;
    this.parking_exit = null;

    if (!this.parking_entrance) {
      this.parking_entrance = now;
    }

    next()    
})

const EstacionamentoModel = mongoose.model('Estacionamento', estacionamentoSchema)

module.exports = EstacionamentoModel