const router = require("express").Router();
// Import our controllers
const citiesRoutes = require("./citiesController");
const userRoutes = require("./usersController");
const detailsRoutes = require("./detailsController");
const noteRoutes = require("./noteController");

// Hook up to the router
router.use("/meshal", citiesRoutes);
router.use("/users", userRoutes);
router.use("/details", detailsRoutes);
router.use("/notes", noteRoutes);

// Export the router
module.exports = router;
