import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import {User} from '../../user/model/userModel.js';

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: 'http://localhost:3000/google/callback',
    scope: ['profile', 'email']
}, async (accessToken, refreshToken, profile, done) => {
    try {
        
        let user = await User.findOne({ googleId: profile.id });

        if (!user) {
            const firstName = profile.name?.givenName || profile.displayName.split(' ')[0];
            const lastName = profile.name?.familyName || profile.displayName.split(' ').slice(1).join(' ');

            let userName = `${firstName.toLowerCase()}${profile.id.slice(-4)}`;

            let existingUser = await User.findOne({ userName });
            while (existingUser) {
                userName = `${firstName.toLowerCase()}${Math.floor(1000 + Math.random() * 9000)}`;
                existingUser = await User.findOne({ userName });
            }
            user = new User({
                firstName,
                lastName,
                userName,
                email: profile.emails[0].value,
                googleId: profile.id,
                avatar: profile.photos[0]?.value,
            });

            await user.save();
        }

        return done(null , user);
    } 
    catch (error) {
        console.log(error);
        done(error, null);
    }
}));

export default passport;