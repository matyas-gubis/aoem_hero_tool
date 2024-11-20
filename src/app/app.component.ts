import {Component} from '@angular/core';
import {CommonModule} from '@angular/common';
import {Hero, heroes, Rarity} from '../data/heroes';

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
  currentlyDragged: EventTarget | null = null;
  draggedOver: any;
  draggedHero?: Hero;
  troops: Troop[] = []

  handleDragstart($event: DragEvent, hero: Hero) {
    this.currentlyDragged = $event.target;
    this.draggedHero = hero;
  }

  handleDragEnd() {
    this.currentlyDragged = null;
    if (this.draggedOver) {

    }
  }

  handleDragOver($event: DragEvent) {
    if (this.draggedHero) {
      $event.preventDefault();
    }
    this.draggedOver = $event.target;
  }

  handleDragLeave($event: DragEvent) {
    if (this.draggedHero) {
      $event.preventDefault();
    }
    this.draggedOver = undefined;
  }

  handleTroopAddClicked() {
    this.troops.push({id: this.troops.length + 1});
  }

  handleRemoveTroop(id: number) {
    this.troops = this.troops.filter(troop => troop.id !== id);
    this.troops.forEach((troop, index) => troop.id = index + 1);
  }
}

type Troop = {
  id: number,
  name?: string,
  commander?: Hero,
  secondInAttack?: Hero,
  thirdInAttack?: Hero
}
