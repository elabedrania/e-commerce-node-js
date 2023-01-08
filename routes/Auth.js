const router = require('express').Router(); //creation de route function
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../Models/UserModel');
const { validRegister, validLogin } = require('../valid');
const auth = require('../VTOKEN');

router.post('/register', async(req, res) => {
    // Valid Form
    const { error } = validRegister(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    // verif email
    const emailExist = await User.findOne({ Email: req.body.Email });
    if (emailExist) return res.send({ msg: 'email already exist' });

    //chiffrement de password
    const salt = await bcrypt.genSalt(10);
    const passwordHashed = await bcrypt.hash(req.body.Password, salt);


    const character = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    let activationCode = "";
    for(let i = 0; i< 25; i++){
        activationCode += character[Math.floor(Math.random()* character.length)];
    }

    const newUser = new User({
        FirstName: req.body.FirstName,
        LastName: req.body.LastName,
        Email: req.body.Email,
        Password: passwordHashed,
        activationCode: activationCode
    });
    try {
        const addNewUser = await newUser.save();
        res.send({ msg: "success" });
    } catch (err) {
        res.status(400).json({ message: err });
    }
});

router.post('/login', async(req, res) => {
    // Basic Valid
    const { error } = validLogin(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    // Find email
    const user = await User.findOne({ Email: req.body.Email });
    if (!user) return res.status(400).send('Email not found');
    // Check Password
    const validPass = await bcrypt.compare(req.body.Password, user.Password)
    if (!validPass) return res.status(400).send('Email or Password is wrong');
    if(user && validPass && !user.isActive){
        return res.send('Veillez vérifier votre boite e-mail pour la verification')
    }
    //Create and assign token
    const token = jwt.sign({ _id: user._id, IsAdmin: user.IsAdmin, Email: user.Email }, "rania123");
    res.header('authToken', token).send({ token: token, logedin: true });
});
//verif user present ou non
router.post("/verifUser", auth, (req, res) => {
    res.send(req.user)
})


module.exports = router;