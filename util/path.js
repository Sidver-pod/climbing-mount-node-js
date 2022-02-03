const path = require('path');

//gives the path to the file that is responsible for the running of the application
module.exports = path.dirname(require.main.filename);
