import { Box, Tab, Tabs } from "@mui/material";
import { SyntheticEvent, useState } from "react";
// import { Box } from "@mui/system";
import {
  isDailyTask,
  isMonthlyTask,
  isWeeklyTask,
} from "../../validation/taskValidation";
import { TabPanel } from "../TabPanel/TabPanel";
import { Task } from "../Task/Task";

// TODO: Sort Tasks by completion. If complete, move to bottom;

interface TaskBoardProps {
  tasks: Task[];
}

function TaskBoard(props: TaskBoardProps) {
  const { tasks } = props;

  const [value, setValue] = useState<number>(0);

  const dailyTasks = tasks.filter((task) => isDailyTask(task)) as DailyTask[];
  const weeklyTasks = tasks.filter((task) =>
    isWeeklyTask(task)
  ) as WeeklyTask[];
  const monthlyTasks = tasks.filter((task) =>
    isMonthlyTask(task)
  ) as MonthlyTask[];

  function handleChange(e: SyntheticEvent, newValue: number) {
    setValue(newValue);
  }

  return (
    <Box>
      <Box>
        <Tabs onChange={handleChange} value={value}>
          <Tab label="Daily Quests" {...a11yProps(0)} />
          <Tab label="Weekly Quests" {...a11yProps(1)} />
          <Tab label="Monthly Quests" {...a11yProps(2)} />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        {dailyTasks.map((task) => (
          <Task key={task.name} task={task} />
        ))}
      </TabPanel>
      <TabPanel value={value} index={1}>
        {weeklyTasks.map((task) => (
          <Task key={task.name} task={task} />
        ))}
      </TabPanel>
      <TabPanel value={value} index={2}>
        {monthlyTasks.map((task) => (
          <Task key={task.name} task={task} />
        ))}
      </TabPanel>
    </Box>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export { TaskBoard };
