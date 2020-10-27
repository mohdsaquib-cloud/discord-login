var DiscordStrategy = require('passport-discord').Strategy
const passport = require('passport');
var scopes = ['identify', 'email', 'guilds', 'guilds.join'];
const DiscordUser =  require('../models/DiscordUser')

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