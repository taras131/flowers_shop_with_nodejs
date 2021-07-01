class APIError extends Error{
    constructor(status, message) {
        super();
        this.status = status
        this.message = message
    }
    static babRequest(message){
        return new APIError(404, message)
    }
    static internal(message){
        return new APIError(500, message)
    }
    static forbidden(message){
        return new APIError(403, message)
    }
}

module.exports = APIError