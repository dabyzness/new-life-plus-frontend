import { useState, ChangeEvent, KeyboardEvent } from "react";
import { WasFocused } from "../RegistrationForm/RegistrationForm";

export interface UsernameInputProps {
  handleSetUsername: Function;
  setWasFocused: Function;
  wasFocused: WasFocused;
  isTaken: boolean;
}

function UsernameInput(props: UsernameInputProps) {
  const [username, setUsername] = useState<string>("");
  const [usernameError, setUsernameError] = useState<boolean>(true);

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    setUsername(e.target?.value);
  }

  function handleValidation(e: KeyboardEvent<HTMLInputElement>) {
    const usernameRegExp: RegExp = /^[\w]{3,20}$/;

    if (usernameRegExp.test(username)) {
      setUsernameError(false);
      props.handleSetUsername((e.target as HTMLInputElement)?.value);
    } else {
      setUsernameError(true);
      props.handleSetUsername("");
    }
  }

  function handleBlur() {
    if (!props.wasFocused.username) {
      props.setWasFocused({ ...props.wasFocused, username: true });
    }

    return;
  }

  return (
    <>
      <input
        className={`${
          props.isTaken || (usernameError && props.wasFocused.username)
            ? "input-error"
            : ""
        }`}
        type="text"
        autoComplete="off"
        spellCheck="false"
        name="username"
        // placeholder="Username"
        value={username}
        onChange={handleChange}
        onKeyUp={handleValidation}
        onBlur={handleBlur}
        required
      />
      <label className={`${username ? "notEmpty" : ""}`} htmlFor="username">
        Username
      </label>
      <i
        className={`${props.wasFocused.username ? "validator-icon" : ""} ${
          props.isTaken || usernameError ? "invalid-icon" : "valid-icon"
        }`}
      ></i>

      <ul
        className={`validation-prompt-container ${
          props.isTaken || (usernameError && props.wasFocused.username)
            ? "has-errors"
            : ""
        }`}
      >
        <li
          className={`${
            usernameError && props.wasFocused.username && username
              ? "input-invalid"
              : "input-valid"
          }`}
        >
          Invalid username
        </li>

        <li
          className={`${
            !username && props.wasFocused.username
              ? "input-invalid"
              : "input-valid"
          }`}
        >
          Username is required
        </li>

        <li className={`${props.isTaken ? "input-invalid" : "input-valid"}`}>
          Username is taken
        </li>
      </ul>
    </>
  );
}

export { UsernameInput };
