import { Card, CardContent, CardHeader, Grid, Typography } from "@mui/material";
import { Task } from "../../components/Task/Task";
import {
  isDailyTask,
  isMonthlyTask,
  isWeeklyTask,
} from "../../validation/taskValidation";
import Draggable from "react-draggable";
import { useRef } from "react";

interface TasksOverviewProps {
  tasks: Task[];
}

function TasksOverview(props: TasksOverviewProps) {
  const { tasks } = props;
  const nodeRef = useRef(null);
  const pp = useRef(null);

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
      <CardContent id="task-overview-container" ref={pp}>
        <Grid container spacing={2}>
          <Grid item xs={4}>
            <Card sx={{ overflow: "visible" }}>
              <CardHeader sx={{ textAlign: "center" }} title="Daily" />
              <CardContent>
                {dailyTasks.map((task) => (
                  <Draggable nodeRef={nodeRef}>
                    <div ref={nodeRef}>
                      <Task
                        task={task}
                        overview={true}
                        draggableName={task.name.replaceAll(" ", "-")}
                      />
                    </div>
                  </Draggable>
                ))}
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={4}>
            <Card sx={{ overflow: "visible" }}>
              <CardHeader sx={{ textAlign: "center" }} title="Weekly" />
              <CardContent></CardContent>
            </Card>
          </Grid>
          <Grid item xs={4}>
            <Card sx={{ overflow: "visible" }}>
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
