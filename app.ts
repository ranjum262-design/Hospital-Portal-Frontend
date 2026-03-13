import { RouterOutlet } from '@angular/router';
import { Navbar } from './components/navbar/navbar';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [Navbar, RouterOutlet ], // Add them here
  template: `
    <app-navbar></app-navbar>
  
    <router-outlet></router-outlet>
  `
})
export class AppComponent {}