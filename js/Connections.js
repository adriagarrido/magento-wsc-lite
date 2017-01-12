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
        var tmp = this.list;
        if(id){
            tmp[id] = connection;
        }else{
            tmp.push(connection);
        }
        this.list = JSON.stringify(tmp);
    }

    remove (id){
        var tmp = this.list;
        tmp.splice(id, 1);
        this.list = JSON.stringify(tmp);
    }
}
