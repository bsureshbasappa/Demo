import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, map, of, pipe, ReplaySubject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IAddress } from '../shared/models/address';
import { IUser } from '../shared/models/user';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  baseUrl = environment.apiUrl;
  private currentUserSource = new ReplaySubject<IUser>(1);
  currentUser$ = this.currentUserSource.asObservable();
  
  constructor(private http: HttpClient, private router:Router) { }


  loadCurrentUser(token:string){
      token= "eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImJvYkB0ZXN0LmNvbSIsImdpdmVuX25hbWUiOiJib2IiLCJuYmYiOjE2MzI5MTUwNzIsImV4cCI6MTYzMzUxOTg3MiwiaWF0IjoxNjMyOTE1MDcyLCJpc3MiOiJodHRwczovL2xvY2FsaG9zdDo1MDAxIn0.fhgsL2S1FONJKF__tR7JRAPIpOZ7lfneWD2VJwovViWEqLX7N0p9pCm5HBW9xAJdBbQy09ot-ZkQ013tzz2ahA"
    if(token===null){
      this.currentUserSource.next(null);
      return of(null);
    }

    let headers = new HttpHeaders();
    headers = headers.set('Authorization', `Bearer ${token}`);
    return this.http.get(this.baseUrl + 'account', {headers}).pipe(
      map((user:IUser)=>{
        if(user)
        {
          localStorage.setItem('token', user.token);
          this.currentUserSource.next(user);
        }
      })
    )
  }

  login(values:any){
    return this.http.post(this.baseUrl + 'account/login', values).pipe(
      map ((user:IUser)=>{
        if(user){
          localStorage.setItem('token', user.token);
          this.currentUserSource.next(user);
        }
      })
    );
  }

  register(values:any){
    return this.http.post(this.baseUrl + 'account/register', values).pipe(
      map ((user:IUser)=>{
        if(user){
          localStorage.setItem('token', user.token);
          this.currentUserSource.next(user);
        }
      })
    );
  }

  logout(){
    localStorage.removeItem('token');
    this.currentUserSource.next(null);
    this.router.navigateByUrl('/');
  }

  checkEmailExists(email:string){
    return this.http.get(this.baseUrl + 'account/emailExists?email='+ email);
  }

  getUserAddress(){
    return this.http.get<IAddress>(this.baseUrl + 'account/address');
  }

  updateUserAddress(address:IAddress){

    return this.http.put<IAddress>(this.baseUrl + 'account/address', address);
  }

}
