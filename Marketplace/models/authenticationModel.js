const mongoose = require('mongoose');

const AuthenticationSchema = new mongoose.Schema({
  email: {type: String,required: true,unique: true,},
  password: {type: String,required: true, },
  user: {type: mongoose.Schema.Types.ObjectId,ref: 'User',required: true,
  },
});

const Authentication = mongoose.model('Authentication', AuthenticationSchema);

module.exports = Authentication;
