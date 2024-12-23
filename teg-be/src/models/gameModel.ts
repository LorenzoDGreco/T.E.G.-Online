export class GameModel {
    id: number;
    game: Game = new Game();
    players: Player[] = [];
    map: Map = new Map();
    status: number = 0; // -1: finalizada, 0: lobby, 1: ingame

    constructor(id: number = 0) {
        this.id = id;
    }
}

export class Game {
    round: Round = new Round();
    name: string = "";
    config: Config = new Config();
}

export class Round {
    number: number = 0;
    phase: number = 0;
    currentPlayer: number = 0;
}

export class Config {
    maxPlayers: number = 0;
    minPlayers: number = 0;
    initialTroops: number = 0;
    cardsPerPlayer: number = 0;
}

export class Player {
    id: number = 0;
    admin: boolean = false;
    name: string = "";
    color: number = 0;
    totalTroops: number = 0;
    avaliableTroops: number = 0;
    totalCountries: number = 0;
    missions: number = 0;
    cards: Card[] = [];
}

export class Card {
    id: number = 0;
    shelled: boolean = false;
}

export class Map {
    countries: { [key: number]: Country } = {};
}

export class Country {
    troops: number = 0;
    player: number = 0;
}
