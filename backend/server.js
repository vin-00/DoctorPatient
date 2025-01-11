const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors"); 

const Patient = require("./models/Patient");
const Doctor = require("./models/Doctor");
const Appointment = require("./models/Appointment");
const app = express();

app.use(express.json());
app.use(cors()); 


app.post("/sign-in", async (req, res) => {
  const { userType, username, password } = req.body;
  try {
    if (userType === "doctor") {
      const doctor = await Doctor.findOne({ username, password });
      if (doctor) {
        return res.status(200).json({ message: "Doctor signed in successfully", user: doctor });
      }
    } else if (userType === "patient") {
      const patient = await Patient.findOne({ username:username, password :password});
      
      if (patient) {
        return res.status(200).json({ message: "Patient signed in successfully", user: patient });
      }
    }
    res.status(401).json({ message: "Invalid credentials" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});

app.get("/doctors" , async(req,res)=>{
  const data = await Doctor.find();
  // console.log(data);
  res.send(data);
})

app.get("/doctor/:id" , async(req,res)=>{
  const {id} = req.params;
  // console.log(id);
  const data = await Doctor.findOne({_id:id});
  // console.log(data);
  res.send(data);
})

app.get("/appointment/:patientId/:doctorId" , async (req,res)=>{
  const {patientId , doctorId} = req.params;
  const a = await Appointment.find({patientId:patientId});
  for(let appoint of a){
    if(appoint.doctorId==doctorId){
      return res.send(false);
    }
  } 
  return res.send(true);
})

app.get("/appointments/:id/:type",async (req,res)=>{
  const {id , type} = req.params;
  // console.log(id,type);
  if(type=='patient'){
    const data = await Appointment.find({patientId : id}).populate("doctorId");
    // console.log(data);
    res.send(data);
  }
  else{ 
  const data = await Appointment.find({doctorId : id}).populate("patientId");
  // console.log(data);
  res.send(data);
  }
  
})

app.post("/appointment" ,async(req,res)=>{

  try{
    const a = new Appointment(req.body);
    const f = a.fees;
    const p = await Patient.findOne({_id : a.patientId})

    if(p.balance<f){
      return res.status(400).send("Not Enough Balance");
    }
    
    await Patient.updateOne({_id:a.patientId} , {balance: p.balance - f}); 
    await a.save();
    console.log("success");
    return res.status(200).send({message:"Success",fees:f});
  }
  catch(err){
    console.log(err);
    return res.status(400).send("Bad Request");
  }
})
// Connect to MongoDB and start server
mongoose
  .connect("mongodb://127.0.0.1:27017/hospital")
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(5000, () => console.log("Server running on port 5000"));
  })
  .catch((err) => console.error("MongoDB connection error:", err));
