const express = require('express')
const path = require('path')
const cors = require('cors')
const app = express()

app.use(express.json())
app.use(cors());
// include and initialize the rollbar library with your access token
var Rollbar = require('rollbar')
var rollbar = new Rollbar({
  accessToken: '89d90b1aa3c94d30bdc3637c333eb26d',
  captureUncaught: true,
  captureUnhandledRejections: true,
})

// record a generic message and send it to Rollbar
rollbar.log('Hello world!')

app.get('/',(req,res)=>{
    res.sendFile(path.join(__dirname, '../index.html'))

})
try{
app.get('/bob',(req, res)=>{
    res.sendFile(path.join(__dirname, '../styles.css'))
})
} catch(error){
    rollbar.info('broken callback is broken (:')
}
app.get('/css', (req, res) => {
    res.sendFile(path.join(__dirname, '../styles.css'))
})
app.get('/js', (req, res) => {
    res.sendFile(path.join(__dirname, '../main.js'))
})
const port = process.env.PORT
|| 4005

app.listen(port, ()=> {
    console.log(`server is running ${port}`)
})
