### node.js-assesment

A full CRUD demo API capable of adding, editing, and deleting information from a mock database.
Completed as a part of Alto's application process.

### Installing NPM and Nodemon:

NPM:
Windows (install the MSI): https://nodejs.org/en/download/
Macintosh (install the PKG): https://nodejs.org/en/download/
Linux: 
```sh
$ curl -L http://www.npmjs.com/install.sh | sh
```
Nodemon:
```sh
$ npm install nodemon -g
```

To run the server, navigate to the repo in a terminal and run
```sh
$ nodemon server
```

### Sample Data

In case you don't feel like typing all this in

Sample Trip
```sh
{
  "eta": "07:39",
  "start_location": "500 NoError St.%Irving, Texas 12345",
  "end_location": "Airport%Terminal E%Irving, Texas 12345",
  "payment": "Amex",
  "customer_note": "Please drive slowly and obstruct traffic",
  "est_fare_low": 45,
  "est_fare_high": 55,
  "assigned_driver": 1,
  "assigned_vehicle": 1,
  "requested_music": 6
}
```

Sample Driver
```sh
{
  "name": "Greg",
  "profile_pic": "src/components/assets/profile3.jpg",
  "bio": "Something interesting"
}
```

Sample Vehicle
```sh
{
  "name": "Alto03",
  "year": 1995,
  "make": "Dodge",
  "model": "Neon",
  "color": "Black",
  "pic": "src/components/assets/car3.png"
}
```

Sample Music
```sh
{
  "vibe": "Radio Static"
}
```

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app) even though it probably didn't need to be.