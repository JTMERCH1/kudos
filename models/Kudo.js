const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var KudoSchema = new Schema ({
    title: String,
    bode: String,
    to: [
        {
            type: Schema.Types.ObjectId,
            ref: 'User'
        }
    ],
    from: [
        {
            type: Schema.Types.ObjectId,
            ref: 'User'
        }
    ]
});

const Kudo = mongoose.model("Kudo", KudoSchema)

module.exports = Kudo;