var express = require('express');
const { convertToEthersBN } = require('truffle-contract/lib/utils');
var router = express.Router();

var {web3,Web3, rentContract} = require("../web3_init");

router.get("/", async (req,res)=>{
    res.render("send_money")
})

router.post("/student",(req,res)=>{
    // console.log(req)
    var qty = req.body.quantity;
    var sender_addr = req.body.sender;
    var receiver_addr = req.body.receiver;


    console.log("quantity:",qty,"\nsender:",sender_addr, "\nreceiver:",receiver_addr);

    rentContract.methods.student_pay_deposit().send({value: web3.utils.toWei(qty, 'ether'), from:sender_addr})
    .then(result=>{
        res.send(result)
    })
    .catch(err=>{
        res.send(err)
    })
    // .then(*
})

router.post("/landlord",(req,res)=>{
    // console.log(req)
    var qty = req.body.quantity;
    var sender_addr = req.body.sender;
    var receiver_addr = req.body.receiver;


    console.log("quantity:",qty,"\nsender:",sender_addr, "\nreceiver:",receiver_addr);

    rentContract.methods.landlord_pay_deposit().send({value: web3.utils.toWei(qty, 'ether'), from:sender_addr})
    .then(result=>{
        res.send(result)
    })
    .catch(err=>{
        res.send(err)
    })
    // .then(*
})

module.exports = router;