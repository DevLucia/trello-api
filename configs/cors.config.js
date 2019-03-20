// const cors = require('cors');
// const createError = require('http-errors');
// const allowedOrigins = process.env.CORS_ORIGINS || ["http://localhost:3000"]

// module.exports = cors({
//   // la funcion es un objeto que se incializa de esta manera, recibe un origen y la siguiente funcuón
//   origin: (origin, next) => {
//     // si el origen no se esta realizando desde dentro de un ordenador es decir, no hay origen
//     //  o si el origen esta dentro del array de origenes conocidos
//     // const isAllowed = !origin || allowedOrigins.some( o => o === origin);
//     const isAllowed = !origin || allowedOrigins.indexOf(origin) !== -1
//     if (isAllowed){
//       //saltams a la función siguente con null en errores porque no hay errores
//       next(null, isAllowed);
//     } else {
//       next(createError(401, 'Not allowed by Cors'))
//     }
//   },
//   // esto significa que todos los origenes que permitamos pueden acceder a la cookie
//   credentials: true
// })

const createError = require('http-errors');
const cors = require('cors');
const allowedOrigins = [
  'http://localhost:3000'
]
module.exports = cors({
  origin: (origin, next) => {
    const allowed = !origin || allowedOrigins.indexOf(origin) !== -1;
    if (allowed) {
      next(null, allowed);
    } else {
      next(createError(401, 'Not allowed by CORS'));
    }
  },
  credentials: true
})