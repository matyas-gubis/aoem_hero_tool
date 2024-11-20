import {Component} from '@angular/core';
import {CommonModule} from '@angular/common';
import {Hero, heroes, Rarity} from '../data/heroes';
import {MessageService} from 'primeng/api';
import {Toast, ToastModule} from 'primeng/toast';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, ToastModule, Toast],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  providers: [MessageService]
})
export class AppComponent {
  title = 'aoem_hero_tool';
  protected readonly heroes = heroes
  protected readonly Rarity = Rarity;
  currentlyDragged: EventTarget | null = null;
  draggedOver: any;
  draggedHero?: Hero;
  troops: Troop[] = []

  constructor(private messageService: MessageService) {
  }

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
            if (target.heroes.secondInAttack === this.draggedHero || target.heroes.thirdInAttack === this.draggedHero) {
              this.messageService.add({
                icon: 'pi-alert',
                summary: 'Unable to do that',
                detail: 'This hero is already member of this troop.',
                severity: 'error'
              })
              break;
            }
            target.heroes.commander = this.draggedHero;
            break;
          case 'secondInAttack':
            if (target.heroes.commander === this.draggedHero || target.heroes.thirdInAttack === this.draggedHero) {
              this.messageService.add({
                icon: 'pi-alert',
                summary: 'Unable to do that',
                detail: 'This hero is already member of this troop.',
                severity: 'error'
              })
              break;
            }
            target.heroes.secondInAttack = this.draggedHero;
            break;
          case  'thirdInAttack':
            if (target.heroes.secondInAttack === this.draggedHero || target.heroes.commander === this.draggedHero) {
              this.messageService.add({
                icon: 'pi-alert',
                summary: 'Unable to do that',
                detail: 'This hero is already member of this troop.',
                severity: 'error'
              })
              break;
            }
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
