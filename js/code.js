document.addEventListener("DOMContentLoaded", function(event) {
    var select = document.getElementById('connections');
    var connections = new Connections;

    display();
    form_mode("add");

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
            option.text = connections.list[i].apiUser + "@" + connections.list[i].magentohost;
            select.add(option);
        }
    }

    //Shows or hides the fieds of connection form
    function form_mode (mode) {
        var add = selected = edit = 'none';
        if(mode == 'add'){
            add = "";
        }else if (mode == 'edit'){
            edit = "";
            add = "";
        }else if (mode == 'selected'){
            selected = "";
        }

        document.getElementById('magentohost').style.display = add;
        document.getElementById('apiUser').style.display = add;
        document.getElementById('apiKey').style.display = add;

        document.getElementById('save').style.display = add;
        document.getElementById('edit').style.display = selected;
        document.getElementById('remove').style.display = edit;
    }

    //Adds (or modifies) the current connection to localStorage
    document.getElementById('save').onclick = function(){
        var magentohost = document.getElementById('magentohost').value;
        var apiUser = document.getElementById('apiUser').value;
        var apiKey = document.getElementById('apiKey').value;

        if (typeof(Storage) && magentohost != '' && apiUser != '' && apiKey != '') {
            var new_connection = {
                "magentohost": magentohost,
                "apiUser": apiUser,
                "apiKey": apiKey,
            }
            var id = select.value;
            connections.save(new_connection, id);
            display();
            form_mode("selected");
            select.value = (id) ? id : connections.list.length - 1;
        }
    };

    //Removes the selected connection from localStorage
    document.getElementById('remove').onclick = function(){
        var id = select.value;
        if(id){
            connections.remove(id);
            display();
            document.getElementById('create_form').reset();
            form_mode("add");
        }
    }

    //Fills the connection form with the selected connection
    document.getElementById('connections').onchange = function(){
        var id = select.value,
            mode = '';
        if(id){
            document.getElementById('magentohost').value = connections.list[id].magentohost;
            document.getElementById('apiUser').value = connections.list[id].apiUser;
            document.getElementById('apiKey').value = connections.list[id].apiKey;
            mode = 'selected';
        }else{
            document.getElementById('create_form').reset();
            mode = 'add';
        }
        form_mode(mode);
    }

    document.getElementById('edit').onclick = function(){
        form_mode ("edit");
    }
});
