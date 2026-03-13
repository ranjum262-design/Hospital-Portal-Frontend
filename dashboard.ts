// dashboard.ts
import { Component, OnInit,ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HealthService } from '../../services/health.service';
import { Topic } from '../../models/topic.model';
import { TopicCard } from '../topic-card/topic-card';
import { RouterModule,Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';


@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, TopicCard,RouterModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard implements OnInit {
  allTopics: Topic[] = []; 
  filteredTopics: Topic[] = []; // Yahan initialize ho raha hai
  selectedCategory: string = 'All';

  constructor(
    private healthService: HealthService, 
    private cdr: ChangeDetectorRef ,// 👈 2. constructor mein inject karein
    public authService: AuthService, // 👈 'public' likhna zaroori hai taaki HTML ise use kar sake
    private router: Router
  ) {}

  ngOnInit(): void {
    this.healthService.getTopics().subscribe({
      next: (data: Topic[]) => {
        console.log("Backend se ye data aaya:", data);
        this.allTopics = data;
        this.filteredTopics = [...data]; // 👈 3. Spread operator use karein refresh ke liye
        this.cdr.detectChanges();
        // 👈 4. Forcefully UI update karein
        setTimeout(() => {
          this.cdr.detectChanges();
        }, 0);
      },
      error: (err) => console.error("Error fetching data:", err)
    });
  }

  filterByCategory(category: string) {
    this.selectedCategory = category;
    if (category === 'All') {
      this.filteredTopics = [...this.allTopics];
    } else {
      this.filteredTopics = this.allTopics.filter(t => t.category === category);
    }
    this.cdr.detectChanges(); // Sidebar click par bhi update karein
  }
}
