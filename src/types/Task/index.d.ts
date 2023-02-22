interface Task {
  id: number;
  name: string;
  skill: SKILL;
  frequency_type: FREQ;
  streak: number;
  num_completed: number;
}

interface DailyTask extends Task {
  frequency_type: "DAILY";
  daily_freq: DAILY_FREQ[];
}

interface WeeklyTask extends Task {
  frequency_type: "WEEKLY";
  weekly_freq: number;
}

interface MonthlyTask extends Task {
  frequency_type: "MONTHLY";
}
