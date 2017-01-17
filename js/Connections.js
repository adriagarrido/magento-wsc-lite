class Connections{
    constructor() {
        this.list = new Array();
        this.token = 0;
        if(localStorage.MagentoWSCL_Connections){
            this.list =  JSON.parse(localStorage.MagentoWSCL_Connections);
            this.token = localStorage.MagentoWSCL_Token;
        }
    }
    updateToken() {
        this.token += 1;
        localStorage.MagentoWSCL_Token = this.token;
    }
    addConnection(connection) {
        connection.id = this.token;
        this.updateToken();
        this.list.push(connection);
        this.save();
        return connection.id;
    }
    getConnection(id) {
        for (var i = 0; i < this.list.length; i += 1) {
            if (id == this.list[i].id) {
                return this.list[i];
                break;
            }
        }
    }
    editConnection(connection) {
        for (var i = 0; i < this.list.length; i += 1) {
            if (connection.id == this.list[i].id) {
                this.list[i] = connection;
                break;
            }
        }
        this.save();
        return connection.id;
    }
    deleteConnection(id) {
        for (var i = 0; i < this.list.length; i += 1) {
            if (id == this.list[i].id) {
                this.list.splice(i, 1);
                break;
            }
        }
        this.save();
    }
    toOptionArray(){
        var options = new Array();
        this.list.forEach(function(value, index){
            var option = document.createElement('option');
            option.text = value.apiUser + "@" + value.magentohost;
            option.value = value.id;
            options.push(option);
        });
        return options;
    }
    save() {
        localStorage.MagentoWSCL_Connections = JSON.stringify(this.list);
    }
}
