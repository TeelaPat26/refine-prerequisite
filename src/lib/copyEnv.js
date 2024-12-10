const gentlyCopy = require('gently-copy');

const source = '../env/.env';

// User's local directory
const destination = process.env.INIT_CWD

gentlyCopy(source, destination, { overwrite: false })
