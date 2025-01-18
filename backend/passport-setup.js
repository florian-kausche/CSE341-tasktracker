const passport = require('passport');
const GitHubStrategy = require('passport-github2').Strategy;
const User = require('./models/User'); // Assuming you have a User model

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    User.findById(id).then(user => {
        done(null, user);
    });
});

passport.use(new GitHubStrategy({
    clientID: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    callbackURL: "/auth/github/callback"
}, (accessToken, refreshToken, profile, done) => {
    User.findOne({ githubId: profile.id }).then(existingUser => {
        if (existingUser) {
            done(null, existingUser);
        } else {
            new User({
                githubId: profile.id,
                username: profile.username,
                thumbnail: profile._json.avatar_url
            }).save().then(user => done(null, user));
        }
    });
})); 