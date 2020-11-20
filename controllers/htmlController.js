// Requiring path to so we can use relative routes to our HTML files
const router = require("express").Router();
const db = require("../models");

// Requiring our custom middleware for checking if a user is logged in
const isAuthenticated = require("../config/middleware/isAuthenticated");

/**
 * Home Page
 */
router.get("/", (req, res) => {
  res.render("index", { user: req.user });
});

/**
 * Home Page, again
 */
router.get("/home", (req, res) => {
  res.render("index", { user: req.user });
});

/**
 * Signup page
 */
router.get("/signup", (req, res) => {
  if (req.user) {
    res.redirect("/");
  } else {
    res.render("signup", { user: req.user });
  }
});

/**
 * Login page
 */
router.get("/login", (req, res) => {
  if (req.user) {
    res.redirect("/");
  } else {
    res.render("login", { user: req.user });
  }
});

/**
 * Forum Page -
 * Notice loading our posts, with that include!
 */
router.get("/city", isAuthenticated, (req, res) => {
  db.City.findAll({ raw: true, include: [db.User] }) // Joins User to Posts! And scrapes all the sequelize stuff off
    .then((dbModel) => {
      res.render("cities", { user: req.user, data: dbModel });
    })
    .catch((err) => res.status(422).json(err));
});
/**
 * Forum Page -
 * Notice loading our posts, with that include!
 */
router.get("/details/:id", isAuthenticated, (req, res) => {
  // db.City.findAll({ raw: true, include: [db.User] })
  // .then((dbModel) => {
  //     const details = dbModel.find(item => dbModel.id === +req.params.id)
  //     res.render("details", { user: req.user, datac: details });
  //   })
  // include left join
  db.City.findOne({ where: { id: req.params.id }, include: db.Note })
    .then((dbModel) => {
      // delete dbModel._previousDataValues;
      console.log(dbModel.dataValues);
      res.render("details", {
        user: req.user,
        datac: dbModel.dataValues,
        note: dbModel.Notes,
      });
    })
    .catch((err) => res.status(422).json(err));
});

// router.get("/notes/:id", isAuthenticated, (req, res) => {
//   /// note model
//   db.Note.findOne({where: {CityId : req.params.id}}) // Joins User to Posts! And scrapes all the sequelize stuff off
//     .then((dbModel) => {
//     })
//     .catch((err) => res.status(422).json(err));
// });
/**
 * Generic Error Page
 */
router.get("*", (req, res) => {
  res.render("errors/404", { user: req.user });
});

module.exports = router;
