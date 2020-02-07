// "use strict"

class ApiManage {

    constructor(){
        this.host = "http://127.0.0.1:5000/api/v1/"
    }

    uploadApi(){
        return this.host + "upload"
    }

    branchAPI(){
        return this.host + "branch"
    }
}

export default ApiManage