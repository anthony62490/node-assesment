var DB = {
  trips: [
    {
      id: 0,
      eta: "17:39",
      start_location: "449 Flora St./Dallas, Texas 75201",
      end_location: "DFW International Airport/American Airlines Terminal E/Irving, Texas 75261",
      payment: "Amex01",
      customer_note: "Can you drop me off at AA International Bag Drop please?",
      est_fare_low: 65,
      est_fare_high: 75,
      assigned_driver: 0
    }
  ],
  drivers: [
    {
      id: 0,
      name: "Steph",
      profile_pic: "src/components/assets/profile1.png",
      bio: "Steph Festiculma is a graduate of Parsons New School in New York and fluent in Portugeuse, Spanish, and English. Steph has been driving with Alto since 2018."
    },
    {
      id: 1,
      name: "Craig",
      profile_pic: "src/components/assets/profile2.png",
      bio: "Craig is a graduate of Tokyo University of Drifting Science. In his spare time, he enjoys leisurely drives through the countryside at unsafe speeds. Craig has been driving with Alto since about two weeks ago."
    }
  ],
  cars: [
    {
      id: 0,
      name: "Alto09",
      year: 2019,
      make: "Volkwagen",
      model: "Atlas",
      color: "Pure White",
      pic: "src/components/assets/car1.png"
    },
    {
      id: 1,
      name: "Alto01",
      year: 2013,
      make: "BMW",
      model: "320i",
      color: "Blue",
      pic: "src/components/assets/car2.png"
    }
  ]
};

const  getStuff = (req, res, next) => {
  console.log("SERVE!");
}

const  addStuff = (req, res, next) => {
  console.log("EDIT!");
}

const  changeStuff = (req, res, next) => {
  console.log("CHANGE!");
}

const  deleteStuff = (req, res, next) => {
  console.log("D'ELIT!");
}

module.exports = 
{
  getStuff,
  addStuff,
  changeStuff,
  deleteStuff
};