import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Topic } from '../../models/topic.model';
import { SafePipe } from '../../pipes/safe.pipe';

@Component({
  selector: 'app-topic-card',
  standalone: true,
  imports: [CommonModule, SafePipe],
  templateUrl: './topic-card.html',
  styleUrl: './topic-card.css',
})
export class TopicCard {
  @Input() topic!: Topic; 
}