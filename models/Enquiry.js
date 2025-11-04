const mongoose = require('mongoose');

const enquirySchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: true 
},
  email: { 
    type: String, 
    required: true 
},
  courseInterest: { 
    type: String, 
    required: true 
},
  status: { 
    type: String, 
    enum: ['PUBLIC', 'CLAIMED'], 
    default: 'PUBLIC' 
},
  claimedBy: { type: mongoose.Schema.Types.ObjectId, 
    ref: 'Employee', 
    default: null 
},
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Enquiry', enquirySchema);
