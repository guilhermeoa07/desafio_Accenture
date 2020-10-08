const { eventNames } = require('..')

require('dotenv').config()
const env = process.env
const environment = env.environment

module.exports = () => {
    const avaible_environment = ['dev', 'prod']
 
    if(avaible_environment.includes(environment)){
        return {
            secret: env[`secret_${environment}`],
            port: env[`port_${environment}`],
            port_db: env[`port_db_${environment}`],
            ip_db: env[`ip_db_${environment}`],
            db: env[`db_${environment}`],
        }
    }
}