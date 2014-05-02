var userdb = require ('./userdb.js');
exports.index = function (req, res) {
    var username = userdb.get_user_name(req.session.id);
    res.render('index', {title: "Speed tests", message: "Hello, world", user: username});
};

exports.tests = function(req, res){
    var username = userdb.get_user_name(req.session.id);
    res.render('tests', {title: "Speed tests", message: "Testing?", user: username});
};

exports.upload = function(req, res){
    var username = userdb.get_user_name(req.session.id);
    res.render('upload', {title:"Upload tests", message: "Testing?", user: username});

};

exports.download = function(req, res){
    var username = userdb.get_user_name(req.session.id);
    res.render('download', {title:"Download tests", message: "Testing?", user: username});
};
