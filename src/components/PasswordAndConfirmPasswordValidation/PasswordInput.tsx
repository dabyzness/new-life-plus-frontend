import { link } from "fs";
import React, { useRef, ChangeEventHandler, KeyboardEventHandler } from "react";
import { WasFocused } from "../RegistrationForm/RegistrationForm";
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
  setWasFocused: Function;
  wasFocused: WasFocused;
}

function PasswordInput(props: PasswordInputProps) {
  const iconRef = useRef<HTMLElement>(null);

  function handleBlur() {
    if (!props.wasFocused.password) {
      props.setWasFocused({ ...props.wasFocused, password: true });
    }

    return;
  }

  return (
    <>
      <input
        className={`${styles.passwordInput} ${
          !props.passwordError.isCorrect && props.wasFocused.password
            ? "input-error"
            : ""
        }`}
        type="password"
        name="password"
        autoComplete="off"
        // placeholder="Password"
        value={props.passwordValue}
        onChange={props.handleChange}
        onKeyUp={props.handleValidation}
        onBlur={handleBlur}
        required
      />
      <label
        className={`${props.passwordValue ? "notEmpty" : ""}`}
        htmlFor="password"
      >
        Password
      </label>
      <i
        className={`${props.wasFocused.password ? "validator-icon" : ""} ${
          !props.passwordError.isCorrect ? "invalid-icon" : "valid-icon"
        }`}
        ref={iconRef}
      ></i>

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
