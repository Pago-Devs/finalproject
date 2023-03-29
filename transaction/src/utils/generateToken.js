import jwt from 'jsonwebtoken';

const generateToken = (id) => {
  const SECRET = 'bLW+Z5lsCdJ1shH7M4sKB9Gu3Xo7/tw1XvSYCPoaTojdQJd4txw2QEPIcS3g0PtfPZlW5noAN/Te7YHR+G3F0pWYr8G1KGSsSmPgcyBNC4Oilnawow+6YMyjTKssmW3wm8okgldJ/qlLnFJSU0vbEAxyIk3ssrOFCOFoTa3H51rrMwE1n88rBZyI0pn+ePZGwc7GshUBdRo5t72Lbk5YbS+TO5YYefgtuGBa6xdwamzANn4PyWuBtO0Avnr6kr3kigaVGX6KglzB+BPqtKwdg9k4Ohht/fAxoZEj3n8y5Mf4wcgEWj7HrLpMlTAYx/MpYW81Q8OpMfJdrpH2+9lb/Q==';

  const JWT_CONFIG = {
    expiresIn: '1d',
    algorithm: 'HS256',
  };
  const token = jwt.sign({
    id,
  }, SECRET, JWT_CONFIG);

  return token;
};

export default generateToken;
