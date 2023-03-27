const fs = require("fs");

const reception = require("./models/reception.json")

const removeReception =(arrMove,reception)=>{
  arrMove.map((item)=>{
    const index = reception.indexOf(item)
    reception.splice(index,1)
  })
  return reception;
}


const doctor = JSON.parse(fs.readFileSync("./models/doctor/doctor.json"))

let data = []

for (let i = 0; i < reception.length; i++) {

  const patient = reception[i];

  for (let j = 0; j < doctor.length; j++) {

    const doc = doctor[j];

    const fileName = `./models/doctor/${doc.name}.json`;

    data = JSON.parse(fs.readFileSync(fileName))

    if (patient.specialist === doc.specialist && data.length < doc.slot) {

      data.push(patient);

      fs.writeFileSync(fileName, JSON.stringify(data));

      break;

    }
  }
}

fs.writeFileSync("./models/reception.json",JSON.stringify(removeReception(data,reception)))


