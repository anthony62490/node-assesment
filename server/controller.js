var DB_Makeshift = [];

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