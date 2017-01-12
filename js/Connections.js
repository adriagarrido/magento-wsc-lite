class Connections{
    get list (){
        var tmp = new Array();
        if(localStorage.MagentoWSCL_Connections){
            tmp =  JSON.parse(localStorage.MagentoWSCL_Connections);
        }
        return tmp;
    }

    set list (connections){
        localStorage.MagentoWSCL_Connections = connections;
    }

    save (connection, id){
        var tmp = new Array();
        if (localStorage.MagentoWSCL_Connections) {
            tmp = JSON.parse(localStorage.MagentoWSCL_Connections);
        }
        if(id){
            tmp[id] = connection;
        }else{
            tmp.push(connection);
        }
        localStorage.MagentoWSCL_Connections = JSON.stringify(tmp);
        this.display();
    }

    remove (id){
        var tmp = this.list;
        tmp.splice(id, 1);
        this.list = JSON.stringify(tmp);
        this.display();
    }

    //Fills  'connections' select with the localStorage data
    display () {
        document.getElementById('connections').innerHTML = "";
        var option = document.createElement("option");
        option.text = "New Connection";
        option.value = "";
        document.getElementById('connections').add(option);

        for(var i = 0; i < this.list.length; i++) {
            var option = document.createElement("option");
            option.value = i;
            option.text = this.list[i].username + "@" + this.list[i].url;
            document.getElementById('connections').add(option);
        }
    }
}
