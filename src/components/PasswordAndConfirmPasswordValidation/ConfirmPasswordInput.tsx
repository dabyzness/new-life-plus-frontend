import React, { ChangeEventHandler, KeyboardEventHandler } from "react";

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
        type="password"
        name="confirmPassword"
        autoComplete="off"
        placeholder="Re-enter Password"
        value={props.passwordValue}
        onChange={props.handleChange}
        onKeyUp={props.handleValidation}
        required
      />

      <p style={{ display: props.confirmPasswordMatch ? "none" : "block" }}>
        Password Does not match
      </p>
    </>
  );
}

export { ConfirmPasswordInput };
