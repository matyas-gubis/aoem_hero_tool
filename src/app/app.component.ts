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
    if (this.draggedOver && this.draggedOver.troop && this.draggedOver.slotName) {
      let target = this.troops.find(troop => this.draggedOver.troop.id === troop.id)
      if (target && this.draggedOver.slotName) {
        switch (this.draggedOver.slotName) {
          case 'commander':
            target.heroes.commander = this.draggedHero;
            break;
          case 'secondInAttack':
            target.heroes.secondInAttack = this.draggedHero;
            break;
          case  'thirdInAttack':
            target.heroes.thirdInAttack = this.draggedHero;
            break;
          default:
            break;
        }
      }
    }
    console.log(this.troops)
    this.currentlyDragged = null;
  }

  handleDragOver($event: DragEvent, troop: Troop, slotName: string) {
    if (this.draggedHero) {
      $event.preventDefault();
    }
    let target = this.troops.find(t => t.id === troop.id)
    if (target) {
      this.draggedOver = {troop: target, slotName: slotName};
    }
  }

  handleDragLeave($event: DragEvent) {
    if (this.draggedHero) {
      $event.preventDefault();
    }
    this.draggedOver = undefined;
  }

  handleTroopAddClicked() {
    this.troops.push({
      id: this.troops.length + 1,
      heroes: {commander: undefined, secondInAttack: undefined, thirdInAttack: undefined}
    });
  }

  handleRemoveTroop(id: number) {
    this.troops = this.troops.filter(troop => troop.id !== id);
    this.troops.forEach((troop, index) => troop.id = index + 1);
  }
}

type Troop = {
  id: number,
  name?: string,
  heroes: {
    commander?: Hero,
    secondInAttack?: Hero,
    thirdInAttack?: Hero
  },
}
