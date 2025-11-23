
export type Score = { runs: number; wickets: number; overs: number };
export type Result = "team1" | "team2" | "tie" | "nr"; // 'nr' = No Result

export type MatchResult = {
  team1: string;
  team2: string;
  t1Score: Score; // Team 1 Batting Stats
  t2Score: Score; // Team 2 Batting Stats
  winner: Result;
};

export const MATCH_RESULTS: MatchResult[] = [
  // Match 1: Janakpur vs Kathmandu (Kathmandu Won)
  {
    team1: "Janakpur Bolts",
    team2: "Kathmandu Gorkhas",
    t1Score: { runs: 145, wickets: 8, overs: 20.0 },
    t2Score: { runs: 146, wickets: 4, overs: 18.2 },
    winner: "team2",
  },
  // Match 2: Chitwan vs Karnali (Chitwan Won)
  {
    team1: "Chitwan Rhinos",
    team2: "Karnali Yaks",
    t1Score: { runs: 160, wickets: 6, overs: 20.0 },
    t2Score: { runs: 130, wickets: 10, overs: 19.0 }, // All out count as 20 overs for NRR calc
    winner: "team1",
  },
  // Match 3: Biratnagar vs Pokhara (Biratnagar Won)
  {
    team1: "Biratnagar Kings",
    team2: "Pokhara Avengers",
    t1Score: { runs: 180, wickets: 3, overs: 20.0 },
    t2Score: { runs: 150, wickets: 7, overs: 20.0 },
    winner: "team1",
  },
  // Match 4: Kathmandu vs Sudurpaschim (Kathmandu Won)
  {
    team1: "Kathmandu Gorkhas",
    team2: "Sudurpaschim Royals",
    t1Score: { runs: 170, wickets: 5, overs: 20.0 },
    t2Score: { runs: 120, wickets: 10, overs: 16.4 },
    winner: "team1",
  },
  // Add more matches here as they happen...
];

export const TEAMS_LIST = [
  "Biratnagar Kings",
  "Janakpur Bolts",
  "Karnali Yaks",
  "Kathmandu Gorkhas",
  "Lumbini Lions",
  "Pokhara Avengers",
  "Chitwan Rhinos",
  "Sudurpaschim Royals",
];

export type TableRowData = {
  name: string;
  played: number;
  won: number;
  lost: number;
  tied: number;
  nr: number;
  points: number;
  nrr: number;
  form: string[];
  runsScored: number;
  ballsFaced: number;
  runsConceded: number;
  ballsBowled: number;
};

export const calculateTable = () => {
  // Initialize Map
  const stats: Record<string, TableRowData> = {};
  TEAMS_LIST.forEach((team) => {
    stats[team] = {
      name: team,
      played: 0,
      won: 0,
      lost: 0,
      tied: 0,
      nr: 0,
      points: 0,
      nrr: 0,
      form: [],
      runsScored: 0,
      ballsFaced: 0,
      runsConceded: 0,
      ballsBowled: 0,
    };
  });

  // Helper: Convert Overs (e.g., 19.2) to Balls (e.g., 116)
  const oversToBalls = (overs: number) => {
    const whole = Math.floor(overs);
    const part = Math.round((overs - whole) * 10);
    return whole * 6 + part;
  };

  // Process Each Match
  MATCH_RESULTS.forEach((match) => {
    const { team1, team2, t1Score, t2Score, winner } = match;

    // Update Played & Form
    if (stats[team1]) {
      stats[team1].played++;
      stats[team1].form.push(
        winner === "team1" ? "W" : winner === "team2" ? "L" : "D"
      );
    }
    if (stats[team2]) {
      stats[team2].played++;
      stats[team2].form.push(
        winner === "team2" ? "W" : winner === "team1" ? "L" : "D"
      );
    }

    // Update W/L/Pts
    if (winner === "team1") {
      stats[team1].won++;
      stats[team1].points += 2;
      stats[team2].lost++;
    } else if (winner === "team2") {
      stats[team2].won++;
      stats[team2].points += 2;
      stats[team1].lost++;
    } else {
      stats[team1].points += 1;
      stats[team1].tied++; // Simplified Tie/NR logic
      stats[team2].points += 1;
      stats[team2].tied++;
    }

    // Update NRR Stats (Batting Side stats)
    // Note: If a team is all out (10 wickets), overs faced is capped at 20.0 (120 balls)
    const t1Balls = t1Score.wickets === 10 ? 120 : oversToBalls(t1Score.overs);
    const t2Balls = t2Score.wickets === 10 ? 120 : oversToBalls(t2Score.overs);

    stats[team1].runsScored += t1Score.runs;
    stats[team1].ballsFaced += t1Balls;
    stats[team1].runsConceded += t2Score.runs;
    stats[team1].ballsBowled += t2Balls;

    stats[team2].runsScored += t2Score.runs;
    stats[team2].ballsFaced += t2Balls;
    stats[team2].runsConceded += t1Score.runs;
    stats[team2].ballsBowled += t1Balls;
  });

  // Final Calculation & Sort
  return Object.values(stats)
    .map((team) => {
      const battingRR =
        team.ballsFaced > 0 ? (team.runsScored / team.ballsFaced) * 6 : 0;
      const bowlingRR =
        team.ballsBowled > 0 ? (team.runsConceded / team.ballsBowled) * 6 : 0;
      team.nrr = battingRR - bowlingRR;
      // Keep only last 5 form results
      if (team.form.length > 5) team.form = team.form.slice(-5);
      return team;
    })
    .sort((a, b) => {
      if (b.points !== a.points) return b.points - a.points; // Primary Sort: Points
      return b.nrr - a.nrr; // Secondary Sort: NRR
    });
};
