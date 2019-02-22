export class AuthentificationService{
    private isAuthentificated = false;

    login(){
        this.isAuthentificated = true;
    }

    logout(){
        this.isAuthentificated = true;
        window.localStorage.clear();
    }

    isLoggedIn(): boolean{
        return this.isAuthentificated;
    }
}