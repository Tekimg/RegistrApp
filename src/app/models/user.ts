export class User {
    username: string;
    password: string;
    email: string;
    name: string;
    lastname: string;
    number: string;

    constructor(u: string, p: string, e: string, n: string, l: string, v: string) {
        this.username = u;
        this.password = p;
        this.email = e;
        this.name = n;
        this.lastname = l;
        this.number = v;
    }
}
