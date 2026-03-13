import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FormsModule } from '@angular/forms'; 
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  credentials = { email: '', password: '' };

  constructor(private auth: AuthService, private router: Router) {}

  onLogin() {
    console.log("Attempting Login:", this.credentials);
  
    this.auth.login(this.credentials).subscribe({
      next: (res: any) => {
        console.log("Server Response:", res);

        // 1. Purana data saaf karein
        localStorage.clear(); 

        // 2. Naya data save karein
        // ✅ Ye line sabse zaroori hai Admin Access ke liye
        localStorage.setItem('userRole', res.user.role); 
        
        localStorage.setItem('userName', res.user.fullName);
        localStorage.setItem('userId', res.user._id);
        
        // Agar aap token use kar rahe hain toh:
        if (res.token) {
          localStorage.setItem('token', res.token);
        }

        alert('Login Successful!');
        this.router.navigate(['/dashboard']);
      },
      error: (err) => {
        console.error("Login Error:", err);
        alert('Login Failed: ' + (err.error?.error || 'Invalid Credentials'));
      }
    });
  }
}