const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const multer = require('multer');
const path = require('path');
const routesApi = require('./routes/api');
const PORT = process.env.PORT || 5050;


const storage = multer.diskStorage({
  destination: './photos/uploads/',
  filename: (req, res, cb) =>{
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
  }
})
const upload = multer({
  storage: storage,
  limits:{fileSize: 10}
}).array('myphotos',[ 10])
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}))
app.use('/api', routesApi);
app.use(express.static('./uploads'))
app.get('/',(req, res)=>{
  res.send('I am working now')
})
app.get('/test',(req,res)=>{
  res.render('index',(err, html)=>{
    res.send(html);
  })
})
app.use(function(req, res, next) {
  const err = new Error('Not Found')
  err.status = 404
  next(err)
  res.send(`Please head back to the main page ${PORT}`)
})

app.use((err, req, res, next)=>{
  console.error(err.stack)
  res.status(500).send('Something broke!')
})



// app.post('/photos', (req, res) =>{
//   upload(req, res,(err) => {
//
//   })
// })
app.listen(PORT,()=>{
  console.log(`Listening on ${PORT}`);
})
