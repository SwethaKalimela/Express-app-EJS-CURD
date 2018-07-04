const express = require('express');
const router = express.Router();
const fs = require('fs');

let payroll = fs.readFileSync('./payroll.json');
let emppayroll = JSON.parse(payroll);
var employee = [" "];
var i = 0;

router.get('/:name', (req,res,next) => {
    const name = req.params.name;
    for (p of emppayroll) {
    if(p.name == name ){       
        res.render('protfolioview',{data:p});
        
    } else if (i < emppayroll.length-1) { 
        i++;continue;
    } else {
        res.status(200).json({
            msg: "please get yourself registered in the payroll"
        });
    }
}
    
});

module.exports = router;