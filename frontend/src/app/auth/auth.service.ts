import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isLoggedIn = false;
  private currentUser: any;

  constructor(private router: Router) {
    this.loadUserFromLocalStorage();
  }

  login(user: any) {
    this.isLoggedIn = true;
    this.currentUser = user;
    localStorage.setItem('currentUser', JSON.stringify(user));
  }

  logout() {
    this.isLoggedIn = false;
    this.currentUser = null;
    localStorage.removeItem('currentUser');
    this.router.navigate(['/logar']);
  }

  isAuthenticated(): boolean {
    return this.isLoggedIn;
  }

  getCurrentUser() {
    return this.currentUser;
  }

  private loadUserFromLocalStorage() {
    const userJson = localStorage.getItem('currentUser');
    if (userJson) {
      this.currentUser = JSON.parse(userJson);
      this.isLoggedIn = true;
    } else {
      this.currentUser = null;
      this.isLoggedIn = false;
    }
  }
}