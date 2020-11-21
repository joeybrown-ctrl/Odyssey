const db = require("../../models");
const router = require("express").Router();

/**
 * City - Read All
 */
router.get("/", (req, res) => {
  db.City.findAll({
    where: { UserId: req.user.id },
  })
    .then((dbModel) => res.json(dbModel))
    .catch((err) => res.status(422).json(err));
});
// db.City.findOne({ where: { id: req.params.id }, include: [{model:db.Note}, {model:db.Image}] })
/**
 * City - Read One
 */
router.get("/:id", (req, res) => {
  db.City.findByPk(req.params.id, { include: db.Note })
    .then((dbModel) => res.json(dbModel))
    .catch((err) => res.status(422).json(err));
});

/**
 * City - Create
 * Notice how we are also taking in the User Id! Important!
 */
router.post("/", (req, res) => {
  db.City.create({
    UserId: req.user.id,
    ...req.body,
    visited: false,
  })
    .then((dbModel) => res.json(dbModel))
    .catch((err) => res.status(422).json(err));
});

/**
 * City - Update
 */
router.put("/:id", (req, res) => {
  db.City.update(req.body, { where: { id: req.params.id } })
    .then((dbModel) => res.json(dbModel))
    .catch((err) => res.status(422).json(err));
});

/**
 * City - Delete
 */
router.delete("/:id", (req, res) => {
  db.City.destroy({ where: { id: req.params.id } })
    .then((dbModel) => res.json(dbModel))
    .catch((err) => res.status(422).json(err));
});

// Defining methods for the booksController
module.exports = router;
