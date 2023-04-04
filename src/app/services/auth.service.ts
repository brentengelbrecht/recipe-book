import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, tap } from "rxjs/operators";
import { BehaviorSubject, Subject, throwError } from "rxjs";
import { User } from "../model/user.model";
import { Router } from "@angular/router";


export interface AuthResponseData {
    kind: string,
    idToken: string,
    email: string,
    refreshToken: string,
    expiresIn: string,
    localId: string,
    registered?: boolean
}


@Injectable({ providedIn: 'root' })
export class AuthService {
    private apiKey = 'rogerRabbit';
    private signupUrl = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=' + this.apiKey;
    private signinUrl = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=' + this.apiKey;
    user = new BehaviorSubject<User>(null);
    private timer: any;

    constructor(private http: HttpClient, private router: Router) {}

    private handleAuthentication(email: string, userId: string, token: string, expiresIn: number) {
        const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);
        const user = new User(email, userId, token, expirationDate);
        this.user.next(user);
        this.autoLogout(expiresIn * 1000);
        localStorage.setItem('userData', JSON.stringify(user));
    }

    private handleError(errResp: HttpErrorResponse) {
        let errMsg = 'Unknown error occurred';
        if (!errResp.error || !errResp.error.error) {
            return throwError(errMsg);
        }

        switch(errResp.error.error.message) {
            case 'EMAIL_EXISTS':
                errMsg = 'This email already exists'; break;
            case 'EMAIL_NOT_FOUND':
                errMsg = 'This email does not exist'; break;
            case 'INVALID_PASSWORD':
                errMsg = 'This password is not correct'; break;
        }
        return throwError(errMsg);
    }

    signUp(email: string, password: string) {
        return this.http.post<AuthResponseData>(this.signupUrl, {
            email: email,
            password: password,
            returnSecureToken: true
        }).pipe(
            catchError(this.handleError), 
            tap(resData => this.handleAuthentication(resData.email, resData.localId, resData.idToken, +resData.expiresIn))
        );
    }

    autoLogin() {
        const userData: {
            email: string,
            id: string,
            _token: string,
            _tokenExpirationDate: string
        } = JSON.parse(localStorage.getItem('userData'));

        if (!userData) {
            return;
        }

        const loadedUser = new User(userData.email, userData.id, userData._token, new Date(userData._tokenExpirationDate));

        if (loadedUser.token) {
            this.user.next(loadedUser);
            const expirationDuration = new Date(userData._tokenExpirationDate).getTime() - new Date().getTime();
            this.autoLogout(expirationDuration);
        }
    }

    login(email: string, password: string) {
        return this.http.post<AuthResponseData>(this.signinUrl, {
            email: email,
            password: password,
            returnSecureToken: true
        }).pipe(
            catchError(this.handleError), 
            tap(resData => this.handleAuthentication(resData.email, resData.localId, resData.idToken, +resData.expiresIn))
        );
    }

    autoLogout(expirationDuration: number) {
        this.timer = setTimeout(() => {
            this.logout();
        }, expirationDuration);
    }

    logout() {
        this.user.next(null);
        localStorage.removeItem('userData');
        if (this.timer) {
            clearTimeout(this.timer);
            this.timer = null;
        }
        this.router.navigate(['/auth']);
    }
}
