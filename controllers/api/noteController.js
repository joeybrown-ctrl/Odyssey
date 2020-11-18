const db = require("../../models");
const router = require("express").Router();

/**
 * Note - Read All
 */
router.get("/", (req, res) => {
  db.Note.findAll(req.query)
    .then((dbModel) => res.json(dbModel))
    .catch((err) => res.status(422).json(err));
});

/**
 * Note - Read One
 */
router.get("/:id", (req, res) => {
  db.Note.findByPk(req.params.id, { include: db.City })
    .then((dbModel) => res.json(dbModel))
    .catch((err) => res.status(422).json(err));
});

/**
 * Note - Create
 * Notice how we are also taking in the User Id! Important!
 */
router.post("/", (req, res) => {
  db.Note.create({
    CityId: req.body.id,
    title: req.body.title,
    body: req.body.body,
    /// req.body.title
  })
    .then((dbModel) => res.json(dbModel))
    .catch((err) => res.status(422).json(err));
});

/**
 * Note - Update
 */
router.put("/:id", (req, res) => {
  db.Note.update(req.body, { where: { id: req.params.id } })
    .then((dbModel) => res.json(dbModel))
    .catch((err) => res.status(422).json(err));
});

/**
 * Note - Delete
 */
router.delete("/:id", (req, res) => {
  db.Note.destroy({ where: { id: req.params.id } })
    .then((dbModel) => res.json(dbModel))
    .catch((err) => res.status(422).json(err));
});

// Defining methods for the booksController
module.exports = router;
