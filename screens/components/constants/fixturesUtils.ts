// --- Types ---
export type Match = {
  id: string;
  team1: string;
  team2: string;
  title?: string; // For Playoffs
  specialType?: "qualifier" | "eliminator" | "final";
  fullDate: Date; // Used for logic and time display
  endTime?: Date;
  isButton?: boolean; // New flag for button item
};

export type SectionData = {
  title: string;
  data: Match[];
  isPast?: boolean;
  isToday?: boolean;
  isButtonSection?: boolean; // New flag
};

// Mock current date for consistent testing
export const CURRENT_DATE = new Date();

/**
 * Get the difference in days between a given date and current date.
 * Negative = past, 0 = today, positive = future
 */
export const getDiffDays = (date: Date): number => {
  const d1 = new Date(date.getFullYear(), date.getMonth(), date.getDate());
  const d2 = new Date(
    CURRENT_DATE.getFullYear(),
    CURRENT_DATE.getMonth(),
    CURRENT_DATE.getDate()
  );
  const diffTime = d1.getTime() - d2.getTime();
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
};

/**
 * Format a time string from a Date object (HH:MM AM/PM format)
 */
export const formatTimeFromDate = (date: Date): string => {
  let hours = date.getHours();
  const minutes = date.getMinutes();
  const ampm = hours >= 12 ? "PM" : "AM";
  hours = hours % 12;
  hours = hours ? hours : 12;

  const minutesStr = minutes.toString().padStart(2, "0");
  const hoursStr = hours.toString().padStart(2, "0");

  return `${hoursStr}:${minutesStr} ${ampm}`;
};

/**
 * Generate a readable day title for display
 */
export const getDayTitle = (date: Date): string => {
  const diffDays = getDiffDays(date);

  if (diffDays === 0) return "Today";
  if (diffDays === 1) return "Tomorrow";
  if (diffDays === -1) return "Yesterday";

  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const d1 = new Date(date.getFullYear(), date.getMonth(), date.getDate());
  const day = days[d1.getDay()];
  const dateNum = d1.getDate().toString().padStart(2, "0");
  const month = months[d1.getMonth()];

  return `${day}, ${dateNum} ${month}`;
};

/**
 * Determine the status of a match based on current time
 */
export type MatchStatus = "UPCOMING" | "LIVE" | "ENDED" | "FINISHED";

export const getStatus = (
  fullDate: Date,
  endTime?: Date
): MatchStatus => {
  const diff = getDiffDays(fullDate);
  const now = CURRENT_DATE.getTime();
  const start = fullDate.getTime();
  const end = endTime?.getTime() ?? start + 4 * 60 * 60 * 1000; // Default 4 hours

  // Match has passed (older than today)
  if (diff < 0) return "FINISHED";

  // Today's match
  if (diff === 0) {
    // Match hasn't started yet
    if (now < start) return "UPCOMING";
    // Match is currently ongoing
    if (now >= start && now < end) return "LIVE";
    // Match has ended today
    return "ENDED";
  }

  // Future matches
  return "UPCOMING";
};

/**
 * Categorize matches by their relative date
 * Returns: { older: [], core: [], future: [] }
 */
export const categorizeSectionsByDate = (
  sections: Array<{ data: Array<{ fullDate: Date }> }>
) => {
  const older: typeof sections = [];
  const core: typeof sections = [];
  const future: typeof sections = [];

  sections.forEach((section) => {
    const date = section.data[0]?.fullDate;
    if (!date) return;

    const diff = getDiffDays(date);

    if (diff < -2) {
      older.push(section);
    } else if (diff > 2) {
      future.push(section);
    } else {
      core.push(section);
    }
  });

  return { older, core, future };
};

// --- Helper: Date formatter ---
const d = (month: number, day: number, hour: number = 0, minute: number = 0) =>
  new Date(2025, month - 1, day, hour, minute);

/**
 * RAW_SECTIONS - Cricket tournament fixture schedule
 * Edit this data directly to update match times during the tournament
 */
