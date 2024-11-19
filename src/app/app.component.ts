import {Component} from '@angular/core';
import {CommonModule} from '@angular/common';
import {heroes, Rarity} from '../data/heroes';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'aoem_hero_tool';
  protected readonly heroes = heroes
  protected readonly Rarity = Rarity;
}
