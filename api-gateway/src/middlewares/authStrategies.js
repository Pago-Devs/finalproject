import passport from 'passport';
import jwt from 'jsonwebtoken';
import { Strategy as BearerStrategy } from 'passport-http-bearer';

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

export default BearerStrategy;
