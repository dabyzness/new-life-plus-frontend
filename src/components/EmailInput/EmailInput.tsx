import { ChangeEvent, KeyboardEvent, useState, useRef } from "react";
import { WasFocused } from "../RegistrationForm/RegistrationForm";

export interface EmailInputProps {
  handleSetEmail: Function;
  setWasFocused: Function;
  wasFocused: WasFocused;
}

function EmailInput(props: EmailInputProps) {
  const [email, setEmail] = useState<string>("");
  const [emailError, setEmailError] = useState<boolean>(true);

  const iconRef = useRef<HTMLElement>(null);

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    setEmail(e.target?.value);
  }

  function handleValidation(e: KeyboardEvent<HTMLInputElement>) {
    const emailValidator: RegExp = /^[\w-\.]+(?:[+\w]+)@([\w-]+\.)+[\w-]{2,4}$/;

    if ((e.target as HTMLInputElement)?.value.match(emailValidator)) {
      props.handleSetEmail((e.target as HTMLInputElement)?.value);
      setEmailError(false);
    } else {
      props.handleSetEmail("");
      setEmailError(true);
    }
  }

  function handleBlur() {
    if (!props.wasFocused.email) {
      props.setWasFocused({ ...props.wasFocused, email: true });
    }

    return;
  }

  return (
    <>
      <input
        type="email"
        name="email"
        autoComplete="off"
        // placeholder="E-mail"
        value={email}
        onChange={handleChange}
        onKeyUp={handleValidation}
        onBlur={handleBlur}
        required
      />
      <label htmlFor="email" className={`${email ? "notEmpty" : ""}`}>
        E-mail
      </label>
      <i
        className={`${props.wasFocused.email ? "validator-icon" : ""} ${
          emailError ? "invalid-icon" : "valid-icon"
        }`}
        ref={iconRef}
      ></i>
      {/* <p style={{ display: emailError ? "block" : "none" }}>Email is invalid</p> */}
    </>
  );
}

export { EmailInput };
