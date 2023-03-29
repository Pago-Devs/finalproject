/* eslint-disable object-shorthand */
/* eslint-disable import/no-extraneous-dependencies */
import passport from 'passport';
import { Strategy as BearerStrategy } from 'passport-http-bearer';
import { Strategy as LocalStrategy } from 'passport-local';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import Consumer from '../model/consumers.js';

const localStrategy = new LocalStrategy(
  {
    usernameField: 'consumerName',
    passwordField: 'password',
    session: false,
  },
  async (consumerName, password, done) => {
    try {
      const consumer = await Consumer.findOne({ consumerName });
      if (!consumer) {
        return done(null, false, {
          message: `Consumer ${consumerName} not found.`,
        });
      }

      const passwordValid = await bcrypt.compare(password, consumer.password);

      if (!passwordValid) {
        return done(null, false, { message: 'Invalid password' });
      }
      return done(null, consumer);
    } catch (error) {
      return done(error, false);
    }
  },
);

const bearerStrategy = new BearerStrategy(async (token, done) => {
  try {
    const consumer = jwt.verify(token, process.env.APP_SECRET);
    done(null, consumer, { token });
  } catch (erro) {
    done(erro);
  }
});

passport.use(localStrategy);
passport.use(bearerStrategy);

export const authLocal = (req, res, next) => {
  passport.authenticate('local', { session: false }, (erro, consumer, info) => {
    if (!consumer) {
      return res.status(401).json({ info });
    }
    req.user = consumer;
    return next();
  })(req, res, next);
};

export const authBearer = (req, res, next) => {
  passport.authenticate('bearer', { session: false }, (erro, consumer, info) => {
    if (erro) {
      return res.status(500).json({ erro });
    }

    if (!consumer) {
      return res.status(401).json({ erro, consumer, info });
    }
    req.token = info.token;
    return next();
  })(req, res, next);
};
