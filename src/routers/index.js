const AuthenticateRouter = require('./AuthenticateRouter')
const FreelancerRouter = require('./FreelancerRouter')
const EmployerRouter = require('./EmployerRouter')
const routes = (app) =>{
    app.use('/api/auth', AuthenticateRouter)
    
}

module.exports = routes