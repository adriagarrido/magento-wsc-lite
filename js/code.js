document.addEventListener("DOMContentLoaded", function(event) {
    var select_connections = document.getElementById('connections'),
        connections = new Connections();
    //Fills  'connections' select with the localStorage data
    function showConnection(id = '') {
        select_connections.innerHTML = "";
        var empty_option = document.createElement("option");
        empty_option.text = "New Connection";
        empty_option.value = "";
        select_connections.add(empty_option);
        connections.toOptionArray().forEach(function(value){
            select_connections.add(value);
        });
        select_connections.value = id;
    }
    function tempConnection() {
        var id = select_connections.value,
            magentohost = document.getElementById('magentohost').value,
            apiUser = document.getElementById('apiUser').value,
            apiKey = document.getElementById('apiKey').value;
        return new Connection(magentohost, apiUser, apiKey, id);
    }
    //Adds (or modifies) the current connection to localStorage
    function saveConnection() {
        var connection = tempConnection();
        if (select_connections.value) {
            return connections.editConnection(connection);
        } else {
            return connections.addConnection(connection);
        }
    }
    //Removes the selected connection from localStorage
    function deleteConnection() {
        connections.deleteConnection(select_connections.value);
    }
    //Shows or hides the fieds of connection form
    function form_mode (mode) {
        var add = selected = edit = 'none';
        if(mode == 'add'){
            add = "";
            document.getElementById('create_form').reset();
        }else if (mode == 'edit'){
            edit = "";
            add = "";
        }else if (mode == 'selected'){
            selected = "";
        }

        document.querySelector('label[for="magentohost"]').style.display = add;
        document.getElementById('magentohost').style.display = add;
        document.querySelector('label[for="apiUser"]').style.display = add;
        document.getElementById('apiUser').style.display = add;
        document.querySelector('label[for="apiKey"]').style.display = add;
        document.getElementById('apiKey').style.display = add;

        document.getElementById('save').style.display = add;
        document.getElementById('edit').style.display = selected;
        document.getElementById('remove').style.display = edit;
    }

    form_mode("add");
    showConnection();
    document.getElementById('save').onclick = function() {
        showConnection(saveConnection());
        form_mode('selected');
    };
    document.getElementById('remove').onclick = function() {
        deleteConnection();
        showConnection();
        form_mode('add');
    }
    //Fills the connection form with the selected connection
    select_connections.onchange = function(){
        var connection = connections.getConnection(select_connections.value),
            mode = 'add';
        if (select_connections.value) {
            document.getElementById('magentohost').value = connection.magentohost;
            document.getElementById('apiUser').value = connection.apiUser;
            document.getElementById('apiKey').value = connection.apiKey;
            mode = 'selected';
        }
        form_mode(mode);
    }
    document.getElementById('edit').onclick = function(){
        form_mode ("edit");
    }
    document.getElementById('request_form').onsubmit = function(){
        //Mirar si el formulario de arriba tiene datos.
        var connection = tempConnection();
        var request = new Request(
            connection,
            this.resource.value,
            this.method.value,
            args = (this.args.value == "")? '': JSON.parse(this.args.value)
        );
        document.getElementById('results_board').innerHTML = "Searching...";
        request.send(function(response){
            try {
                response = JSON.stringify(JSON.parse(response), null, 2);
            } catch (e) {

            } finally {
                document.getElementById('results_board').innerHTML = response;
            }
        });
        return false;
    }
});
