import axios, { AxiosError } from "axios";
import { CreateTaskFormState } from "../components/CreateTaskForm/CreateTaskForm";
import {
  isDailyTask,
  isMonthlyTask,
  isTaskArray,
  isWeeklyTask,
} from "../validation/taskValidation";
import { getToken } from "./token";

const BASE_URL = `${process.env.REACT_APP_BACKEND_SERVER_URL}`;

async function createTask(
  formData: CreateTaskFormState,
  profile_id: number
): Promise<DailyTask | WeeklyTask | MonthlyTask | Error> {
  try {
    if (formData.frequency_type === "DAILY") {
      delete formData.weekly_freq;
    } else if (formData.frequency_type === "WEEKLY") {
      delete formData.daily_freq;
    } else if (formData.frequency_type === "MONTHLY") {
      delete formData.weekly_freq;
      delete formData.daily_freq;
    } else {
      throw new Error("Frequency Type is invalid");
    }

    const res = await axios.request({
      method: "post",
      url: `${BASE_URL}/api/task/create`,
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${getToken()}`,
      },
      data: { ...formData, profile_id },
    });

    const task = await res.data;

    if (isDailyTask(task)) {
      return task;
    }
    if (isWeeklyTask(task)) {
      return task;
    }
    if (isMonthlyTask(task)) {
      return task;
    }

    throw new Error(
      "Invalid Task Type. Must be Daily, Monthly, or Weekly Task"
    );
  } catch (error) {
    if (error instanceof AxiosError) {
      return new Error(JSON.stringify(error.response?.data));
    }

    return error as Error;
  }
}

async function getAllTasks(username: string): Promise<AllTaskArray | Error> {
  try {
    const res = await axios.request({
      method: "get",
      url: `${BASE_URL}/api/profile/${username}/tasks`,
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${getToken()}`,
      },
    });

    // Update once we know what we're sending over with Express
    // Don't want to assert type here
    const tasks = await res.data;

    if (!isTaskArray(tasks)) {
      throw new Error("Invalid array.");
    }

    return tasks;
  } catch (error) {
    if (error instanceof AxiosError) {
      return new Error(JSON.stringify(error.response?.data));
    }

    return error as Error;
  }
}

export { createTask, getAllTasks };
