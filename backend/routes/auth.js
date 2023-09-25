const express = require("express");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')
const User = require("../models/User");
const fetchuser = require("../middleware/fetchuser");
const router = express.Router();
const { body, validationResult } = require("express-validator");

const JWT_SECRET = "sachetisagoodb$oy";

//Route 1: Create a user using: POST "/api/auth/createuser". No login required
router.post(
  "/createuser",
  [
    body("name", "Enter a valid name").isLength({ min: 3, max: 20 }),
    body("email", "Enter a valid email").isEmail(),
    body("password", "Password must be atleast 5 characters").isLength({
      min: 5,
    }),
  ],
  async (req, res) => {
    // If there are errors, return Bad request and the errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() });
    }

    // Check whether the user with this email exists already
    try {
      let user = await User.findOne({ email: req.body.email });
      if (user) {
        return res
          .status(400)
          .json({ success: false, error: "Sorry a user with this email already exists" });
      }

      const salt = await bcrypt.genSalt(10);
      const secPass = await bcrypt.hash(req.body.password, salt);
    //   Create a new User
      user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: secPass,
      });

      // .then(user => res.json(user))
      // .catch(err => {
      //     console.log(err)
      //     res.json({success: false, error: "Please enter a unique value for email", message: err.message})
      // })

      const data = {
        user: {
            id: user.id
        }
      }
      const authtoken = jwt.sign(data, JWT_SECRET);
      let success = true;
      res.json({success, authtoken});

    // Catch errors
    } catch (error) {
      console.error(error.message);
      res.status(400).send("Internal Server Error");
    }
  }
);

// Route 2: Authenticate a user using: POST "/api/auth/login". No login required
router.post('/login', [
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Password cannot be blank').exists(),
], async (req, res) => {
    let success = false;
    // If there are errors, return Bad request and the errors
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).json({ success: false, errors: errors.array() });
    }

    const {email, password} = req.body;
    try {
        let user = await User.findOne({email});
        if(!user) {
          success = false;
            return res.status(400).json({ success: false, error: "Please try to login with correct credentials" });
        }
        
        const passwordCompare = await bcrypt.compare(password, user.password)
        if(!passwordCompare) {
          success = false
            return res.status(400).json({ success: false, error: "Please try to login with correct credentials" });
        }

        const data = {
            user: {
                id: user.id
            }
        }
        const authtoken = jwt.sign(data, JWT_SECRET);
        success = true;
        res.json({success, authtoken});

    } catch (error) {
    console.error(error.message);
    res.status(400).send("Internal Server Error");
        
    }
})

// Route 3: Get logged in User Details: POST "/api/auth/getuser". Login required
router.post("/getuser", fetchuser, async (req, res) => {
  try {
  let userId = req.user.id;
  const user = await User.findById(userId).select("-password");
  res.send(user);
} catch (error) {
  console.error(error.message);
  res.status(500).send("Internal Server Error")
}
 
})

module.exports = router;
