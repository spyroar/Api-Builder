const express=require('express');
const routers=express.Router();
const fs = require('fs');
const path = require('path');     
var folderPath=path.join(__dirname, '../src')
const formidable = require('express-formidable');
const dataBaseModel=require('../models/schemaModel');
const qs = require('querystring');
routers.get('/home',async(req,res)=>{
     //create folder
        fs.mkdir(folderPath, (err) => {
      if(!err || (err && err.code === 'EEXIST')){
        fs.readFile('public/createserver.txt','utf-8',(err,data)=>{ 
          fs.writeFile(`${folderPath}/server.js`,data,async()=>{
             var dataBaseName=req.body.dataBaseName
             let dataForm_Path= path.join(__dirname,'../public','db.html')
      
            res.sendFile(dataForm_Path)

            // console.log("File Create SuccessFully");
     })

    });
      }
  if (err) {
      return console.error(err);
  }
  
  })
        
  })

  //  Create ModelName SchemaName CollectionName

   const publicPath=path.join(__dirname,"../public")
  //  console.log(publicPath);

  routers.post('/postData',(req,res)=>{
    
        fs.readFile(`${publicPath}/postdata.txt`,'utf-8',(err,data)=>{

         
          let modelName=req.body.modelName
          let schemaName=req.body.schemaName
          let collectionName=req.body.collectionName
          // console.log( data.includes('model')); 
          var Obj = {
            modelName:modelName ,
            schemaName: schemaName,
            collectionName:collectionName
        };  
        let dataPost= data.replace(/modelName|schemaName|collectionName/gi,function(matched){
            return Obj[matched];
        })  
        fs.writeFile(`${folderPath}/schemaModel.js`,dataPost,()=>{
          const pathSchema=path.join(__dirname,'../public','schema.html')
          //  console.log(dataPost);
          //  res.send(dataPost);
           res.sendFile(pathSchema)
 })

});  
     
      
  })

  // Create Schema Field Name

  routers.post('/create',(req,res)=>{

    
    //  console.log(req.body);
     fs.readFile('src/schemaModel.js','utf-8',(err,data)=>{
      
    //   let field=req.body
    //   // let field2=req.body.field2
    //   var Obj = { 
    //       // field:field,
    //       // // field2:field2
    //       // // data:req.body
    // };

     let filedData=[req.body]

           filedData.forEach((value)=>{
           let allKey=Object.values(value)

               for (let index = 0; index < allKey.length; index++) {
                 const element = allKey[index];

                  // let orgVal[element]= {"type:String"}
                  let dataElement={[element]:{type:"string"} }
                //  dataElement= JSON.stringify(dataElement).replace(/{}/,'');
                 dataElement= JSON.stringify(dataElement).replace(/[{}]/g,'');
                  // console.log(typeof(dataElement));
                dataPost= data.replace(/allKey/gi,JSON.stringify(dataElement))
                 
               }
              
        
              
        
      })  
   
    fs.writeFile(`${folderPath}/schemaModel.js`,dataPost,()=>{
      // 
        res.send(dataPost)
      
})

});  
       
  })
       
  routers.post('/dataCreate',(req,res)=>{
    
         res.send(req.body) 
  })
   
        // Create Database
         
          routers.post('/database',async(req,res)=>{
           const readData= fs.createReadStream('public/db.txt');
           const writeData=fs.createWriteStream('src/db.js')
          //  data.pipe(res)

          readData.on('data',async(chunk)=>{
            //  console.log(chunk.toString());

            let dataBaseName=req.body.dataBaseName
            const dataFromDataBase=new dataBaseModel({dataBaseName:dataBaseName});
            const dataUser= await dataFromDataBase.save();
           
            var Obj = {
              dataBaseName:dataBaseName
          }; 
      
            let dataPost= chunk.toString().replace(/dataBaseName/gi,function(matched){
              return Obj[matched];
            })
           writeData.write(dataPost);
           
           let dataForm_Path= path.join(__dirname,'../public','index.html')
           res.sendFile(dataForm_Path)
             

       })
        })
  routers.get('/dataform',(req,res)=>{
      
           let dataForm_Path= path.join(__dirname,'../public','index.html')
           res.sendFile(dataForm_Path)
  })

  routers.get('/schema',(req,res)=>{
    let dataForm_Path= path.join(__dirname,'../public','schema.html')
    res.sendFile(dataForm_Path)
  })

  routers.get('/database',(req,res)=>{
     let dataForm_Path= path.join(__dirname,'../public','db.html')
     res.sendFile(dataForm_Path)
  })
 module.exports=routers
















 