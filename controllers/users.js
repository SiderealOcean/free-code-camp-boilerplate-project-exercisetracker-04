const User = require("../models/user");
const Exercise = require("../models/exercise");

exports.newUser = (req, res) => {
  const name = req.body.username;
  // console.log(name);
  // return
  const newUser = new User({
    name,
  });

  newUser
    .save()
    .then((result) => {
      // console.log(result);
      // console.log("Usuario guardado en BD", result)
      res.json({ username: result.name, _id: result._id });
    })
    .catch((err) => {
      // console.log('Error al guardar usuario', err)
    });
};

exports.newExercise = (req, res) => {
  // console.log("Post new exercise", req.params._id)
  // console.log("URLLLLLL###",req.url)
  // console.log("BODY###",req.body, req.params._id)
  const userId = req.params._id;
  User.findById(userId)
    .then((userData) => {
      const { description, duration, date } = req.body;
      const { name } = userData;

      let dateNewFormat = new Date(date);

      if (dateNewFormat instanceof Date && isNaN(dateNewFormat)){
        dateNewFormat = new Date();
      }

      const newExercise = new Exercise({
        userId,
        name,
        description,
        duration,
        date: dateNewFormat,
      });

      return newExercise.save();
    })
    .then((result) => {
      // console.log("Ejercicio guardado en BD", result)
      // return;
      res.json({
        username: result.name,
        description: result.description,
        duration: result.duration,
        date: result.date.toDateString(),
        _id: result.userId,
      });
    })
    .catch((err) => {
      console.log("Algo mal al guardar ejercicio!!", err);
    });
};

exports.log = (req, res) => {
  const { from, to, limit } = req.query;
  const userId = req.params._id;
  console.log(from, to, userId);
  //   return;
  User.findById(userId)
    .then((userData) => {
      console.log(userData.name);

      // return;

      let dateObj = {};

      if (from) {
        dateObj["$gte"] = new Date(from);
      }
      if (to) {
        dateObj["$lte"] = new Date(to);
      }
      let filter = {
        name: userData.name,
      };
      if (from || to) {
        filter.date = dateObj;
      }

      let limitValue = limit ?? 10;

      console.log("filter: ", filter);

      Exercise.find(filter)
        .limit(+limitValue)
        .exec((err, filterData) => {
          if(err){
            console.log("Error Exercise.find", err);
            return;
          }
          const count = filterData.length;
          const { name, _id } = userData;
          const log = filterData.map((lg) => ({
            description: lg.description,
            duration: lg.duration,
            date: lg.date.toDateString(),
          }));
          res.json({ _id, "username":name, count, log });
        });
    })
    .catch((err) => {
      res.status("No existe usuario").send(err);
    });
};

exports.allUser = (req, res) => {
  User.find({})
    .then((data) => {
      const allData = data.map((u) => ({
        _id: u._id,
        username: u.name,
      }));
      res.json(allData);
    })
    .catch((err) => {
      res.send("Error en la solicitus");
    });
};
