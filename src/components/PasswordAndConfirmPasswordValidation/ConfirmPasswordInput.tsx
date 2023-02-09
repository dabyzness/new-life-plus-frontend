import React, { ChangeEventHandler, KeyboardEventHandler } from "react";

import styles from "./ConfirmPasswordInput.module.css";

export interface ConfirmPasswordInputProps {
  passwordValue: string;
  confirmPasswordMatch: boolean;
  handleChange: ChangeEventHandler<HTMLInputElement>;
  handleValidation: KeyboardEventHandler<HTMLInputElement>;
}

function ConfirmPasswordInput(props: ConfirmPasswordInputProps) {
  return (
    <>
      <input
        className={`${styles.confirmPasswordInput} ${
          props.confirmPasswordMatch ? styles.validInput : styles.notValidInput
        }`}
        type="password"
        name="confirmPassword"
        autoComplete="off"
        placeholder="Re-enter Password"
        value={props.passwordValue}
        onChange={props.handleChange}
        onKeyUp={props.handleValidation}
        required
      />

      {/* <span className={""}></span> */}

      {/* <div
        className={`${styles.confirmPasswordValidation} ${
          props.confirmPasswordMatch ? styles.validInput : styles.notValidInput
        }`}
      >
        Password Does not match
      </div> */}
    </>
  );
}

export { ConfirmPasswordInput };
