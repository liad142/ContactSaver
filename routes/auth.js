const express = require('express');
const router = express.Router()
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const config = require('config')
const auth = require('../middleware/auth') //כדי להן על הראוט מוסיפים את הAUTH כמשתנה נוסף לGET
const {check, validationResult} = require('express-validator');
const User = require('../models/User')


//@route  GET api/auth
//@desc   Get logged in user
//@access  Private
router.get('/', auth, async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password')
        res.json(user)
    } catch (err) {
        console.error(err.message)
        res.status(500).send('server error')
    }
})

//@route  POST api/auth
//@desc   auth user and get token
//@access  public
router.post('/',

    [
        check('email', 'please includ valid email').isEmail(),
        check('password', 'please enter password with 6 charcters').exists()
    ],
    async (req, res) => {
        console.log(req.body)
        //בודק האם יש ERRORS
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({errors: errors.array()})
        }
        const {email, password} = req.body;
        try {
            //מחפש יוזר לפי האימייל שלו . אם אין יוזר מחזיר לו הודעת שגיאה
            let user = await User.findOne({email})
            if (!user) {
                return res.status(400).json({msg: 'invaild credentials'})
            }
            //אם קיים יוזר אז בודקים את הPASSWORD בעזרת הCOMPARE
            const isMatch = await bcrypt.compare(password, user.password)
            if (!isMatch) {
                return res.status(400).json({msg: 'invaild credentials'})
            }
            const payload = {
                user: {
                    id: user.id
                }
            }
            // יוצר טוקן
            jwt.sign(payload, config.get('jwtSecret'), {
                expiresIn: 36000
            }, (err, token) => {
                // בודק אם יש ERR זורק ERR
                if (err) throw err
                // אם אין מחזיר את הטוקן
                res.json({token})
            })

        } catch (err) {
            console.error(err.message)
            res.status(500).send('server error')
        }

    })

module.exports = router
