document.addEventListener("DOMContentLoaded", function(event) {
    var select = document.getElementById('connections');
    var connections = new Connections;

    connections.display();

    //Adds or modifies a connection to localStorage
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
        }
    };

    //Fills the connection form with the connection choosed at 'connections'
    document.getElementById('connections').onchange = function(){
        var id = select.value;
        if(id){
            document.getElementById('url').value = connections.list[id].url;
            document.getElementById('username').value = connections.list[id].username;
            document.getElementById('password').value = connections.list[id].password;
        }else{
            document.getElementById('create_form').reset();
        }
    }

    //Removes a connection from localStorage
    document.getElementById('remove').onclick = function(){
        var id = select.value;
        if(id){
            connections.remove(id);
        }
    }
});
