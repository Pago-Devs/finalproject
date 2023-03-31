import passport from 'passport';
import bcrypt from 'bcryptjs';
import { Strategy as LocalStrategy } from 'passport-local';
import ApiConsumer from '../model/ApiConsumer.js';
import createCustomError from './customError.js';

const decrypt = (password, hash) => bcrypt.compareSync(password, hash);

const verifyPassword = (password, hash) => {
  if (!decrypt(password, hash)) {
    return false;
  }
  return true;
};

passport.use(
  new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    session: false,
  }, (email, password, done) => {
    ApiConsumer.findOne({ email }, (err, consumer) => {
      if (err) {
        return done(err);
      }
      if (!consumer) {
        return done(createCustomError(400, 'Invalid email or password'));
      }
      if (!verifyPassword(password, consumer.password)) {
        return done(createCustomError(400, 'Invalid email or password'));
      }
      done(null, consumer);
      return true;
    });
  }),
);

export default LocalStrategy;
