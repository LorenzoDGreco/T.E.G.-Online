export class ResponseModel {
    public data: any;
    public error: string;
    public status: boolean;
    public error_code: string;

    constructor(data: any, error_code: string = '', error: string = '') {
        this.data = data;
        this.error_code = error_code;
        this.status = error_code ? false : true;
        this.error = error;
    }
}
