require('dotenv').config()

const env = process.env
const environment = env.environment

module.exports = () => {
    const avaible_environment = ['dev', 'prod']
 
    if(avaible_environment.includes(environment)){
        return {
            secret: env[`secret_${environment}`],
            port: env[`port_${environment}`],
            port_db: env[`port_db`],
            host_db: env[`host_db_${environment}`],
            db: env[`db_${environment}`],
            mongo_user: env[`mongo_user_${environment}`], 
            mongo_pass: env[`mongo_pass_${environment}`]
        }
    }
}