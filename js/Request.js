class Request {
    constructor(connection, resource, method, args) {
        this.connection = connection;
        this.resource = resource;
        this.method = method;
        this.args = args;
    }
    send(callback) {
        var requestData = {
            'connection': this.connection,
            'resource': this.resource,
            'method': this.method,
            'args': this.args
        };
        var xhttp = new XMLHttpRequest();
        xhttp.open("POST", 'ajax/soap.php', true);
        xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        xhttp.setRequestHeader("Content-length", requestData.length);
        xhttp.setRequestHeader("Connection", "close");
        xhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                callback(xhttp.responseText);
            }
        };
        xhttp.send('requestData='+JSON.stringify(requestData));
    }
}
