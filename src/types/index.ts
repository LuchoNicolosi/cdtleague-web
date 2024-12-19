export interface Player {
  id: number;
  name: string;
  avatar: string;
  description: string;
  cups: number;
}

export interface Match {
  id: number;
  player1Id: string;
  player2Id: string;
  playerOneName: string;
  playerTwoName: string;
  playerOneScore: number;
  playerTwoScore: number;
  type: string;
}

export enum MatchType {
  FRIENDLY = "FRIENDLY",
  TOURNAMENT = "TOURNAMENT",
}
