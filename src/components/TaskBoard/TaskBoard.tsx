import { Box, Tab, Tabs } from "@mui/material";
import { SyntheticEvent, useState } from "react";
// import { Box } from "@mui/system";
import {
  isDailyTask,
  isMonthlyTask,
  isWeeklyTask,
} from "../../validation/taskValidation";
import { TabPanel } from "../TabPanel/TabPanel";

interface TaskBoardProps {
  tasks: Task[];
}

function TaskBoard(props: TaskBoardProps) {
  const { tasks } = props;

  const [value, setValue] = useState<number>(0);

  const dailyTasks = tasks.filter((task) => isDailyTask(task)) as DailyTask[];
  const weeklyTasks = tasks.filter((task) => isWeeklyTask(task));
  const monthlyTasks = tasks.filter((task) => isMonthlyTask(task));

  function handleChange(e: SyntheticEvent, newValue: number) {
    setValue(newValue);
  }

  // return (
  //   <div>
  //     <div>
  //       <h2>Daily Tasks</h2>
  //       <ul>
  //         {dailyTasks.map((task) => (
  //           <li>{task.name}</li>
  //         ))}
  //       </ul>
  //     </div>
  //     <div>
  //       <h2>Weekly Tasks</h2>
  //     </div>
  //     <div>
  //       <h2>Monthly Tasks</h2>
  //     </div>
  //   </div>
  // );
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
        <ul>
          {dailyTasks.map((task) => (
            <li key={task.name}>{task.name}</li>
          ))}
        </ul>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <ul>
          {weeklyTasks.map((task) => (
            <li key={task.name}>{task.name}</li>
          ))}
        </ul>
      </TabPanel>
      <TabPanel value={value} index={2}>
        <ul>
          {monthlyTasks.map((task) => (
            <li key={task.name}>{task.name}</li>
          ))}
        </ul>
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
