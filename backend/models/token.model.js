const mongoose = require('mongoose');

const tokenSchema = mongoose.Schema({

        userId:{
            type: mongoose.Schema.Types.ObjectId,
            required:true,
            ref: 'user',
        },
        token:{
            type: String,
            required:true,
        },
          expiresAt: {
            type: Date,
            required: true,
          },
},
{
    timestamps: true,
})


const  Token = mongoose.model('Token',tokenSchema);

module.exports = Token;