var express = require('express');
const { default: Web3 } = require('web3');
var router = express.Router();

var {web3, bankContract} = require("../web3_init");



router.get('/', async (req, res, next) => {
  res.render('index', { title: 'Express' });
});



router.get("/check_full", async (req,res)=>{
    bankContract.methods.is_full().call().then(data=>{
      res.send(data)
    })
})



router.get("/quantity", async (req,res)=>{
  bankContract.methods.get_quantity().call().then(data=>{
    console.log("quantity:",data)
    res.send(data)
  })
})

router.get("/owner", async (req,res)=>{
  bankContract.methods.get_owner().call().then(data=>{
    console.log("owner:",data)
    res.send(data)
  })
})



router.get("/balance", async (req,res)=>{
  var account = req.query.account;
  var {web3} = require("../web3_init");
  web3.eth.getBalance(account, (err, wei)=>{
    var balance = web3.utils.fromWei(wei, 'ether')
    // res.send("<script> alert(balance)</script>")
    res.render("balance_show", {account: account, balance:balance})
  })  
})



module.exports = router;