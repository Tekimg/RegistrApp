export class User {
    username: string;
    password: string;
    email: string;

    constructor(u: string, p: string, e: string){
        this.username =  u;
        this.password = p;
        this.email= e;
    }
}
