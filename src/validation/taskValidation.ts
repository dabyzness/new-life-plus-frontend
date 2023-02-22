function isDailyTask(obj: object): obj is DailyTask {
  return (
    "id" in obj &&
    "name" in obj &&
    "skill" in obj &&
    "frequency_type" in obj &&
    obj.frequency_type === "DAILY" &&
    "streak" in obj &&
    "num_completed" in obj &&
    "daily_freq" in obj
    // && Object.keys(obj).length ===
  );
}

function isWeeklyTask(obj: object): obj is WeeklyTask {
  return (
    "id" in obj &&
    "name" in obj &&
    "skill" in obj &&
    "frequency_type" in obj &&
    obj.frequency_type === "WEEKLY" &&
    "streak" in obj &&
    "num_completed" in obj &&
    "weekly_freq" in obj
    // && Object.keys(obj).length ===
  );
}

function isMonthlyTask(obj: object): obj is MonthlyTask {
  return (
    "id" in obj &&
    "name" in obj &&
    "skill" in obj &&
    "frequency_type" in obj &&
    obj.frequency_type === "MONTHLY" &&
    "streak" in obj &&
    "num_completed" in obj
    // && Object.keys(obj).length ===
  );
}

export { isDailyTask, isWeeklyTask, isMonthlyTask };
