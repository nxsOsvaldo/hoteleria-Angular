import { Injectable } from '@angular/core';
import { environment } from '../environments/environments';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private authUrl: string = environment.authUrl;
  private tokenKey: string= 'auth-token';
  private payload: any | null=null;

  constructor(private http: HttpClient, private router: Router) {
    this.decodeToken();
  }

  login(username: string, password: string){
    return this.http.post<{token:string}>(this.authUrl, {username, password}).pipe(
      tap(response =>{
        if(response && response.token){
          localStorage.setItem(this.tokenKey,response.token);
          this.decodeToken();
        }
      })
    );
  }

  getToken(): string | null{
    return localStorage.getItem(this.tokenKey);
  }

  isLogged(): boolean{
    const token = this.getToken();
    return !!token && !this.isTokenExpired();
  }

  isTokenExpired(): boolean{
    const token = this.getToken();
    if(!token){return true;}
    try{
      const payload = JSON.parse(atob(token.split('.')[1]));
      const now = Math.floor(Date.now()/10000);
      return payload.exp < now;
    }catch(error){
      return true;
    }
  }

  logout(): void{
    localStorage.removeItem(this.tokenKey);
    this.router.navigate(['/login']);
  }

  isAuthenticated(): boolean{
    return !!this.getToken();
  }

  private decodeToken(): void{
    const token = this.getToken();
    if(token){
      try{
        this.payload=JSON.parse(atob(token.split('.')[1]));
      }catch(e){
        this.payload=null;
      }
    }else{
      this.payload=null;
    }
  }

  getUsername():string | null{
    const token=this.getToken();
    if(!token){return null;}
    try{
      this.payload=JSON.parse(atob(token.split('.')[1]));
      return this.payload.sub || null;
    }catch(e){
      return null;
    }
  }

  getRoles(): string[]{
    if(!this.payload)this.decodeToken();
    return this.payload?.roles || [];
  }

  hasRole(role: string): boolean{
    return this.getRoles().includes(role);
  }

  hasAnyRole(roles:string[]):boolean{
    return roles.some(role=>this.getRoles().includes(role));
  }
}
