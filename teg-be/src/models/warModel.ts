export class warModel {
  warFigth: [] = []
  winnerAtTurn: boolean = false;
}

export class warFigthModel {
    from: warPlayerModel = new warPlayerModel();
    to: warPlayerModel = new warPlayerModel();
    status: warStatus = warStatus.attackFrom;
    winner: number = -1;
}

export class warPlayerModel {
  posicion: number = 0;
  tropas: number = 0;
  dados: number[] = [];
}

export enum warStatus {
    attackFrom, // el turno del jugar que ataca para tirar los datos
    attackTo, // el turno del jugador que defiende de tirar los dados
    move, // si gana el que ataca puede mover fichas
    finish // termina el combate y puede seguir jugando
}


// fun peliar() {
//     from tropas -> num dados
//     pelien -> tira dados y guardar
//     to tropas -> num dados
//     pelien -> tira
//     sql {
//     }
// }
