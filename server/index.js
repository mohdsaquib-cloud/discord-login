require('dotenv').config()
const express = require('express')
const app = express()
const auth = require('./routes/auth')
const session = require('express-session')
var DiscordStrategy = require('passport-discord').Strategy
const passport = require('passport');
var scopes = ['identify', 'email', 'guilds', 'guilds.join'];
const DiscordUser =  require('./models/DiscordUser')
let user = {}
passport.serializeUser((user,done)=>{    
    done(null,user.discordId)
})
passport.deserializeUser(async (id,done)=>{
    const user = DiscordUser.findById(id)
    if(user)
        done(null,user)  
})
passport.use(new DiscordStrategy({
    clientID: process.env.CLIENT_ID,
    clientSecret:process.env.CLIENT_SECRET,
    callbackURL:process.env.CLIENT_REDIRECT,
    scope: scopes
}, async(accessToken, refreshToken, profile, done) => {
    user = {...profile}
    try{
        const user = await DiscordUser.findOne({discordId:profile.id})
        if(user){
            done(null,user)
        }else{
            const newUser = await DiscordUser.create({
                discordId :profile.id,
                username:profile.username
            })
            const saveUser = await newUser.save();
            done(null,saveUser)
        }
    }catch(err){
        console.log(err)
        done(err,null)
    }
}));
const db = require('./database/db')
var cors = require('cors')

db.then(()=>console.log('Connected to MongoDB')).catch((err)=>console.log(err))

//Middlewares
app.use(express.json())
app.use(express.urlencoded({extended:false}))
app.use(cors())
app.use(session({
    secret:'some randomn key',
    cookie:{
        maxAge:60000 * 60 * 24
    },
    resave: true,
    saveUninitialized: true,
    name : 'discord-oauth2'
}))

app.use(passport.initialize())
app.use(session())


//Routes Middleware

app.use('/auth',auth)

//app Routes
app.get("/user",(req,res)=>{
    res.send(user)
})

PORT = process.env.PORT1 || 8000


app.listen(PORT ,()=>{
    console.log(`Listening on port ${PORT}`)
})