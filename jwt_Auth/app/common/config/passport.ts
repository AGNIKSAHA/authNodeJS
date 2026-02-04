import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import { UserModel } from '../../modules/user/user.model.js';
import { ENV } from './env.js';

passport.use(
  new GoogleStrategy(
    {
      clientID: ENV.GOOGLE_CLIENT_ID,
      clientSecret: ENV.GOOGLE_CLIENT_SECRET,
      callbackURL: ENV.GOOGLE_CALLBACK_URL,
    },
    async (_accessToken, _refreshToken, profile, done) => {
      try {
        const email = profile.emails?.[0]?.value;
        if (!email) {
          return done(new Error('Google account has no email'), undefined);
        }

        let user = await UserModel.findOne({
          $or: [{ googleId: profile.id }, { email }],
        });

        if (!user) {
          user = await UserModel.create({
            name: profile.displayName,
            email,
            googleId: profile.id,
            provider: 'google',
            password: 'GOOGLE_AUTH', // dummy, never used
          });
        }

        done(null, user);
      } catch (err) {
        done(err as Error, undefined);
      }
    }
  )
);

export default passport;
