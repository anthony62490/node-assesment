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
      assigned_vehicle: 0,
      requested_music: 2
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
  ],
  music: [
    {
      id: 0,
      vibe:"Blessed Silence"
    },
    {
      id: 1,
      vibe:"I Like Surprises"
    },
    {
      id: 2,
      vibe:"Vaporwave Beats"
    },
    {
      id: 3,
      vibe:"Retro Synthwave"
    },
    {
      id: 4,
      vibe:"Country Tunes"
    },
    {
      id: 5,
      vibe:"Kicked-Out Jams"
    },
    {
      id: 6,
      vibe:"Jammed-Out Kicks"
    },
    {
      id: 7,
      vibe:"Top of the Charts"
    }
  ]
};

//importing validation functions used by the POST and PUT enpoints
const {
  validateTrip,
  validateDriver,
  validateVehicle,
  validateMusic
} = require('./validation_controller')

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
};

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
    res.status(200).send(results);
  }
  else {
    res.status(404).send('Requested trip not found');
  }
};

const  getDriver = (req, res, next) => {
  //check to see that DB has an entry for the supplied id
  let results = retrieveDBObjByID(Number(req.params.id), "drivers")
  if(results === -1) {
    res.status(500).send('Internal Server Error');
  }
  else if(results) {
    res.status(200).send(results);
  }
  else {
    res.status(404).send('Requested driver not found');
  }
};

const  getVehicle = (req, res, next) => {
  //check to see that the 'DB' has an entry for the supplied id
  let results = retrieveDBObjByID(Number(req.params.id), "cars");
  if(results === -1) {
    res.status(500).send('Internal Server Error');
  }
  else if(results) {
    res.status(200).send(results);
  }
  else {
    res.status(404).send('Requested vehicle not found');
  };
};

const getMusic = (req, res, next) => {
  let results = retrieveDBObjByID(Number(req.params.id), "music");
  if(results === -1) {
    res.status(500).send('Internal Server Error');
  }
  else if(results) {
    res.status(200).send(results);
  }
  else {
    res.status(404).send('Requested jam not found');
  };
};

const  getAllTrips = (req, res, next) => {
  res.status(200).send(DB.trips);
};

const  getAllDrivers = (req, res, next) => {
  res.status(200).send(DB.drivers);
};

const  getAllVehicles = (req, res, next) => {
    res.status(200).send(DB.cars);
};

const  getAllMusic = (req, res, next) => {
    res.status(200).send(DB.music);
};

//
// POST endpoints
//

const addTrip = (req, res, next) => {
  //send received object to validation function. Pass in a callback function that will let it have access to DB
  let tripObjValid = validateTrip(req.body, retrieveDBObjByID);

  if(tripObjValid.code !== 200) {
    res.status(tripObjValid.code).send(tripObjValid.message);
    return -1;
  }
  else if(tripObjValid.code === 200) {
  
    //Data should be good. Add it to DB
    let newId = DB.trips[DB.trips.length - 1].id + 1;
    DB.trips.push({
      //assign new id one higher than last existing id
      id: newId,
      eta: req.body.eta,
      start_location: req.body.start_location,
      end_location: req.body.end_location,
      payment: req.body.payment,
      customer_note: req.body.customer_note,
      est_fare_low: req.body.est_fare_high,
      est_fare_high: req.body.est_fare_low,
      assigned_driver: req.body.assigned_driver,
      assigned_vehicle: req.body.assigned_vehicle,
      requested_music: req.body.requested_music
    });
    res.status(200).send(newId + '');
  }
  else {
    //something went wrong
    console.log(`Error: validateTrip() returned code "${tripObjValid.code}" and message "${tripObjValid.message}"`);
  };
};

const  addDriver = (req, res, next) => {
  //send received object to validation function. No callback function is necessary since DB is not checked
  let driverObjValid = validateDriver(req.body);

  if(driverObjValid.code !== 200) {
    res.status(driverObjValid.code).send(driverObjValid.message);
    return -1;
  }
  else if(driverObjValid.code === 200) {

    //No errors. Data should be good. Add new driver to DB
    let newId = DB.drivers[DB.drivers.length - 1].id + 1;
    DB.drivers.push({
        //assign new id one higher than last existing id
        id: newId,
        name: req.body.name,
        profile_pic: req.body.profile_pic,
        bio: req.body.bio
    });
    res.status(200).send(newId + '');
  }
  else {
    //something went wrong
    console.log(`Error: validateDriver() returned code "${driverObjValid.code}" and message "${driverObjValid.message}"`);
  };
}

const addVehicle = (req, res, next) => {
  //send received object to validation function. No callback function is necessary since DB is not checked
  let vehicleObjValid = validateVehicle(req.body);

  if (vehicleObjValid.code !== 200) {
    res.status(vehicleObjValid.code).send(vehicleObjValid.message);
    return -1;
  }
  else if (vehicleObjValid.code === 200) {
    //No errors. Data should be good. Add new vehicle to DB
    let newId = DB.cars[DB.cars.length - 1].id + 1;
    DB.cars.push({
      //assign new id one higher than last existing id
      id: newId,
      name: req.body.name,
      year: req.body.year,
      make: req.body.make,
      model: req.body.model,
      color: req.body.color,
      pic: req.body.pic
    });
    res.status(200).send(newId + '');
  } else {
    //something went wrong
    console.log(`Error: validateVehicle() returned code "${vehicleObjValid.code}" and message "${vehicleObjValid.message}"`);
  }
}

const  addMusic = (req, res, next) => {
  //send received object to validation function. No callback function is necessary since DB is not checked
  let musicObjValid = validateMusic(req.body);

  if(musicObjValid.code !== 200) {
    res.status(musicObjValid.code).send(musicObjValid.message);
    return -1;
  }
  else if(musicObjValid.code === 200) {
    //No errors. Data should be good. Add new music to DB
    let newId = DB.music[DB.music.length - 1].id + 1;
    DB.music.push({
        //assign new id one higher than last existing id
        id: newId,
        vibe: req.body.vibe
    });
    res.status(200).send(newId + '');
  } else {
    //something went wrong
    console.log(`Error: validateMusic() returned code "${musicObjValid.code}" and message "${musicObjValid.message}"`);
  }
}

//
// PUT endpoints
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
  getMusic,
  getAllTrips,
  getAllDrivers,
  getAllVehicles,
  getAllMusic,
  addTrip,
  addDriver,
  addVehicle,
  addMusic,
  changeStuff,
  deleteStuff,
  retrieveDBObjByID
};