import { ChangeEvent, useReducer } from "react";
import { Checkbox } from "./Checkbox";

function reducer(
  state: CreateTaskFormState,
  action: Action
): CreateTaskFormState {
  switch (action.type) {
    case "updateValue":
      return {
        ...state,
        [action.field]: action.payload,
      };
    case "addDay":
      console.log("HELLO");
      return {
        ...state,
        [action.field]: [
          ...(state[action.field] as DAILY_FREQ[]),
          action.payload,
        ],
      };
    case "removeDay":
      console.log("GOODBYE");
      return {
        ...state,
        [action.field]: (state[action.field] as DAILY_FREQ[])?.filter(
          (day) => day !== action.payload
        ),
      };
  }
}

export enum DAYS {
  MON = "Monday",
  TUE = "Tuesday",
  WED = "Wednesday",
  THU = "Thursday",
  FRI = "Friday",
  SAT = "Saturday",
  SUN = "Sunday",
}

interface CreateTaskFormProps {}

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
  daily_freq: [],
  weekly_freq: 1,
  repeatable: 0,
};

function CreateTaskForm(props: CreateTaskFormProps) {
  const [state, dispatch] = useReducer(reducer, initialState);

  function handleChange(e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    if (e.target.type === "checkbox" && e.target instanceof HTMLInputElement) {
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

  return (
    <div>
      <form>
        <input
          type="text"
          name="name"
          value={state.name}
          onChange={handleChange}
        />

        <select
          name="skill"
          id="skill"
          value={state.skill}
          onChange={handleChange}
        >
          <option value="HEALTH">Health</option>
          <option value="STRENGTH">Strength</option>
          <option value="INTELLECT">Intellect</option>
          <option value="CHARISMA">Charisma</option>
        </select>

        <select
          name="frequency_type"
          id="frequency_type"
          value={state.frequency_type}
          onChange={handleChange}
        >
          <option value="DAILY">Daily</option>
          <option value="WEEKLY">Weekly</option>
          <option value="MONTHLY">Monthly</option>
        </select>

        {state.frequency_type === "DAILY" && (
          <div>
            {(Object.keys(DAYS) as Array<keyof typeof DAYS>).map((key, i) => {
              return (
                <Checkbox
                  key={key}
                  name="daily_freq"
                  value={key}
                  label={Object.values(DAYS)[i]}
                  handleChange={handleChange}
                />
              );
            })}
          </div>
        )}

        {state.frequency_type === "WEEKLY" && (
          <div>
            <input type="checkbox" name="weekly_freq" id="weekly" value={1} />
            <label htmlFor="weekly">Every Week</label>
            <input type="checkbox" name="weekly_freq" id="biweekly" value={2} />
            <label htmlFor="biweekly">Biweekly</label>
          </div>
        )}
      </form>
    </div>
  );
}

export { CreateTaskForm };
