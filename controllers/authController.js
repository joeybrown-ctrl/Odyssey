// Requiring our models and passport as we've configured it
const db = require("../models");
const passport = require("../config/passport");
const router = require("express").Router();
const nodemailer = require("nodemailer");

router.post("/login", passport.authenticate("local"), (req, res) => {
  // Sending back a password, even a hashed password, isn't a good idea
  res.json({
    email: req.user.email,
    id: req.user.id,
  });
});

// Route for signing up a user. The user's password is automatically hashed and stored securely thanks to
// how we configured our Sequelize User Model. If the user is created successfully, proceed to log the user in,
// otherwise send back an error
router.post("/signup", (req, res) => {
  db.User.create({
    email: req.body.email,
    password: req.body.password,
  })
    .then(() => {
      res.redirect(307, "/auth/login");
      const transporter = nodemailer.createTransport({
        service: "SendPulse",
        auth: {
          user: "otbm754@gmail.com", // generated ethereal user
          pass: "*#QJk1992Meshal!", // generated ethereal password
        },
      });

      // send mail with defined transport object
      transporter
        .sendMail({
          from: "meshalsaud44@gmail.com ", // sender address
          to: req.body.email, // list of receivers
          subject: "Hello ✔", // Subject line
          text: "Hello world?", // plain text body
          html: "<b>Hello world?</b>", // html body
        })
        .then((mes) => {
          console.log("Message sent: %s", mes.messageId);
          // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

          // Preview only available when sending through an Ethereal account
          console.log("Preview URL: %s", nodemailer.getTestMessageUrl(mes));
          // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
        })

        .catch((err) => {
          console.log(err);
        });
    })
    .catch((err) => {
      res.status(401).json(err);
    });
});

// Route for logging user out
router.get("/logout", (req, res) => {
  req.logout();
  res.redirect("/");
});

// Route for getting some data about our user to be used client side
router.get("/user_data", (req, res) => {
  if (!req.user) {
    // The user is not logged in, send back an empty object
    res.json({});
  } else {
    // Otherwise send back the user's email and id
    // Sending back a password, even a hashed password, isn't a good idea
    res.json({
      email: req.user.email,
      id: req.user.id,
    });
  }
});

module.exports = router;
