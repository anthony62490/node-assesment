var DB = {
  trips: [
    {
      id: 0,
      eta: "17:39",
      start_location: "449 Flora St.%Dallas, Texas 75201",
      end_location: "DFW International Airport%American Airlines Terminal E%Irving, Texas 75261",
      payment: "Amex01",
      customer_note: "Can you drop me off at AA International Bag Drop please?",
      est_fare_low: 65,
      est_fare_high: 75,
      assigned_driver: 0,
      assigned_vehicle: 0
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

function retrieveDBObjByID(id, searchType){
  //pass in an integer value and a string. The function will search DB for the appropriate object from the array matching the string and with an id matching the integer
  //The string should only be one of the values contained in DB's top layer. Anything else should return an error

  //get list of valid strings for error checking
  let validStrings = Object.keys(DB);

  if(!validStrings.includes(searchType)){
    //supplied search string was not valid. This indicates an internal server error, not one on the user's end
    return -1;
  }
  
  let searchResults = DB[searchType].filter((e) => e.id === id);
  return searchResults[0];
}

//
// GET Endpoints
//

const  getTrip = (req, res, next) => {
  //check to see that DB has an entry for the supplied id
  let results = retrieveDBObjByID(Number(req.params.id), "trips")
  if(results === -1) {
    res.status(500).send('Internal Server Error');
  }
  else if(results) {
    console.log('Found!');
    res.status(200).send(results);
  }
  else {
    console.log('Not Found!')
    res.status(404).send('Requested trip not found');
  }
}

const  getDriver = (req, res, next) => {
  //check to see that DB has an entry for the supplied id
  let results = retrieveDBObjByID(Number(req.params.id), "drivers")
  if(results === -1) {
    res.status(500).send('Internal Server Error');
  }
  else if(results) {
    console.log('Found!');
    res.status(200).send(results);
  }
  else {
    console.log('Not Found!')
    res.status(404).send('Requested driver not found');
  }
}

const  getVehicle = (req, res, next) => {
  //check to see that the 'DB' has an entry for the supplied id
  let results = retrieveDBObjByID(Number(req.params.id), "cars")
  if(results === -1) {
    res.status(500).send('Internal Server Error');
  }
  else if(results) {
    console.log('Found!');
    res.status(200).send(results);
  }
  else {
    console.log('Not Found!')
    res.status(404).send('Requested vehicle not found');
  }
}

const  getAllTrips = (req, res, next) => {
  res.status(200).send(DB.trips);
}

const  getAllDrivers = (req, res, next) => {
  res.status(200).send(DB.drivers);
}

const  getAllVehicles = (req, res, next) => {
    res.status(200).send(DB.cars);
}

//
// PUT endpoints
//

const  addTrip = (req, res, next) => {
  console.log(req.body);
}

const  addDriver = (req, res, next) => {
  console.log("EDIT!");
}

const  addVehicle = (req, res, next) => {
  console.log("EDIT!");
}

//
//
//

const  changeStuff = (req, res, next) => {
  console.log("CHANGE!");
}

const  deleteStuff = (req, res, next) => {
  console.log("D'ELIT!");
}

module.exports = 
{
  getTrip,
  getDriver,
  getVehicle,
  getAllTrips,
  getAllDrivers,
  getAllVehicles,
  addTrip,
  addDriver,
  addVehicle,
  changeStuff,
  deleteStuff
};