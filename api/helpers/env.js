const { compareVersions } = require('compare-versions');

module.exports = () => {
    if (compareVersions(process.version, '20.6.0') === -1) 
        console.info('Loading .env file with dotenv') && require('dotenv').config();
    else
        console.info('Loading .env file with native node')
    return process.env;
}