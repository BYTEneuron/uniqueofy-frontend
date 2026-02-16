const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    services: [{
        name: String,
        price: Number,
        // Add other service details as needed
    }],
    serviceDate: { type: Date, required: true },
    address: { type: String, required: true },
    notes: { type: String },
    paymentStatus: { type: String, enum: ['pending', 'paid'], default: 'pending' },
    amount: { type: Number, default: 0 },
    paymentReady: { type: Boolean, default: false }
}, { timestamps: true });

module.exports = mongoose.model('Order', orderSchema);