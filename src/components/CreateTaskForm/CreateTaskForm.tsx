import { ChangeEvent, useReducer } from "react";

function reducer(
  state: CreateTaskFormState,
  action: Action
): CreateTaskFormState {
  switch (action.type) {
    case "updateValue":
      console.log(state);
      return {
        ...state,
        [action.field]: action.payload,
      };
  }
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

type ActionType = "updateValue";

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
    if (e.target instanceof HTMLInputElement) {
      dispatch({
        type: "updateValue",
        field: e.target.name as keyof CreateTaskFormState,
        payload: e.target.value,
      });
      return;
    }

    console.log(e);

    if (e.target instanceof HTMLSelectElement) {
      dispatch({
        type: "updateValue",
        field: e.target.name as keyof CreateTaskFormState,
        payload: e.target.name,
      });
    }
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
            <input
              type="checkbox"
              name="daily_freq"
              id="MON"
              value="MON"
              checked={state.daily_freq?.includes("MON")}
            />
            <label htmlFor="MON">MON</label>
            <input
              type="checkbox"
              name="daily_freq"
              id="TUE"
              value="TUE"
              checked={state.daily_freq?.includes("TUE")}
            />
            <label htmlFor="TUE">TUE</label>
            <input
              type="checkbox"
              name="daily_freq"
              id="WED"
              value="WED"
              checked={state.daily_freq?.includes("WED")}
            />
            <label htmlFor="WED">WED</label>
            <input
              type="checkbox"
              name="daily_freq"
              id="THU"
              value="THU"
              checked={state.daily_freq?.includes("THU")}
            />
            <label htmlFor="THU">THU</label>
            <input
              type="checkbox"
              name="daily_freq"
              id="FRI"
              value="FRI"
              checked={state.daily_freq?.includes("FRI")}
            />
            <label htmlFor="FRI">FRI</label>
            <input
              type="checkbox"
              name="daily_freq"
              id="SAT"
              value="SAT"
              checked={state.daily_freq?.includes("SAT")}
            />
            <label htmlFor="SAT">SAT</label>
            <input
              type="checkbox"
              name="daily_freq"
              id="SUN"
              value="SUN"
              checked={state.daily_freq?.includes("SUN")}
            />
            <label htmlFor="SUN">SUN</label>
          </div>
        )}
      </form>
    </div>
  );
}

export { CreateTaskForm };
