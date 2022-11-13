const mongoose = require('mongoose');

const ParkingSchema = new mongoose.Schema(
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

ParkingSchema.pre('save', function (next) {
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

const ParkingModel = mongoose.model('Parking', ParkingSchema)

module.exports = ParkingModel
