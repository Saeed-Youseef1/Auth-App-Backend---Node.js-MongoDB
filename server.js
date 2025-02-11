require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT;
const connectDB =require('./config/dbConn');
const corsOptions = require('./config/corsOptions');
const cookieParser = require('cookie-parser');
const routerRoot = require('./routes/root');
const routerAuth = require('./routes/auth');
const routerusers = require('./routes/userRoutes');
const path = require('path');
connectDB();

app.use(cookieParser());

app.use(cors(corsOptions));

app.use(express.json());


app.use("/",express.static(path.join(__dirname,"public")));

app.use("/",routerRoot);
app.use("/auth",routerAuth);
app.use("/users",routerusers);

app.all("*",(req,res) => {
    res.status(404);
    if(req.accepts("html")) {
        res.sendFile(path.join(__dirname,"views","404.html"));
    }else if(req.accepts("json")) {
        res.json({message:"404 Not Found"});
    }else {
        res.type('txt').send("404 Not Found");
    }
})

mongoose.connection.once('open',()=> {
    console.log('Database Is Connected')
    app.listen(PORT,()=> {
        console.log(`Server Running On Port ${PORT}`);
    })
})

mongoose.connection.on('error',(err)=>{ 
    console.log(err);
})


