import React, { ChangeEventHandler, KeyboardEventHandler } from "react";
import { PasswordError } from "./PasswordAndConfirmPasswordValidation";

import styles from "./PasswordInput.module.css";

export interface PasswordInputProps {
  handleChange: ChangeEventHandler<HTMLInputElement>;
  handleValidation: KeyboardEventHandler<HTMLInputElement>;
  passwordValue: string;
  passwordError: PasswordError;
}

function PasswordInput(props: PasswordInputProps) {
  return (
    <>
      <input
        className={styles.passwordInput}
        type="password"
        name="password"
        autoComplete="off"
        placeholder="Password"
        value={props.passwordValue}
        onChange={props.handleChange}
        onKeyUp={props.handleValidation}
        required
      />

      <ul className={styles.validationPromptContainer}>
        <li
          className={styles.validationPrompt}
          style={{ color: props.passwordError.hasMinLength ? "green" : "red" }}
        >
          Minimum 8 character length
        </li>

        <li
          className={styles.validationPrompt}
          style={{ color: props.passwordError.hasLowercase ? "green" : "red" }}
        >
          Contains 1 lowercase character
        </li>

        <li
          className={styles.validationPrompt}
          style={{ color: props.passwordError.hasUppercase ? "green" : "red" }}
        >
          Contains 1 uppercase character
        </li>

        <li
          className={styles.validationPrompt}
          style={{ color: props.passwordError.hasDigit ? "green" : "red" }}
        >
          Contains 1 number
        </li>

        <li
          className={styles.validationPrompt}
          style={{ color: props.passwordError.hasSpecial ? "green" : "red" }}
        >
          Contains 1 special character
        </li>

        <li
          className={styles.validationPrompt}
          style={{ color: props.passwordError.isCorrect ? "green" : "red" }}
        >
          Meets all requirements
        </li>
      </ul>
    </>
  );
}

export { PasswordInput };
