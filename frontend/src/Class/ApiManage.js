// "use strict"

class ApiManage {

    constructor(){
        this.host = "http://127.0.0.1:5000/"
    }

    uploadApi(){
        return this.host + "v1/upload"
    }
}

export default ApiManage