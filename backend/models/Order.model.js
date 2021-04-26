const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    documentsUrl: {
      type: String,
      required: [true, 'Please submit your documents'],
    },
    orderDetails: {
      model: {
        type: String,
        required: true,
      },
      color: {
        type: String,
        required: true,
        enum: ['black', 'white', 'red', 'blue'],
      },
      engine: {
        type: String,
        required: true,
      },
      tires: {
        type: String,
        required: true,
      },
      fuel: {
        type: String,
        required: true,
      },
    },
    orderPrice: {
      type: Number,
      required: true,
      default: 0,
    },
    taxPrice: {
      type: Number,
      required: true,
      default: 0,
    },
    shippingPrice: {
      type: Number,
      required: true,
      default: 0,
    },
    totalPrice: {
      type: Number,
      required: true,
      default: 0,
    },
    shippingDetails: {
      addressLine1: {
        type: String,
        required: [true, 'Please provide shipping address line 1'],
      },
      addressLine2: {
        type: String,
        required: [true, 'Please provide shipping address line 2'],
      },
      city: {
        type: String,
        required: [true, 'Please provide the shipping city'],
      },
      state: {
        type: String,
        required: [true, 'Please provide the shipping state'],
      },
      pincode: {
        type: Number,
        required: [true, 'Please provide the shipping pincode'],
      },
      phoneNumber: {
        type: Number,
        required: [true, 'Please provide your phone number'],
      },
    },
    isPaid: {
      type: Boolean,
      default: false,
    },
    isDispatched: {
      type: Boolean,
      default: false,
    },
    paidAt: {
      type: Date,
    },
    dispatchedAt: {
      type: Date,
    },
    underReview: {
      type: Boolean,
      default: true,
    },
    reviewPassed: {
      type: Boolean,
    },
    razorpayOrderId: {
      type: String,
    },
    razorpayPaymentId: {
      type: String,
    },
    razorpaySignature: {
      type: String,
    },
    logisticsPartner: {
      type: String,
    },
    trackingId: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = Order = mongoose.model('Order', orderSchema);