export const RAW_SECTIONS: SectionData[] = [
  {
    title: "Monday, 17 Nov",
    data: [
      {
        id: "1",
        team1: "Janakpur Bolts",
        team2: "Kathmandu Gorkhas",
        fullDate: d(11, 17, 16),
        endTime: d(11, 17, 20),
      },
    ],
  },
  {
    title: "Tuesday, 18 Nov",
    data: [
      {
        id: "2",
        team1: "Chitwan Rhinos",
        team2: "Karnali Yaks",
        fullDate: d(11, 18, 11, 45),
        endTime: d(11, 18, 15, 45),
      },
      {
        id: "3",
        team1: "Biratnagar Kings",
        team2: "Pokhara Avengers",
        fullDate: d(11, 18, 16),
        endTime: d(11, 18, 20),
      },
    ],
  },
  {
    title: "Wednesday, 19 Nov",
    data: [
      {
        id: "4",
        team1: "Kathmandu Gorkhas",
        team2: "Sudurpaschim Royals",
        fullDate: d(11, 19, 16),
        endTime: d(11, 19, 20),
      },
    ],
  },
  {
    title: "Thursday, 20 Nov",
    data: [
      {
        id: "5",
        team1: "Lumbini Lions",
        team2: "Chitwan Rhinos",
        fullDate: d(11, 20, 16),
        endTime: d(11, 20, 20),
      },
    ],
  },
  {
    title: "Friday, 21 Nov",
    data: [
      {
        id: "6",
        team1: "Pokhara Avengers",
        team2: "Sudurpaschim Royals",
        fullDate: d(11, 21, 16),
        endTime: d(11, 21, 20),
      },
    ],
  },
  {
    title: "Saturday, 22 Nov",
    data: [
      {
        id: "7",
        team1: "Karnali Yaks",
        team2: "Lumbini Lions",
        fullDate: d(11, 22, 11, 15),
        endTime: d(11, 22, 16, 15),
      },
      {
        id: "8",
        team1: "Kathmandu Gorkhas",
        team2: "Biratnagar Kings",
        fullDate: d(11, 22, 16, 15),
        endTime: d(11, 22, 20, 15),
      },
    ],
  },
  {
    title: "Sunday, 23 Nov",
    data: [
      {
        id: "8b",
        team1: "Chitwan Rhinos",
        team2: "Pokhara Avengers",
        fullDate: d(11, 23, 12, 15),
        endTime: d(11, 23, 16, 15),
      },
    ],
  },
  {
    title: "Monday, 24 Nov",
    data: [
      {
        id: "9",
        team1: "Janakpur Bolts",
        team2: "Biratnagar Kings",
        fullDate: d(11, 24, 11, 45),
        endTime: d(11, 24, 15, 45),
      },
      {
        id: "10",
        team1: "Sudurpaschim Royals",
        team2: "Karnali Yaks",
        fullDate: d(11, 24, 16),
        endTime: d(11, 24, 20),
      },
    ],
  },
  {
    title: "Tuesday, 25 Nov",
    data: [
      {
        id: "11",
        team1: "Kathmandu Gorkhas",
        team2: "Lumbini Lions",
        fullDate: d(11, 25, 16),
        endTime: d(11, 25, 20),
      },
    ],
  },
  {
    title: "Wednesday, 26 Nov",
    data: [
      {
        id: "12",
        team1: "Biratnagar Kings",
        team2: "Chitwan Rhinos",
        fullDate: d(11, 26, 16),
        endTime: d(11, 26, 20),
      },
    ],
  },
  {
    title: "Thursday, 27 Nov",
    data: [
      {
        id: "13",
        team1: "Lumbini Lions",
        team2: "Sudurpaschim Royals",
        fullDate: d(11, 27, 11, 45),
        endTime: d(11, 27, 15, 45),
      },
      {
        id: "14",
        team1: "Janakpur Bolts",
        team2: "Pokhara Avengers",
        fullDate: d(11, 27, 16),
        endTime: d(11, 27, 20),
      },
    ],
  },
  {
    title: "Friday, 28 Nov",
    data: [
      {
        id: "15",
        team1: "Chitwan Rhinos",
        team2: "Kathmandu Gorkhas",
        fullDate: d(11, 28, 11, 45),
        endTime: d(11, 28, 15, 45),
      },
      {
        id: "16",
        team1: "Karnali Yaks",
        team2: "Biratnagar Kings",
        fullDate: d(11, 28, 16),
        endTime: d(11, 28, 20),
      },
    ],
  },
  {
    title: "Saturday, 29 Nov",
    data: [
      {
        id: "17",
        team1: "Pokhara Avengers",
        team2: "Lumbini Lions",
        fullDate: d(11, 29, 11, 15),
        endTime: d(11, 29, 15, 15),
      },
      {
        id: "18",
        team1: "Sudurpaschim Royals",
        team2: "Janakpur Bolts",
        fullDate: d(11, 29, 15, 30),
        endTime: d(11, 29, 19, 30),
      },
    ],
  },
  {
    title: "Sunday, 30 Nov",
    data: [
      {
        id: "19",
        team1: "Karnali Yaks",
        team2: "Kathmandu Gorkhas",
        fullDate: d(11, 30, 15, 30),
        endTime: d(11, 30, 19, 30),
      },
    ],
  },
  {
    title: "Tuesday, 02 Dec",
    data: [
      {
        id: "20",
        team1: "Janakpur Bolts",
        team2: "Chitwan Rhinos",
        fullDate: d(12, 2, 11, 45),
        endTime: d(12, 2, 15, 45),
      },
      {
        id: "21",
        team1: "Pokhara Avengers",
        team2: "Karnali Yaks",
        fullDate: d(12, 2, 16),
        endTime: d(12, 2, 20),
      },
    ],
  },
  {
    title: "Wednesday, 03 Dec",
    data: [
      {
        id: "22",
        team1: "Biratnagar Kings",
        team2: "Lumbini Lions",
        fullDate: d(12, 3, 16),
        endTime: d(12, 3, 20),
      },
    ],
  },
  {
    title: "Thursday, 04 Dec",
    data: [
      {
        id: "23",
        team1: "Pokhara Avengers",
        team2: "Kathmandu Gorkhas",
        fullDate: d(12, 4, 11, 45),
        endTime: d(12, 4, 15, 45),
      },
      {
        id: "24",
        team1: "Sudurpaschim Royals",
        team2: "Chitwan Rhinos",
        fullDate: d(12, 4, 16),
        endTime: d(12, 4, 20),
      },
    ],
  },
  {
    title: "Friday, 05 Dec",
    data: [
      {
        id: "25",
        team1: "Lumbini Lions",
        team2: "Janakpur Bolts",
        fullDate: d(12, 5, 16),
        endTime: d(12, 5, 20),
      },
    ],
  },
  {
    title: "Saturday, 06 Dec",
    data: [
      {
        id: "26",
        team1: "Sudurpaschim Royals",
        team2: "Biratnagar Kings",
        fullDate: d(12, 6, 11, 15),
        endTime: d(12, 6, 15, 15),
      },
      {
        id: "27",
        team1: "Chitwan Rhinos",
        team2: "Pokhara Avengers",
        fullDate: d(12, 6, 15, 30),
        endTime: d(12, 6, 19, 30),
      },
    ],
  },
  {
    title: "Sunday, 07 Dec",
    data: [
      {
        id: "28",
        team1: "Karnali Yaks",
        team2: "Janakpur Bolts",
        fullDate: d(12, 7, 15, 30),
        endTime: d(12, 7, 19, 30),
      },
    ],
  },
  {
    title: "Tuesday, 09 Dec",
    data: [
      {
        id: "Q1",
        team1: "1st Place",
        team2: "2nd Place",
        fullDate: d(12, 9, 16),
        endTime: d(12, 9, 20),
      },
    ],
  },
  {
    title: "Wednesday, 10 Dec",
    data: [
      {
        id: "EL",
        team1: "3rd Place",
        team2: "4th Place",
        fullDate: d(12, 10, 16),
        endTime: d(12, 10, 20),
      },
    ],
  },
  {
    title: "Thursday, 11 Dec",
    data: [
      {
        id: "Q2",
        team1: "Loser Q1",
        team2: "Winner E",
        fullDate: d(12, 11, 16),
        endTime: d(12, 11, 20),
      },
    ],
  },
  {
    title: "Saturday, 13 Dec",
    data: [
      {
        id: "FN",
        team1: "Winner Q1",
        team2: "Winner Q2",
        fullDate: d(12, 13, 15, 30),
        endTime: d(12, 13, 19, 30),
      },
    ],
  },
];
