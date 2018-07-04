const express = require('express');
const router = express.Router();
const fs = require('fs');

let payroll = fs.readFileSync('./payroll.json'); //reading the payroll json file
let emppayroll = JSON.parse(payroll);
var employee = [" "];
var i = 0;

/*--GET BLOCK--*/ 
router.get('/:name', (req, res, next) => { //To get the particular employee payroll record based on name in request params
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
router.post('/:ename/:age', (req, res, next) => {//To post the new employee record to emppayroll json, you could add all parameters as well like salary, age, etc
    const aname = req.params.ename;
    const aage = req.params.age;
    emppayroll.push({name:aname,age:aage});
        res.status(200).json({
            msg: "You have been enrolled to the payroll",
            EmployeeName: emppayroll[n++].name    //n reads current length of json object and inserts the new record at n+1 position  
        });
    console.log(emppayroll);
    /*var json = JSON.stringify("{"+"name"+":"+aname+","+"age"+":"+aage+"}"); //by executing the below code you could even post the new entries to payroll.json file 
    fs.appendFile("payroll.json", json, function (err) {
        if (err) throw err;
        console.log('Saved!');
      }); */
});

/*--PUT BLOCK--*/
var jsonlength = emppayroll.length;
router.put('/:name/:prop/:value', (req, res, next) => { //Put route allows you to update existing records based on name, you could also give the property name which you want to update by reading both property name and value from params
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

/*--DELETE BLOCK--*/
router.delete('/:ename', (req, res, next) => { //delete particular entry from emppayroll based on name from params
    const aname = req.params.ename;
    for (p of emppayroll) {
        if(p.name === aname ){
            var index = emppayroll.findIndex(obj => obj.name== aname);
            console.log(index);     
            delete emppayroll[index]; //after deleting we see null in Json object in place of deleted entry
            emppayroll.splice(index,1); //we are using splice to remove the null from json
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
