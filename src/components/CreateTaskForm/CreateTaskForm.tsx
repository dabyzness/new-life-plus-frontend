import { ChangeEvent, FormEvent, useReducer } from "react";
import { Checkbox } from "./Checkbox";
import styles from "./CreateTaskForm.module.css";

function reducer(
  state: CreateTaskFormState,
  action: Action
): CreateTaskFormState {
  switch (action.type) {
    case "updateValue":
      return {
        ...state,
        [action.field]:
          action.field === "weekly_freq"
            ? Number(action.payload)
            : action.payload,
      };
    case "addDay":
      return {
        ...state,
        [action.field]: [
          ...(state[action.field] as DAILY_FREQ[]),
          action.payload,
        ],
      };
    case "removeDay":
      return {
        ...state,
        [action.field]: (state[action.field] as DAILY_FREQ[])?.filter(
          (day) => day !== action.payload
        ),
      };
  }
}

export enum DAYS {
  MON = "Mon",
  TUE = "Tue",
  WED = "Wed",
  THU = "Thu",
  FRI = "Fri",
  SAT = "Sat",
  SUN = "Sun",
}

interface CreateTaskFormProps {
  handleSubmitCreateTask: Function;
}

export interface CreateTaskFormState {
  name: string;
  skill: SKILL;
  frequency_type: FREQ;
  daily_freq?: DAILY_FREQ[];
  weekly_freq?: 1 | 2;
  repeatable?: number;
}

type ActionType = "updateValue" | "addDay" | "removeDay";

type Action = {
  type: ActionType;
  field: keyof CreateTaskFormState;
  payload: string;
};

const initialState: CreateTaskFormState = {
  name: "",
  skill: "HEALTH",
  frequency_type: "DAILY",
  daily_freq: ["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"],
  weekly_freq: 1,
};

function CreateTaskForm(props: CreateTaskFormProps) {
  const [state, dispatch] = useReducer(reducer, initialState);

  function handleChange(e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    console.log(state);

    if (
      e.target instanceof HTMLInputElement &&
      e.target.name === "daily_freq"
    ) {
      if (e.target.checked) {
        dispatch({
          type: "addDay",
          field: e.target.name as keyof CreateTaskFormState,
          payload: e.target.value,
        });
      } else {
        dispatch({
          type: "removeDay",
          field: e.target.name as keyof CreateTaskFormState,
          payload: e.target.value,
        });
      }
      return;
    }

    dispatch({
      type: "updateValue",
      field: e.target.name as keyof CreateTaskFormState,
      payload: e.target.value,
    });
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const task = await props.handleSubmitCreateTask(state);

    if (task instanceof Error) {
      console.log(task);
    }
  }

  return (
    <div>
      <form className={styles.newTaskForm} onSubmit={handleSubmit}>
        <h2>New Task</h2>
        <input
          className={styles.taskNameInput}
          type="text"
          name="name"
          value={state.name}
          onChange={handleChange}
          autoComplete="off"
        />
        <label htmlFor="name" className={state.name ? "notEmpty" : ""}>
          Task Name
        </label>

        <div className={styles.weeklyFreqContainer}>
          <p className={styles.weeklyFreqLabel}>Select Skill</p>
          <div className={styles.checkboxContainer}>
            {["HEALTH", "STRENGTH", "INTELLECT", "CHARISMA"].map((skill) => (
              <div className={styles.radioContainer}>
                <input
                  type="radio"
                  name="skill"
                  id={`skill-${skill}`}
                  value={skill}
                  checked={state.skill === skill}
                  onChange={handleChange}
                  // disabled={state.frequency_type !== "WEEKLY"}
                />
                <label htmlFor={`skill-${skill}`} className={styles.radioLabel}>
                  {skill[0] + skill.slice(1).toLowerCase()}
                </label>
              </div>
            ))}
          </div>
        </div>

        <div className={styles.weeklyFreqContainer}>
          <p className={styles.weeklyFreqLabel}>Select Frequency</p>
          <div className={styles.checkboxContainer}>
            {["DAILY", "WEEKLY", "MONTHLY"].map((freq) => (
              <div className={styles.radioContainer}>
                <input
                  type="radio"
                  name="frequency_type"
                  id={`freq-${freq}`}
                  value={freq}
                  checked={state.frequency_type === freq}
                  onChange={handleChange}
                  // disabled={state.frequency_type !== "WEEKLY"}
                />
                <label htmlFor={`freq-${freq}`} className={styles.radioLabel}>
                  {freq[0] + freq.slice(1).toLowerCase()}
                </label>
              </div>
            ))}
          </div>
        </div>

        <div
          className={`${styles.weeklyFreqContainer} ${
            state.frequency_type !== "DAILY" ? styles.disabled : ""
          }`}
        >
          <p className={styles.weeklyFreqLabel}>Daily Frequency</p>
          <div className={styles.checkboxContainer}>
            {(Object.keys(DAYS) as Array<keyof typeof DAYS>).map((key, i) => {
              return (
                <Checkbox
                  key={key}
                  name="daily_freq"
                  value={key}
                  label={Object.values(DAYS)[i]}
                  handleChange={handleChange}
                  disabled={state.frequency_type !== "DAILY"}
                />
              );
            })}
          </div>
        </div>

        <div
          className={`${styles.weeklyFreqContainer} ${
            state.frequency_type !== "WEEKLY" ? styles.disabled : ""
          }`}
        >
          <p className={styles.weeklyFreqLabel}>Weekly Frequency</p>
          <div className={styles.checkboxContainer}>
            {[1, 2].map((amount) => (
              <div className={styles.radioContainer}>
                <input
                  type="radio"
                  name="weekly_freq"
                  className={styles.radioInput}
                  id={`radio${amount}`}
                  value={amount}
                  checked={state.weekly_freq === amount}
                  onChange={handleChange}
                  disabled={state.frequency_type !== "WEEKLY"}
                />
                <label htmlFor={`radio${amount}`} className={styles.radioLabel}>
                  {amount === 1 ? "Every Week" : "Bi-weekly"}
                </label>
              </div>
            ))}
          </div>
        </div>

        <div className={styles.buttonContainer}>
          <button className={styles.cancelButton}>Cancel</button>
          <button type="submit">Create</button>
        </div>
      </form>
    </div>
  );
}

export { CreateTaskForm };
