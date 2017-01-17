class Connection {
    constructor(magentohost, apiUser, apiKey, id = null) {
        this.magentohost = magentohost;
        this.apiUser = apiUser;
        this.apiKey = apiKey;
        this.id = id;
    }
}
