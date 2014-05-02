var userhash = { };  //{session ID -> user data}
var next_anonymous = 1; 

var add_user = function(id, user) {
    if (userhash[id] === undefined) {
        if (!user) {
            user = 'anonymous' + next_anonymous;
            next_anonymous += 1;
        }
        userhash[id] = {
            'id': id,
            'user': user,
            'latency_results': [],
            'upload_results': []	
        };
    }
    return userhash[id];
};

exports.add_user = add_user;

exports.get_user_name = function(id) {
    if (userhash[id] === undefined) {
        add_user(id, undefined);
    }
    return userhash[id].user;
};



//add to latency results
exports.add_latency_result = function(id, result) {
    if (userhash[id] === undefined) {
        add_user(id, undefined);
    }
    console.log("LATENCY");
    console.log(result);
    userhash[id].latency_results[userhash[id].latency_results.length] = result;
};

exports.get_latency_results = function(id){
    return userhash[id].latency_results;
};


exports.add_upload_result = function(id, result) {
    if (userhash[id] === undefined) {
        add_user(id, undefined);
    }
    console.log("UPLOAD");
    console.log(result);
    userhash[id].upload_results[userhash[id].upload_results.length] = result;
};

