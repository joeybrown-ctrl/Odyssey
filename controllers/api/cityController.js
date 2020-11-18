const db = require("../models");
const router = require("express");

router.get("/", (req, res) => {
  db.City.findAll(req.query).then((dbCity) => res.json(dbCity));
});

router.get("/:id", (req, res) => {
  db.City.findOne(req.params.id).then((dbCity) => res.json(dbCity));
});

router.post("/", (req, res) => {
  db.City.create({
    cityName: req.body.cityName,
  }).then((dbCity) => {
    res.json(dbCity);
  });
});

router.delete("/:id", (req, res) => {
  // eslint-disable-next-line prettier/prettier
  db.City.destroy({ where: { id: req.params.id } }).then((dbCity) => res.json(dbCity)
  );
});

module.exports = router;
