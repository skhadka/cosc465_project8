var myapp = (function(){
    var socket = io.connect();
    
    socket.on('pong', function(data) {
        var rtt = Date.now() - data.timestamp;
        console.log("Ping RTT (milliseconds): " + rtt);
        var total_rtt = data.total_rtt+rtt;
        
        if(data.seq_num==4){
            socket.emit('latency_test', {avgrtt: total_rtt/5});
            jQuery("#status").text("Avg RTT: " + (total_rtt/5) + " milliseconds.");
            console.log("\n");
        }else{
            socket.emit('ping', {timestamp: Date.now(), seq_num: data.seq_num+1, total_rtt: total_rtt});
        }
    });
    
    socket.on('upload_pong', function(data) {
        var rtt = Date.now() - data.timestamp;
        console.log("Upload RTT (milliseconds): " + rtt);
        var total_rtt = data.total_rtt + rtt;
        if(data.seq_num==4) {
            socket.emit('upload_test', {upload_avg: total_rtt/5});
            jQuery("#uploadstatus").text("Avg upload RTT: " + (total_rtt/5) + " milliseconds.");
            console.log("\n");
        } else {
            socket.emit('upload_ping', {uploadtest: data.uploadtest, timestamp: Date.now(), seq_num: data.seq_num + 1, total_rtt: total_rtt});
        }
    });
    
    var start_upload = function() {
        var arr = new Float64Array(1000); //1M slow! stick with 1K
        socket.emit('upload_ping', {uploadtest: arr, timestamp: Date.now(), seq_num: 0, total_rtt: 0});
    };
    
    
    var start_ping = function() {
        socket.emit('ping', {timestamp: Date.now(), seq_num: 0, total_rtt: 0});
    };
    
    

    return {
        init: function() {
            console.log("Client-side app starting up");
            jQuery("#startping").click(start_ping);
            jQuery("#uploadinfo").click(start_upload);
        }
    }
})();
jQuery(myapp.init);

