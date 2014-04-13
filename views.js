exports.index = function (req, res) {
    console.log("In index with user: " + req.user);
    console.log("And session id: " + req.session.id);

    res.render('index', {title: "Speed tests", message: "Hello, world", user: req.user});
};

