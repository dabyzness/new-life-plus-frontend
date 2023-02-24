import { Card, CardContent, CardHeader, Grid, Typography } from "@mui/material";

interface TasksOverviewProps {
  tasks: Task[];
}

function TasksOverview(props: TasksOverviewProps) {
  const { tasks } = props;

  return (
    <Card sx={{ width: "1000px" }}>
      <CardHeader sx={{ textAlign: "center" }} title="Tasks" />
      <CardContent>
        <Grid container spacing={2}>
          <Grid item xs={4}>
            <Card>
              <CardHeader sx={{ textAlign: "center" }} title=" Daily" />
              <CardContent></CardContent>
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
