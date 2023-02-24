import { Card, CardContent, CardHeader, Grid, Typography } from "@mui/material";
import { Task } from "../../components/Task/Task";
import {
  isDailyTask,
  isMonthlyTask,
  isWeeklyTask,
} from "../../validation/taskValidation";

interface TasksOverviewProps {
  tasks: Task[];
}

function TasksOverview(props: TasksOverviewProps) {
  const { tasks } = props;

  const dailyTasks = tasks.filter((task) => isDailyTask(task)) as DailyTask[];
  const weeklyTasks = tasks.filter((task) =>
    isWeeklyTask(task)
  ) as WeeklyTask[];
  const monthlyTasks = tasks.filter((task) =>
    isMonthlyTask(task)
  ) as MonthlyTask[];

  return (
    <Card sx={{ width: "1000px" }}>
      <CardHeader sx={{ textAlign: "center" }} title="Tasks" />
      <CardContent>
        <Grid container spacing={2}>
          <Grid item xs={4}>
            <Card>
              <CardHeader sx={{ textAlign: "center" }} title=" Daily" />
              <CardContent>
                {dailyTasks.map((task) => (
                  <Task task={task} overview={true} />
                ))}
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={4}>
            <Card>
              <CardHeader sx={{ textAlign: "center" }} title="Weekly" />
              <CardContent></CardContent>
            </Card>
          </Grid>
          <Grid item xs={4}>
            <Card>
              <CardHeader sx={{ textAlign: "center" }} title="Monthly" />
              <CardContent></CardContent>
            </Card>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}

export { TasksOverview };
