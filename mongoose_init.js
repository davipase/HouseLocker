const mongoose = require('mongoose')

const hashSchema = new mongoose.Schema({
    hash: String,
})

const userchema = new mongoose.Schema({
    address:String,
    role:String,
})

const Hash = mongoose.model('Hash', hashSchema);
const User = mongoose.model('User', userchema);

mongoose.connect('mongodb+srv://davidepasetto1:ba14thg5OpUczEPP@houseblocker.llcycrt.mongodb.net/?retryWrites=true&w=majority',
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        // useFindAndModify: false
    })
    .then(()=>{
        console.log("success")
        // const hash1 = new Hash({hash:"provaprova"})
        // hash1.save();
    })
    .catch(err=>{
        console.log("error:",err)
    })

module.exports = {Hash,User}