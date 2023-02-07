const express=require('express');
const cors=require('cors');
const multer=require('multer');


const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const storage=multer.diskStorage({
  destination:(req,file,cb)=>{
    cb(null,'./uploads')
  },
  filename:(req,file,cb)=>{
    const ext = file.mimetype.split("/")[1];
    const uniqueSuffix=Date.now()+'-'+Math.round(Math.random()*1E9)
    cb(null,file.originalname+'-'+uniqueSuffix+'.'+ext);
  }
})

const upload = multer({
  storage:storage,
  limits:{fileSize:1000000},
  fileFilter:(req,file,cb)=>{
    const ext=file.mimetype.split('/')[1]
    console.log(ext,typeof(ext));
    if(ext !== 'png' && ext !== 'jpg' && ext !== 'jpeg'){
       return cb(new Error("Only images are allowed"));
    }
    console.log('hello');
    cb(null,true);
  }
});

// const upload=multer({dest:'uploads/'}).single('files');



app.post(
  "/upload_files",
  upload.fields([
    { name: "files", maxCount: 1 },
    { name: "gallery", maxCount: 2 },
  ]),
  (req, res) => {
    console.log("My name is Aashish Bhandari");
    console.log(req.files);
    console.log(req.body);
    console.log("Successfully uploaded files");
  }
);


app.listen(8000,()=>{
    console.log('Server started...');
});