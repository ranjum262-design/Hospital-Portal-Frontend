import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'https://hospital-portal-backend.onrender.com/api/users'; 

  constructor(private http: HttpClient) { }

  signup(userData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/signup`, userData);
  }
login(credentials: any): Observable<any> {
  return this.http.post(`${this.apiUrl}/login`, credentials);

}
// Ek simple variable rakhein login ke baad
isAdmin(): boolean {
  const role = localStorage.getItem('userRole'); 
  // Check karein ki role null nahi hai aur exact 'admin' hai
  return role !== null && role === 'admin';
}

}