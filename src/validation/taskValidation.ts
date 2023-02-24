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

function isTask(obj: object): obj is Task {
  return (
    "id" in obj &&
    "name" in obj &&
    "skill" in obj &&
    "frequency_type" in obj &&
    "streak" in obj &&
    "num_completed" in obj
    // && Object.keys(obj).length ===
  );
}

function isTaskArray(obj: object[]): obj is Task[] {
  if (obj.length === 0) {
    return true;
  }

  for (let item in obj) {
    if (!isTask(obj[item])) {
      return false;
    }
  }

  return true;
}

export { isDailyTask, isWeeklyTask, isMonthlyTask, isTask, isTaskArray };
