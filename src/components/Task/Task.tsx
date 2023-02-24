import {
  Button,
  Card,
  CardActions,
  CardContent,
  IconButton,
  IconButtonProps,
  Typography,
  Collapse,
} from "@mui/material";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useState } from "react";
import { styled } from "@mui/material/styles";

// TODO: Clicking on the checkbox needs to actually complete the task in the database -- Write API
// TODO: Make Card look disabled if task is complete!

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
}

function Task(props: TaskProps) {
  const [isComplete, setIsComplete] = useState<boolean>(false);
  const [expanded, setExpanded] = useState<boolean>(false);
  const { task } = props;

  return (
    <Card sx={{ display: "flex", flexWrap: "wrap", maxWidth: "400px" }}>
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

        <Button
          onClick={() => {
            setIsComplete(!isComplete);
          }}
        >
          {isComplete ? <CheckBoxIcon /> : <CheckBoxOutlineBlankIcon />}
        </Button>
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
    </Card>
  );
}

export { Task };
