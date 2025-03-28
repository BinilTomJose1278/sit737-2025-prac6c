// express is imported to setup microservice
const express = require('express')
// app is the main Express object
const app = express();
// port where the project runs
const port = 3000;

// logging stuffs
const winston = require ('winston');
const logger = winston.createLogger({
level:'info',
format:winston.format.json(),
defaultMeta: {service : 'calculator-microservice'},
transports: [
    new winston.transports.Console({format:winston.format.simple()}),
    new winston.transports.File({filename:'logs/error.log', level:'error'}),
    new winston.transports.File({filename:'logs/combined.log'})
],
});
//log incoming requests 
app.use((req, res, next) => {
    const { method, url, headers, ip } = req;
    
    logger.info({
        message: 'Incoming Request',
        method,
        url,
        ip,
        headers
    });

   
    const originalSend = res.send;
    res.send = function (body) {
        logger.info({
            message: 'Outgoing Response',
            statusCode: res.statusCode,
            body
        });
        originalSend.call(this, body);
    };

    next();
});

//Calculate function
const calculate = (req,res,operation) =>{
    const num1 = parseFloat(req.query.num1);
    const num2 = parseFloat(req.query.num2);
    if (isNaN(num1) || isNaN(num2)){
        logger.error('Invalid input : not a number');
        return res.status(400).json({error:'Invalid input, num1 and num2 must be numbers.'})
    }
    let result;
    switch(operation){
        case 'add':result = num1+num2; break;
        case 'subtract':result = num1-num2;break;
        case 'multiply' : result = num1*num2;break;
        case 'divide':
            if(num2 === 0) return res.status(400).json({error:'Cannot divide by zero.'});
            result = num1 / num2;
            break;
            case 'power': result = Math.pow(num1,num2);
            case 'modulo' : 
            if(num2 === 0) return res.status(400).json({error: 'Cannot divide by zero.'});
            result = num1 / num2;
            break;
            case 'sqrt':
                if(num2<0) return res.status(400).json({error:'Cant get the square root of negative numbers'});
                result = Math.sqrt(num1,num2);

    }
    logger.info(`Operation: ${operation}, Inputs: ${num1}, ${num2}, Result: ${result}`);
    res.json({ result });
};


// Routes for arthimeticOperations
app.get('/add',(req,res) => calculate(req,res,'add'));
app.get('/subtract',(req,res) => calculate(req,res,'subtract'));
app.get('/multiply',(req,res) => calculate(req,res,'multiply'));
app.get('/divide',(req,res) => calculate(req,res,'divide'));
app.get('/power',(req,res) => calculate(req,res,'power'));
app.get('/modulo',(req,res) => calculate(req,res,'modulo'));
app.get('/sqrt',(req,res) => calculate(req,res,'sqrt'));



// Start server
app.listen(port, () => {
  logger.info(`Calculator microservice running on http://localhost:${port}`);
});