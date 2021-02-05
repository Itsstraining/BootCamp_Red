const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
// const fireBaseAdmin = require('firebase-admin');
const mongoose = require('mongoose');


const connectionString =
  "mongodb+srv://admin:admin@cluster0.keosc.mongodb.net/tododb?retryWrites=true&w=majority";
mongoose.connect(connectionString, {useNewUrlParser: true, useUnifiedTopology: true});

const app = express();
app.use(bodyParser.json());
app.use(cors());

let Bird
let bird1

/**
 * @returns {Promise<mongoose.Connection>}
 */

 app.get('/birds',async(req,res)=>{
    let hung = await Bird.find();
    res.send({
        hung:hung
    })
 })

async function connectDb() {
    return new Promise((resolve, reject) => {
      const db = mongoose.connection;
      db.on("error", (err) => {
        reject("error");
      }),
        db.once("open", () => {
          console.log("Connect successfully");
          resolve(db);
        });
    });
  }
  

async function main() {
    try {
      let db = await connectDb();
      app.listen(8080, "0.0.0.0", () => {
        console.log("server is running !");
      });

    const birdSchema = new mongoose.Schema({
        name:String,
        img:String,
      });
    Bird = mongoose.model('Bird', birdSchema);
    bird1 = await Bird.create({ name: 'red',img:'https://drive.google.com/file/u/1/d/1COjU6heRzCcmDb_hGKzzLir1OoP0DGP2/view' });

    } catch (e) {
      console.error(e);
    }
  }

  
  main();
