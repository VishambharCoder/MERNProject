var Express = require("express");
var Mongoclient=require("mongodb").MongoClient;
var cors=require("cors");
const multer=require("multer");
const { MongoBulkWriteError, MongoClient } = require("mongodb");
var app=Express();
app.use(cors());


var CONNECTION_STRING="mongodb+srv://admin:admin123@cluster0.ihbj5tj.mongodb.net/?retryWrites=true&w=majority";









var DATABASENAME="ComputerPartsdb";
var database;


app.listen(5038,()=>{
    Mongoclient.connect(CONNECTION_STRING,(error,client)=>{
        database=client.db(DATABASENAME);
        console.log("Mongo DB Connection Successful");
    })
})

app.get('/ComputerPartsapi/ComputerParts/GetNotes',(request,response)=>{
    database.collection("ComputerPartsCollection").find({}).toArray((error,result)=>{
        response.send(result);
    })
})

app.post('/ComputerPartsapi/ComputerParts/AddNotes',multer().none(),(request,response)=>{
    database.collection("ComputerPartsCollection").count({},function(error,numOfDocs){
      database.collection("ComputerPartsCollection").insertOne({
        id:(numOfDocs+1).toString(),
        Product:request.body.newNotes,
        Price:request.body.newPriceNotes,
      });
      response.json("Added Successfully");    
    })
})
app.delete('/ComputerPartsapi/ComputerParts/DeleteNotes',(request,response)=>{
    database.collection("ComputerPartsCollection").deleteOne({
        id:request.query.id
    });
    response.json("Deleted Successfully");
})



