const express = require('express');
const router = express.Router()
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const config = require('config')
const {check, validationResult} = require('express-validator');

const User = require('../models/User')

//@route  POST api/users
//@desc   Register a user
//@access  Public
router.post(
    '/',
    [
        //כדי ליצור את הVALIDTAION מביאים את האקספרסס ולדיטור בהתחלה
        //מוסיפים סוגריים מרובעים ובתוכם CHECK ואז איזה ארגומנט אתה בודק ואיזה הודעהאתה מעביר ולאחר מכן את הבדיקה
        check('name', 'name is required').not().isEmpty(),
        check('email', 'please includ valid email').isEmail(),
        check('password', 'please enter password with 6 charcters').isLength({min: 6})
    ],
    async (req, res) => {
        //בודק האם יש ERRORS
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({errors: errors.array()})
        }
        const {name, email, password} = req.body;
        try {
            //בודק האם קיים יוזר שנרשם עם אותו מייל
            let user = await User.findOne({email})
            if (user) {
                return res.status(400).json({msg: 'user already exists'})
            }
            // אם לא קיים יוזר כזה נפתח לו יוזר חדש עם כל הפרטים
            user = new User({
                name, email, password
            })
            //מבצע אבטחה של הסיסמא של היוזר ע"י bcrypt
            const salt = await bcrypt.genSalt(10)
            user.password = await bcrypt.hash(password, salt)
            await user.save();

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
    }
);

module.exports = router;
