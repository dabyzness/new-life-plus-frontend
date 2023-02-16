import { useState } from "react";
import { DAYS } from "./CreateTaskForm";

interface CheckboxProps {
  name: string;
  value: keyof typeof DAYS | 1 | 2;
  label: string;
  handleChange: Function;
}

function Checkbox(props: CheckboxProps) {
  const { name, value, label, handleChange } = props;
  const [isChecked, setIsChecked] = useState<boolean>(false);

  return (
    <>
      <input
        type="checkbox"
        name={name}
        id={value as string}
        value={value}
        checked={isChecked}
        onChange={(e) => {
          handleChange(e);
          setIsChecked(!isChecked);
        }}
      />
      <label htmlFor={value as string}>{label}</label>
    </>
  );
}

export { Checkbox };
