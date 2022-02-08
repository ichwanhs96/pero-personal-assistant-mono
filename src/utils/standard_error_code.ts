export class StandardError extends Error {
    constructor(error_code, message ) {
        super(message);        
        this.name = error_code;
    }

    generateAPIResponse() {
        return {
            error_code: this.name,
            message: this.message
        };
    }
};