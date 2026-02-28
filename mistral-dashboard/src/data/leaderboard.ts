export type LeaderboardEntry = {
  id: string;
  playerName: string;
  wins: number;
  elo: number;
  npcAdaptationScore: number;
};

export const leaderboardEntries: LeaderboardEntry[] = [
  { id: "p1", playerName: "EchoHost", wins: 28, elo: 1650, npcAdaptationScore: 92 },
  { id: "p2", playerName: "VoxRanger", wins: 22, elo: 1584, npcAdaptationScore: 85 },
  { id: "p3", playerName: "MistralMage", wins: 17, elo: 1512, npcAdaptationScore: 81 },
  { id: "p4", playerName: "ArenaScout", wins: 12, elo: 1431, npcAdaptationScore: 74 },
];
