const fs = require("fs");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Bootcamp = require("./models/Bootcamp");

dotenv.config({ path: './config/config.env' });

mongoose.connect(process.env.MONGOURI);

// Read the json file 
const bootcamp = JSON.parse( fs.readFileSync(`${__dirname}/_data/bootcamps.json`, 'utf-8') );

// Import Data
const importData = async() => {
  try {
    await Bootcamp.create(bootcamp);
    console.log("Data Imported...");
    process.exit();
  } catch (err) {
    console.error(err);
  }
}

// Delete Data 
const deleteData = async() => {
  try {
    await Bootcamp.deleteMany();
    console.log("Data Deleted...");
    process.exit();
  } catch (err) {
    console.error(err);
  }
}

if(process.argv[2] === "-i"){
  importData();
} else if(process.argv[2] === "-d"){
  deleteData();
}