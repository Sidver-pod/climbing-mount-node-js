const path = require('path');

//importing a path utility to make navigating among files a little cleaner!
const rootDir = require('../util/path');

exports.getContactUs = (req, res, next) => {
    res.sendFile(path.join(rootDir, 'views', 'contactus.html'));
};

exports.postContactUs = (req, res, next) => {
    console.log(req.body);
    res.redirect('/success');
};

exports.getSuccess = (req, res, next) => {
    res.sendFile(path.join(rootDir, 'views', 'success.html'));
}
