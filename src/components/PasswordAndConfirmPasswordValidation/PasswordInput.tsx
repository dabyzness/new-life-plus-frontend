import React, { ChangeEventHandler, KeyboardEventHandler } from "react";
import { PasswordError } from "./PasswordAndConfirmPasswordValidation";

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
        type="password"
        name="password"
        autoComplete="off"
        value={props.passwordValue}
        onChange={props.handleChange}
        onKeyUp={props.handleValidation}
        required
      />

      <div>
        <p
          style={{ color: props.passwordError.hasMinLength ? "green" : "red" }}
        >
          Minimum 8 character length
        </p>
        <p
          style={{ color: props.passwordError.hasLowercase ? "green" : "red" }}
        >
          Contains 1 lowercase character
        </p>
        <p
          style={{ color: props.passwordError.hasUppercase ? "green" : "red" }}
        >
          Contains 1 uppercase character
        </p>
        <p style={{ color: props.passwordError.hasDigit ? "green" : "red" }}>
          Contains 1 number
        </p>
        <p style={{ color: props.passwordError.hasSpecial ? "green" : "red" }}>
          Contains 1 special character
        </p>
        <p style={{ color: props.passwordError.isCorrect ? "green" : "red" }}>
          Meets all requirements
        </p>
      </div>
    </>
  );
}

export { PasswordInput };
