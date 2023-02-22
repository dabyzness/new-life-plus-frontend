import { useState } from "react";
import { DAYS } from "./CreateTaskForm";
import styles from "./Checkbox.module.css";

interface CheckboxProps {
  name: string;
  value: keyof typeof DAYS | number;
  label: string;
  handleChange: Function;
  disabled: boolean;
}

function Checkbox(props: CheckboxProps) {
  const { name, value, label, disabled, handleChange } = props;
  const [isChecked, setIsChecked] = useState<boolean>(true);

  return (
    <div className={styles.checkboxContainer}>
      <input
        className={styles.checkboxInput}
        type="checkbox"
        name={name}
        id={value as string}
        value={value}
        checked={isChecked}
        onChange={(e) => {
          handleChange(e);
          setIsChecked(!isChecked);
        }}
        disabled={disabled}
      />
      <label className={styles.checkboxLabel} htmlFor={value as string}>
        {label}
      </label>
    </div>
  );
}

export { Checkbox };
