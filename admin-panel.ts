import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.html',
  styleUrls: ['./admin-panel.css'],
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule]
})
export class AdminPanelComponent implements OnInit {
  topics: any[] = [];
  apiUrl = 'https://hospital-portal-backend.onrender.com/api/topics';
  isEditMode = false;
  
  // Default values
  selectedTopic: any = { title: '', category: 'Education', videoUrl: '', description: '', notes: '' };

  constructor(private http: HttpClient, private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.fetchTopics();
  }

  fetchTopics() {
    this.http.get<any[]>(this.apiUrl).subscribe({
      next: (data) => {
        this.topics = data;
        this.cdr.detectChanges();
      },
      error: (err) => console.error("Fetch error:", err)
    });
  }

  openAddModal() {
    this.isEditMode = false;
    this.selectedTopic = { title: '', category: 'Education', videoUrl: '', description: '', notes: '' };
  }

  openEditModal(topic: any) {
    this.isEditMode = true;
    this.selectedTopic = { ...topic };
  }

  onSubmit(form: any) {
    // 🟢 Sirf Title check kar rahe hain, Video URL optional hai
    if (!this.selectedTopic.title || this.selectedTopic.title.trim() === '') {
      alert("Bhai, Title likhna zaroori hai!");
      return;
    }

    // Agar URL khali hai toh default empty string bhej rahe hain
    const payload = {
      ...this.selectedTopic,
      videoUrl: this.selectedTopic.videoUrl || '' 
    };

    if (this.isEditMode) {
      this.http.put(`${this.apiUrl}/${this.selectedTopic._id}`, payload).subscribe({
        next: () => {
          alert('Updated Successfully!');
          this.resetAfterAction(form);
        },
        error: (err) => alert("Update failed: " + err.message)
      });
    } else {
      this.http.post(this.apiUrl, payload).subscribe({
        next: () => {
          alert('Saved Successfully!');
          this.resetAfterAction(form);
        },
        error: (err) => {
          console.error("Server Error:", err);
          alert("Save failed! Please check if 'notes' is added in your Backend Schema.");
        }
      });
    }
  }

  resetAfterAction(form: any) {
    this.fetchTopics();
    form.resetForm();
    document.getElementById('closeModal')?.click();
  }

  deleteTopic(id: string) {
    if(confirm('Delete it?')) {
      this.http.delete(`${this.apiUrl}/${id}`).subscribe(() => this.fetchTopics());
    }
  }
}