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
  //expects an object containing an
  //eta:              String  24hour time of arrival
  //start_location:   String  starting address obtained from Maps. Lines delimited by a '%'
  //end_location:     String  destination address obtained from Maps. Lines delimited by a '%'
  //payment:          String  Name of payment option,
  //customer_note:    String,
  //est_fare_low:     Integer estimated low fare,
  //est_fare_high:    Integer estimated high fare,,
  //assigned_driver:  Integer id of assigned driver,
  //assigned_vehicle: Integer id of assigned vehicle,
  //requested_music:  Integer id of requested music

  let foundKeys = Object.keys(req.body);
  let expectedKeys = [
    'eta',
    'start_location',
    'end_location',
    'payment',
    'customer_note',
    'est_fare_low',
    'est_fare_high',
    'assigned_driver',
    'assigned_vehicle',
    'requested_music'];

  //checking that all expected keys are accounted for. missingKeys === [] if all keys are present
  missingKeys = expectedKeys.filter((e) => !foundKeys.includes(e));
  if (missingKeys.length) {
    errorStr = missingKeys.join(', ');
    res.status(400).send(`Bad Request. Missing values for ${errorStr}`);
    return -1;
  }

  //checking that provided values match required format

  //tests that eta is a valid time in 24hour format
  if (/([01]\d|2[0-3]):[0-5][0-9]/.test(req.body.eta) === false) {
    res.status(400).send('Malformed ETA. ETA should be a 24hour time with leading zeroes')
    return -1;
  };
  //checking that addresses match required format
  if (/[a-zA-Z0-9\s.',]+[%][a-zA-Z0-9\s.',]+/.test(req.body.start_location) === false ||
    /[a-zA-Z0-9\s.',]+[%][a-zA-Z0-9\s.',]+/.test(req.body.end_location) === false) {
    //this probably doesn't work for a large number of cases, but I figure that accurate error handling is beyond the scope of the project
    res.status(400).send('Malformed Address. Address should be a string with lines delimited by "%"')
    return -1;
  };
  //checking that estimated fares are integers and that they are in the right order
  if (!Number.isInteger(req.body.est_fare_low) || !Number.isInteger(req.body.est_fare_high)) {
    res.status(400).send('Malformed fare estimations. Fares must be integers')
    return -1;
  }
  if (req.body.est_fare_high < req.body.est_fare_low) {
    res.status(400).send('Bad fare estimations. Low fare must be the smaller value')
    return -1;
  }
  //checking that assigned driver exists
  if (!Number.isInteger(req.body.assigned_driver) ||
    !retrieveDBObjByID(Number(req.body.assigned_driver), "drivers")) {
    res.status(404).send('Requested driver id not found')
    return -1;
  }
  //checking that assigned vehicle exists
  if (!Number.isInteger(req.body.assigned_vehicle) ||
    !retrieveDBObjByID(Number(req.body.assigned_vehicle), "cars")) {
    res.status(404).send('Requested vehicle id not found')
    return -1;
  }
  //checking that music exists
  if (!Number.isInteger(req.body.assigned_vehicle) ||
    !retrieveDBObjByID(Number(req.body.requested_music), "music")) {
    res.status(404).send('Requested music id not found')
    return -1;
  }

  //if there hasn't been a 40X error by now, then the data should be good. Add it to DB
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

const  addDriver = (req, res, next) => {
  console.log(req.body);
}

const  addVehicle = (req, res, next) => {
  console.log(req.body);
}

const  addMusic = (req, res, next) => {
  console.log(req.body);
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
  deleteStuff
};