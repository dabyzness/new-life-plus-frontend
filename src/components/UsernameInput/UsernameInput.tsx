import { useState, ChangeEvent, KeyboardEvent } from "react";

export interface UsernameInputProps {
  handleSetUsername: Function;
}

function UsernameInput(props: UsernameInputProps) {
  const [username, setUsername] = useState<string>("");
  const [usernameError, setUsernameError] = useState<boolean>(false);

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

  return (
    <>
      <input
        type="text"
        autoComplete="off"
        name="username"
        placeholder="Username"
        value={username}
        onChange={handleChange}
        onKeyUp={handleValidation}
        required
      />
      <p style={{ display: usernameError ? "block" : "none" }}>
        Invalid Username
      </p>
    </>
  );
}

export { UsernameInput };
