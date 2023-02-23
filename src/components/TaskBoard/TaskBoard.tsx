import { link } from "fs";
import {
  isDailyTask,
  isMonthlyTask,
  isWeeklyTask,
} from "../../validation/taskValidation";

interface TaskBoardProps {
  tasks: AllTaskArray;
}

function TaskBoard(props: TaskBoardProps) {
  const { tasks } = props;

  const dailyTasks = tasks.filter((task) => isDailyTask(task)) as DailyTask[];
  const weeklyTasks = tasks.filter((task) => isWeeklyTask(task));
  const monthlyTasks = tasks.filter((task) => isMonthlyTask(task));

  return (
    <div>
      <div>
        <h2>Daily Tasks</h2>
        {dailyTasks.map((task) => (
          <li></li>
        ))}
      </div>
      <div>
        <h2>Weekly Tasks</h2>
      </div>
      <div>
        <h2>Monthly Tasks</h2>
      </div>
    </div>
  );
}

export { TaskBoard };
