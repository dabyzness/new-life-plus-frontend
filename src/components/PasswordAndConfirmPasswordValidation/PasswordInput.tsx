import { link } from "fs";
import React, { ChangeEventHandler, KeyboardEventHandler } from "react";
import { PasswordError } from "./PasswordAndConfirmPasswordValidation";

import styles from "./PasswordInput.module.css";

const passwordErrorMsg: PasswordError<string> = {
  hasMinLength: "Minimum 8 character length",
  hasLowercase: "Contains 1 lowercase character",
  hasUppercase: "Contains 1 uppercase character",
  hasDigit: "Contains 1 digit",
  hasSpecial: "Contains 1 special character",
  isCorrect: "Meets all requirements",
};

export interface PasswordInputProps {
  handleChange: ChangeEventHandler<HTMLInputElement>;
  handleValidation: KeyboardEventHandler<HTMLInputElement>;
  passwordValue: string;
  passwordError: PasswordError<boolean>;
}

function PasswordInput(props: PasswordInputProps) {
  return (
    <>
      <input
        className={styles.passwordInput}
        type="password"
        name="password"
        autoComplete="off"
        // placeholder="Password"
        value={props.passwordValue}
        onChange={props.handleChange}
        onKeyUp={props.handleValidation}
        required
      />
      <label
        className={`${props.passwordValue ? "notEmpty" : ""}`}
        htmlFor="password"
      >
        Password
      </label>

      <ul className={styles.validationPromptContainer}>
        {/* 
        Maps passwordError with passwordErrorMsg to return a list item
        */}
        {Object.entries(props.passwordError).map((prompt) => {
          return (
            <li
              key={prompt[0]}
              className={`${styles.prompt} ${
                prompt[1] ? styles.validPrompt : styles.notValidPrompt
              }`}
            >
              {passwordErrorMsg[prompt[0] as keyof typeof passwordErrorMsg]}
            </li>
          );
        })}
      </ul>
    </>
  );
}

export { PasswordInput };
