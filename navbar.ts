import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css'
})
export class Navbar implements OnInit {
   userName: string = 'Patient'; 

  constructor(private router: Router) {}

  ngOnInit() {
    
    const storedName = localStorage.getItem('userName');
    if (storedName) {
      this.userName = storedName;
    }
  }

  logout() {
    localStorage.clear();
    this.userName = 'Patient';
    this.router.navigate(['/login']);
  }
}