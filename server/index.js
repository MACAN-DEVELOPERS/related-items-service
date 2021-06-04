const express = require('express');
const morgan = require('morgan');
var cors = require("cors");
const path = require('path');
const app = express();
app.use(cors());
const port = process.env.PORT || 3004;


const api = require ('./routes')
app.use("/products",api)
app.use("/products/reviews",api)



app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, '../public')));
app.use('*',(req,res)=>{
  res.sendFile(path.join(__dirname,'../public','index.html'))
})

app.listen(port, () => {
  console.log(`server running at: http://localhost:${port}`);
});
