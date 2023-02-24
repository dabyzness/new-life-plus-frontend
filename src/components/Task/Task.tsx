import {
  Button,
  Card,
  CardActions,
  CardContent,
  IconButton,
  IconButtonProps,
  Typography,
  Collapse,
  Tooltip,
} from "@mui/material";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import CircleIcon from "@mui/icons-material/Circle";
import { useState } from "react";
import { styled } from "@mui/material/styles";
import { isDailyTask } from "../../validation/taskValidation";

// TODO: Clicking on the checkbox needs to actually complete the task in the database -- Write API
// TODO: Make Card look disabled if task is complete!

const dayArr: DAILY_FREQ[] = ["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"];

interface ExpandMoreProps extends IconButtonProps {
  expand: boolean;
}

const ExpandMore = styled((props: ExpandMoreProps) => {
  const { expand, ...other } = props;

  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

interface TaskProps {
  task: DailyTask | WeeklyTask | MonthlyTask;
  overview?: boolean;
  draggableName?: string;
}

function Task(props: TaskProps) {
  const [isComplete, setIsComplete] = useState<boolean>(false);
  const [expanded, setExpanded] = useState<boolean>(false);
  const { task, overview, draggableName } = props;

  return (
    <Card
      sx={{
        display: "flex",
        flexWrap: "wrap",
        maxWidth: "400px",
        marginBottom: "8px",
      }}
      id={`draggable-card-${draggableName}`}
      aria-labelledby={`draggable-card-${draggableName}`}
    >
      <CardContent>
        <Typography>{task.name}</Typography>
      </CardContent>

      <CardActions sx={{ marginLeft: "auto" }}>
        <ExpandMore
          expand={expanded}
          onClick={() => {
            setExpanded(!expanded);
          }}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </ExpandMore>

        {!overview && (
          <Button
            onClick={() => {
              setIsComplete(!isComplete);
            }}
          >
            {isComplete ? <CheckBoxIcon /> : <CheckBoxOutlineBlankIcon />}
          </Button>
        )}
      </CardActions>

      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography>
            Add fields here as I develop the app. It will Contain things like
          </Typography>
          <Typography>Why you want to complete it</Typography>
          <Typography>Villains: Things that are blocking you</Typography>
          <Typography>Streak: {task.streak}</Typography>
        </CardContent>
      </Collapse>

      {overview && (
        <CardContent
          sx={{
            width: "100%",
            paddingBottom: 0,
            paddingTop: 0,
            "&:last-child": { paddingBottom: "8px" },
          }}
        >
          {isDailyTask(task) &&
            dayArr.map((day) => {
              return (
                <Tooltip title={day}>
                  <IconButton
                    sx={{
                      margin: 0,
                      padding: 0,
                      minWidth: 0,
                      transform: "scale(75%)",
                    }}
                  >
                    <CircleIcon
                      key={day}
                      sx={{
                        color: task.daily_freq.includes(day) ? "green" : "red",
                      }}
                      fontSize="small"
                      aria-label={day}
                    />
                  </IconButton>
                </Tooltip>
              );
            })}
        </CardContent>
      )}
    </Card>
  );
}

export { Task };
