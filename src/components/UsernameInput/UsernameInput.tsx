import { useState, ChangeEvent, KeyboardEvent } from "react";
import { WasFocused } from "../RegistrationForm/RegistrationForm";

export interface UsernameInputProps {
  handleSetUsername: Function;
  setWasFocused: Function;
  wasFocused: WasFocused;
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
        className={`${usernameError ? "inputError" : ""}`}
        type="text"
        autoComplete="off"
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
          usernameError ? "invalid-icon" : "valid-icon"
        }`}
      ></i>
      {/* <p style={{ display: usernameError ? "block" : "none" }}>
        Invalid Username
      </p> */}
    </>
  );
}

export { UsernameInput };
