const app = require('./app');
const { connect } = require('./database');
async function main() {
    try {
        //Database connect
        await connect();
        // Express application
        await app.listen(5000);
        console.log('Server on port 4000: running');
    } catch (error) {
        console.log(error)
    }

}

main();