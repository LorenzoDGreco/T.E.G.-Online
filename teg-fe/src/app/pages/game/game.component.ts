import { Component } from '@angular/core';

@Component({
  selector: 'app-game',
  imports: [],
  templateUrl: './game.component.html',
  styleUrl: './game.component.scss'
})
export class GameComponent {
  public activeFight: boolean = false;

  public popupEvent: { fight: boolean, card: boolean } = {
    fight : false,
    card : false,
  }

  public players: any[] = [
    {id: 1},
    {id: 2},
    {id: 3},
    {id: 1},
  ]

  constructor() {
    console.log("");
  }
}
