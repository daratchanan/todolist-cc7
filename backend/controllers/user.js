const db = require("../models");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");


const register = async (req, res) => {
   const { username, password, name } = req.body;
   const targetUser = await db.User.findOne({ where: {username} });

   if (targetUser) {
      res.status(400).send({ message: "Username already taken" });
   } else {
      const salt = bcryptjs.genSaltSync(12);
      const hashedPassword = bcryptjs.hashSync(password,salt);

      await db.User.create ({
         username,
         name,
         password: hashedPassword
      });
      res.status(201).send({message: "User created"})
   }
};


const login = async (req, res) => {
   const { username, password } = req.body;
   const targetUser = await db.User.findOne({ where: {username} });

   if (!targetUser) {
      res.status(400).send({message: "User not found"});
   } else {
      const isCorrect = bcryptjs.compareSync(password,targetUser.password); 
      if (isCorrect) {
         const payload = {
            id: targetUser.id,
            name: targetUser.name 
         };
         const token = jwt.sign(payload, "CODECAMP", {expiresIn: 3600});
         res.status(200).send({token});
      } else {
         res.status(400).send("Wrong password")
      }
   } 

};

module.exports = {
  register,
  login
};