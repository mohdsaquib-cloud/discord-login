const express = require('express')
const router = express.Router()
const passport = require('passport')

router.get('/', passport.authenticate('discord'));

router.get('/redirect', passport.authenticate('discord', {
    failureRedirect: '/'
}), function(req, res) {
    res.redirect("http://localhost:3000/") // Successful auth
});

module.exports = router