import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FormsModule } from '@angular/forms'; 
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, CommonModule,RouterModule],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register {
  user = { fullName: '', email: '', password: '' };

  constructor(private auth: AuthService, private router: Router) {}

onSignup() {

  console.log("Sending data to MongoDB:", this.user); // Check karein ki data aa raha hai
  this.auth.signup(this.user).subscribe({
    next: (res) => {
      alert('Signup Successful!');
      
      localStorage.setItem('userName', this.user.fullName);
      
      this.router.navigate(['/dashboard']); 
    },
    error: (err) => {
      console.error("Signup Error:", err);
      alert('Error: ' + (err.error?.message || 'Server connection failed'));
    }
  });
}
}
  
