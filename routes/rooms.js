var express = require('express');
var router = express.Router();

var {web3,Web3, rentContract} = require("../web3_init");

var {Room} = require ("../mongoose_init")


//STUDENT -------------------------------------------------------------------------------------------------
router.get("/", async (req,res)=>{
    res.render("student/room_explorer")

})



//landlord --------------------------------------------------------------------------------------------------
router.get("/create",(req,res)=>{
    console.log(req.query.user)
    console.log(req.query.role)
    res.render("landlord/room_creation", {user: req.query.user, role:req.query.role})
})

router.post("/create",(req,res)=>{
    console.log(req.body.place)
    console.log(req.body.monthly_fee)
    console.log(req.body.num_beds)
    console.log("landlord:",req.body.landlord)

    var exp;
    if(req.body.expenses == "on") exp = true;
    else exp = false;
    var min = 1
    var max = 1000
    var num = Math.floor(Math.random() * 3)
    var rid = Math.floor(Math.random() * (max - min + 1)) + min
    var f = req.body.monthly_fee;
    var r = req.body.landlord;
    console.log("ahoas")

    var ri = [rid];
    var fe = [f];
    console.log(rid)
    console.log(ri,fe)
    rentContract.methods.register_rooms(ri,fe).send({from:r, gas:1000000})
    .then(result=>{
        console.log(result)
        console.log("successo");
    })
    .catch(err=>{
        console.log("error:",err);
    })
    var room1 = new Room({
        id : rid,
        address : req.body.place,
        beds : req.body.num_beds,
        fee : req.body.monthly_fee,
        exp_included : exp,
        landlord: req.body.landlord,
        image:num,
    })
    room1.save();
    res.render("landlord/home_landlord",{user:req.body.landlord, role:"landlord", title:"HouseBlocker"})
})

router.get("/get/all", (req,res)=>{
    Room.find({})
    .then(rooms=>{
        console.log(rooms)
        console.log(rooms[0].id)
        res.send(rooms)
    })
})


router.post("/initialize",(req,res)=>{
    // console.log(req)
    var addr = req.query.address;
    console.log("addr",addr);
    var rid = req.query.rid;
    console.log("rid",Number(rid));

    var user = req.query.user;
    console.log("user",user)

    rentContract.methods.initialize(addr, Number(rid)).send({from:user, gas:10000000})
    .then(result=>{
        console.log(result)
    })
    .catch((err)=>{
        console.log(err);
    })

})


module.exports = router;