//the other controller got very messy with input validation code, so I moved all of that here to keep it all in one place

const validateTrip = (
  objToValidate,
  retrieveDBObjByID = require("./controller")
) => {
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

  let foundKeys = Object.keys(objToValidate);
  let expectedKeys = [
    "eta",
    "start_location",
    "end_location",
    "payment",
    "customer_note",
    "est_fare_low",
    "est_fare_high",
    "assigned_driver",
    "assigned_vehicle",
    "requested_music"
  ];

  //checking that all expected keys are accounted for. missingKeys === [] if all keys are present
  missingKeys = expectedKeys.filter(e => !foundKeys.includes(e));
  if (missingKeys.length) {
    errorStr = missingKeys.join(", ");
    return {
      code: 400,
      message: `Bad Request. Missing values for ${errorStr}`
    };
  }

  //checking that provided values match required format

  //tests that eta is a valid time in 24hour format
  if (/([01]\d|2[0-3]):[0-5][0-9]/.test(objToValidate.eta) === false) {
    return {
      code: 400,
      message: "Malformed ETA. ETA should be a 24hour time with leading zeroes"
    };
  }
  //checking that addresses match required format
  if (
    /[a-zA-Z0-9\s.',]+[%][a-zA-Z0-9\s.',]+/.test(
      objToValidate.start_location
    ) === false ||
    /[a-zA-Z0-9\s.',]+[%][a-zA-Z0-9\s.',]+/.test(objToValidate.end_location) ===
      false
  ) {
    //this probably doesn't work for a large number of cases, but I figure that accurate error handling is beyond the scope of the project
    return {
      code: 400,
      message:
        'Malformed Address. Address should be a string with lines delimited by "%"'
    };
  }
  //checking that estimated fares are integers and that they are in the right order
  if (
    !Number.isInteger(objToValidate.est_fare_low) ||
    !Number.isInteger(objToValidate.est_fare_high)
  ) {
    return {
      code: 400,
      message: "Malformed fare estimations. Fares must be integers"
    };
  }
  if (objToValidate.est_fare_high < objToValidate.est_fare_low) {
    return {
      code: 400,
      message: "Bad fare estimations. Low fare must be the smaller value"
    };
  }
  //checking that assigned driver exists
  if (
    !Number.isInteger(objToValidate.assigned_driver) ||
    !retrieveDBObjByID(Number(objToValidate.assigned_driver), "drivers")
  ) {
    return {
      code: 404,
      message: "Requested driver id not found"
    };
  }
  //checking that assigned vehicle exists
  if (
    !Number.isInteger(objToValidate.assigned_vehicle) ||
    !retrieveDBObjByID(Number(objToValidate.assigned_vehicle), "cars")
  ) {
    return {
      code: 404,
      message: "Requested vehicle id not found"
    };
  }
  //checking that music exists
  if (
    !Number.isInteger(objToValidate.assigned_vehicle) ||
    !retrieveDBObjByID(Number(objToValidate.requested_music), "music")
  ) {
    return {
      code: 404,
      message: "Requested music id not found"
    };
  }
  return {
    code: 200,
    message: ""
  };
};

const validateDriver = objToValidate => {
  //expects an object containing an
  //name:         String
  //profile_pic:  String  file path or URL to picture
  //bio:          String

  let foundKeys = Object.keys(objToValidate);
  let expectedKeys = ["name", "profile_pic", "bio"];

  //checking that all expected keys are accounted for. missingKeys === [] if all keys are present
  missingKeys = expectedKeys.filter(e => !foundKeys.includes(e));
  if (missingKeys.length) {
    errorStr = missingKeys.join(", ");
    return {
      code: 400,
      message: `Bad Request. Missing values for ${errorStr}`
    };
  }

  //checking that provided values match required format

  //tests that name is string
  if (typeof objToValidate.name !== "string") {
    return {
      code: 400,
      message: "name should be a string"
    };
  }
  //tests that profile_pic is a filepath
  if (
    /([a-zA-Z0-9-/_ ]+)\.(png|jpg|bmp)+/.test(objToValidate.profile_pic) ===
    false
  ) {
    return {
      code: 400,
      message: "profile_pic should be a filepath"
    };
  }
  //tests that bio is string
  if (typeof objToValidate.bio !== "string") {
    return {
      code: 400,
      message: "bio should be a string"
    };
  }
  return {
    code: 200,
    message: ""
  };
};

const validateVehicle = objToValidate => {
  //expects an object containing an
  //name:         String
  //year:         Integer 4 digits starting with 19/20
  //make:         String
  //model:        String
  //color:        String
  //pic:          String filename

  let foundKeys = Object.keys(objToValidate);
  let expectedKeys = ["name", "year", "make", "model", "color", "pic"];

  //checking that all expected keys are accounted for. missingKeys === [] if all keys are present
  missingKeys = expectedKeys.filter(e => !foundKeys.includes(e));
  if (missingKeys.length) {
    errorStr = missingKeys.join(", ");
    return {
      code: 400,
      message: `Bad Request. Missing values for ${errorStr}`
    };
  }

  //checking that provided values match required format

  //tests that name is string
  if (typeof objToValidate.name !== "string") {
    return {
      code: 400,
      message: "name should be a string"
    };
  }
  //tests that year is an integer between 1900 and 2099
  if (
    typeof objToValidate.year !== "number" ||
    objToValidate.year <= 1900 ||
    objToValidate.year >= 2099
  ) {
    return {
      code: 400,
      message: "year should be an integer between 1900 and 2099"
    };
  }
  //tests that make is string
  if (typeof objToValidate.make !== "string") {
    return {
      code: 400,
      message: "make should be a string"
    };
  }
  //tests that model is string
  if (typeof objToValidate.model !== "string") {
    return {
      code: 400,
      message: "model should be a string"
    };
  }
  //tests that color is string
  if (typeof objToValidate.color !== "string") {
    return {
      code: 400,
      message: "color should be a string"
    };
  }
  //tests that profile_pic is a filepath
  if (/([a-zA-Z0-9-/_ ]+)\.(png|jpg|bmp)+/.test(objToValidate.pic) === false) {
    return {
      code: 400,
      message: "pic should be a filepath"
    };
  }
  return {
    code: 200,
    message: ""
  };
};

const validateMusic = objToValidate => {
  //expects an object containing an
  //vibe:  String

  let foundKeys = Object.keys(objToValidate);
  let expectedKeys = ["vibe"];

  //checking that all expected keys are accounted for. missingKeys === [] if all keys are present
  missingKeys = expectedKeys.filter(e => !foundKeys.includes(e));
  if (missingKeys.length) {
    errorStr = missingKeys.join(", ");
    return {
      code: 400,
      message: `Bad Request. Missing values for ${errorStr}`
    };
  }

  //checking that provided values match required format

  //tests that vibe is string
  if (typeof objToValidate.vibe !== "string") {
    return {
      code: 400,
      message: "vibe should be a string"
    };
  }
  return {
    code: 200,
    message: ""
  };
};

module.exports = {
  validateTrip,
  validateDriver,
  validateVehicle,
  validateMusic
};
