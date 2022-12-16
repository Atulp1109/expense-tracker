const mongoose = require("mongoose");



mongoose.set('strictQuery',false);
const conn = mongoose.connect(process.env.ATLAS_URI)
    .then(db=>{
        console.log("database connected");
    }).catch(err=>{
        console.log("connection error")
    });


module.exports=conn;