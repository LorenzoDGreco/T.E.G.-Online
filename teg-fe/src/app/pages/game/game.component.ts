import { Component } from '@angular/core';

@Component({
  selector: 'app-game',
  imports: [],
  templateUrl: './game.component.html',
  styleUrl: './game.component.scss'
})
export class GameComponent {
  public activeFight: boolean = false;
  public colors: any = [
    {
      photo: "https://assets.dev-filo.dift.io/img/2019/09/12/customize-character1_sq.jpg",
      color: "#fc0f03"
    },
    {
      photo: "https://assets.dev-filo.dift.io/img/2019/09/12/customize-character1_sq.jpg",
      color: "#fcf003"
    },
    {
      photo: "https://assets.dev-filo.dift.io/img/2019/09/12/customize-character1_sq.jpg",
      color: "#8803fc"
    },
    {
      photo: "https://assets.dev-filo.dift.io/img/2019/09/12/customize-character1_sq.jpg",
      color: "#03ebfc"
    },
    {
      photo: "https://assets.dev-filo.dift.io/img/2019/09/12/customize-character1_sq.jpg",
      color: "#03ebfc"
    },
    {
      photo: "https://assets.dev-filo.dift.io/img/2019/09/12/customize-character1_sq.jpg",
      color: "#fc03db"
    },
    {
      photo: "https://assets.dev-filo.dift.io/img/2019/09/12/customize-character1_sq.jpg",
      color: "#fc03db"
    },
    {
      photo: "https://assets.dev-filo.dift.io/img/2019/09/12/customize-character1_sq.jpg",
      color: "#fc03db"
    },
    {
      photo: "https://assets.dev-filo.dift.io/img/2019/09/12/customize-character1_sq.jpg",
      color: "#fc03db"
    },
  ]

  public popupEvent: { fight: boolean, card: boolean } = {
    fight : false,
    card : false,
  }

  public players: any[] = [
    {id: 1},
    {id: 2},
    {id: 3},
    {id: 4},
    {id: 5},
    {id: 6},
    {id: 7},
    {id: 8},
  ]

  constructor() {
    console.log("");
  }
}
