import passport from 'passport';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { Strategy as LocalStrategy } from 'passport-local';
import { Strategy as BearerStrategy } from 'passport-http-bearer';
import ApiConsumer from '../model/ApiConsumer.js';
import createCustomError from './customError.js';

const decrypt = (password, hash) => bcrypt.compare(password, hash);

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
    console.log(email);
    ApiConsumer.findOne({ email }, (err, consumer) => {
      console.log(consumer);
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

passport.use(
  new BearerStrategy(
    async (token, done) => {
      try {
        const payload = jwt.verify(token, 'bLW+Z5lsCdJ1shH7M4sKB9Gu3Xo7/tw1XvSYCPoaTojdQJd4txw2QEPIcS3g0PtfPZlW5noAN/Te7YHR+G3F0pWYr8G1KGSsSmPgcyBNC4Oilnawow+6YMyjTKssmW3wm8okgldJ/qlLnFJSU0vbEAxyIk3ssrOFCOFoTa3H51rrMwE1n88rBZyI0pn+ePZGwc7GshUBdRo5t72Lbk5YbS+TO5YYefgtuGBa6xdwamzANn4PyWuBtO0Avnr6kr3kigaVGX6KglzB+BPqtKwdg9k4Ohht/fAxoZEj3n8y5Mf4wcgEWj7HrLpMlTAYx/MpYW81Q8OpMfJdrpH2+9lb/Q==');
        done(null, payload.id, { token });
      } catch (erro) {
        done(erro);
      }
    },
  ),
);

export { BearerStrategy, LocalStrategy };
