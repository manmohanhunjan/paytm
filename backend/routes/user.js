const {Router} = require('express')
const zod = require("zod");
const { UserModal } = require("../db");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config");
const router = Router()
const bcrypt = require('bcrypt');
const { authMiddleware } = require('../middleware');

const signupBody = zod.object({
    username: zod.string().email(),
	firstName: zod.string(),
	lastName: zod.string(),
	password: zod.string()
})

const signinBody = zod.object({
    username: zod.string().email(),
    password: zod.string()
})

router.post('/signup', async(req, res) => {
    const {success} = signupBody.safeParse(req.body)
    if (!success) {
        return res.status(411).json({
            message: "Email already taken / Incorrect inputs"
        })
    }

    const existingUser = await UserModal.findOne({
        username: req.body.username
    })

    if (existingUser) {
        return res.status(411).json({
            message: "Email already taken/Incorrect inputs"
        })
    }

    const hashedPassword = await bcrypt.hash(req.body.password, 10)

    const user = await UserModal.create({
        username: req.body.username,
        // password: req.body.password,
        password: hashedPassword,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
    })
    const userId = user._id;

    const token = jwt.sign({
        userId
    }, JWT_SECRET);

    res.json({
        message: "User created successfully",
        token: token
    })
})

router.post('/signin', async(req, res) => {
    const {success} = signinBody.safeParse(req.body)
    if(!success){
        return res.status(411).json({
            message: "Incorrect inputs"
        })
    }


    const existingUser = await UserModal.findOne({ 
        username: req.body.username
        // password: req.body.password
     })

     if(!existingUser.username || !bcrypt.compare(req.body.password, existingUser.password)){
        return res.status(411).json({
            message: "Email does not exist"
        })
     }
     const userId = existingUser._id

     const token = jwt.sign({userId}, JWT_SECRET)

     res.json({
        token
     })
})

router.put('/',authMiddleware,async (req, res) => {
    const data = req.body
    const userId = req.userId
    await UserModal.findByIdAndUpdate({userId}, data)
    res.status(200)
})



module.exports = router