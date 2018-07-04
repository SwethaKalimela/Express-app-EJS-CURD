const express = require('express');
const router = express.Router();
const fs = require('fs');

let payroll = fs.readFileSync('./payroll.json');
let emppayroll = JSON.parse(payroll);
var employee = [" "];
var i = 0;
/*var i = 0;
console.log(emppayroll.length);
for (c of emppayroll){
if(c.name == "Anil" ){
employee = c;
console.log(employee.name);}
else if (i< 2){
console.log(i);    
i++;
continue;}
else{
console.log("not found");}
}*/

router.get('/:name', (req, res, next) => {
    const name = req.params.name;
    for (p of emppayroll) {
    if(p.name == name ){       
        employee = p;
        res.status(200).json({
            msg: "Your name has already been enrolled to the payroll",
            EmployeeRecord: employee
            
        }); 
    }
    else if (i < emppayroll.length-1) { 
        i++;continue;
    }
    else {
        res.status(200).json({
            msg: "please get yourself registered in the payroll"
        });
    }
}
});

/*--POST BLOCK--*/
var n = emppayroll.length;
router.post('/:ename/:age', (req, res, next) => {
    const aname = req.params.ename;
    const aage = req.params.age;
    emppayroll.push({name:aname,age:aage});
        res.status(200).json({
            msg: "You have been enrolled to the payroll",
            EmployeeName: emppayroll[n++].name      
        });
    console.log(emppayroll);
    /*var json = JSON.stringify("{"+"name"+":"+aname+","+"age"+":"+aage+"}");
    fs.appendFile("payroll.json", json, function (err) {
        if (err) throw err;
        console.log('Saved!');
      }); */
    //console.log(emppayroll);
});

/*--PUT BLOCK--*/
var jsonlength = emppayroll.length;
router.put('/:name/:prop/:value', (req, res, next) => {
    const  name = req.params.name;
    const  property = req.params.prop;
    const value = req.params.value;
    console.log(property);
    for (p of emppayroll) {
        if(p.name === name ){
            var index = emppayroll.findIndex(obj => obj.name== name);
            p.property = value;  
            res.status(200).json({                
                msg: "Your details has been successfully updated in the payroll",
                NewPayrollList: emppayroll[index]                
            });
        }
        else if (i < emppayroll.length-1) { 
            i++;continue;
        }
        else {
            res.status(200).json({
                msg: "Your entries in the payroll are not found"
            });
        }
    }
});

router.delete('/:ename', (req, res, next) => {
    const aname = req.params.ename;
    for (p of emppayroll) {
        if(p.name === aname ){
            var index = emppayroll.findIndex(obj => obj.name== aname);
            console.log(index);     
            delete emppayroll[index];
            emppayroll.splice(index,1);
            console.log(emppayroll);
            res.status(200).json({                
                msg: "Your name has been successfully removed from the payroll",
                NewPayrollList: emppayroll                
            });
        }
        else if (i < emppayroll.length-1) { 
            i++;continue;
        }
        else {
            res.status(200).json({
                msg: "Your entries in the payroll are not found"
            });
        }
    }
});


module.exports = router;