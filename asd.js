const fs = require("fs")

const reception = [
  {
    name: "nong quang huy",
    age: "20",
    sick: "Chấn thương sọ não",
    priority: 1,
    specialist: "Chấn thương",
    date: "3/21/2023, 9:28:10 PM",
    insurance: "2002",
  },
  {
    name: "1",
    age: "1",
    sick: "Cảm xoàn",
    priority: 20,
    specialist: "Tai mũi họng",
    date: "3/19/2023, 4:30:26 PM",
    insurance: "12121",
  },
  
  
];

const doctor = [
  { name: "Trung", slot: 2, currentSlot: 0, specialist: "Chấn thương" },
  { name: "Tâm", slot: 2, currentSlot: 0, specialist: "Chấn thương" },
  { name: "Lý", slot: 3, currentSlot: 0, specialist: "Tai mũi họng" },
  { name: "Hải", slot: 4, currentSlot: 0, specialist: "Tai mũi họng" },
  { name: "Trường", slot: 3, currentSlot: 0, specialist: "Mắt" },
  { name: "Minh", slot: 2, currentSlot: 0, specialist: "Mắt" },
  { name: "Nhân", slot: 4, currentSlot: 0, specialist: "Tim mạch" },
  { name: "Long", slot: 2, currentSlot: 0, specialist: "Tim mạch" },
];

var doctorMatch = [];
const arrMove = []

// const removeFromReception = (arrMove,reception)=>{
//   arrMove.map((x)=>{
//     const index = reception.indexOf(x)
//     reception.splice(index,1)
//   })
//   return reception
// }


for (let i = 0; i < reception.length; i++) {
  for (let j = 0; j < doctor.length; j++) {

    if (reception[i].specialist == doctor[j].specialist) {
    
      let dataDoctor = JSON.parse(fs.readFileSync(`./models/doctor/${doctor[j].name}.json`))


      // dataDoctor.push(reception[i])

      console.log(doctor[j].slot);


      // removeFromReception(arrMove,reception)

      // console.log(reception[i]);

      // fs.writeFileSync(`./models/doctor/${doctor[j].name}.json`,JSON.stringify(fileDoctor))
      

    }
  }
}


