const router = require("express").Router();
let Comm = require("../models/comm-model");

router.route("/:id").get((req, res) => {
  Comm.findOne({ email: req.params.id })
    .then((user) => res.json(user))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/add").post((req, res) => {
  const license = req.body.registration;
  const first = req.body.first;
  const last = req.body.last;
  const gender = req.body.gender;
  const dob = req.body.dob;
  const email = req.body.email;
  const secret = req.body.secret;

  const newUser = new Comm({
    license,
    first,
    last,
    gender,
    dob,
    email,
    secret,
  });

  newUser.save()
    .then(() => res.json("New Community User Added."))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/update/:id").post((req, res) => {
  Comm.findById(req.params.id)
    .then((user) => {
      user.first = req.body.first;
      user.last = req.body.last;
      user.gender = req.body.gender;
      user.dob = req.body.dob;
      user.secret = req.body.secret;

      user.save()
        .then(() => res.json("Community User Updated."))
        .catch((err) => res.status(400).json("Error: " + err));
    })
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/:id").delete((req, res) => {
  Comm.findOneAndDelete({ email: req.params.id })
    .then((user) => res.json("Community User Deleted Successfully."))
    .catch((err) => res.status(400).json("Error: " + err));
});

module.exports = router;
