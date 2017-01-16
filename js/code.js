document.addEventListener("DOMContentLoaded", function(event) {
    var select = document.getElementById('connections');
    var connections = new Connections;

    //Fills  'connections' select with the localStorage data
    function display () {
        select.innerHTML = "";
        var option = document.createElement("option");
        option.text = "New Connection";
        option.value = "";
        select.add(option);

        for(var i = 0; i < connections.list.length; i++) {
            var option = document.createElement("option");
            option.value = i;
            option.text = connections.list[i].username + "@" + connections.list[i].url;
            select.add(option);
        }
    }
    display();

    //Adds (or modifies) the current connection to localStorage
    document.getElementById('save').onclick = function(){
        var url = document.getElementById('url').value;
        var username = document.getElementById('username').value;
        var password = document.getElementById('password').value;

        if (typeof(Storage) && url != '' && username != '' && password != '') {
            var new_connection = {
                "url": url,
                "username": username,
                "password": password,
            }
            var id = select.value;
            connections.save(new_connection, id);
            display();
        }
    };

    //Fills the connection form with the selected connection
    document.getElementById('connections').onchange = function(){
        var id = select.value;
        if(id){
            document.getElementById('magentohost').value = connections.list[id].url;
            document.getElementById('apiUser').value = connections.list[id].username;
            document.getElementById('apiKey').value = connections.list[id].password;
        }else{
            document.getElementById('create_form').reset();
        }
    }

    //Removes the selected connection from localStorage
    document.getElementById('remove').onclick = function(){
        var id = select.value;
        if(id){
            connections.remove(id);
            display();
            document.getElementById('create_form').reset();
        }
    }

    document.getElementById('request_form').onsubmit = function(){
        //Mirar si el formulario de arriba tiene datos o existe la conexión.
        var connection = connections.list[select.value];
        var request = new Request(
            connection,
            this.resource.value,
            this.method.value,
            this.args.value
        );
        request.send(function(response){
            document.getElementById('results_board').innerHTML = JSON.stringify(JSON.parse(response), null, 2);
        });
        return false;
    }
});
