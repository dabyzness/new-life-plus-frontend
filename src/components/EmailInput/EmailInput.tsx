import { ChangeEvent, KeyboardEvent, useState } from "react";
import { WasFocused } from "../RegistrationForm/RegistrationForm";

export interface EmailInputProps {
  handleSetEmail: Function;
  setWasFocused: Function;
  wasFocused: WasFocused;
  isTaken: boolean;
}

function EmailInput(props: EmailInputProps) {
  const [email, setEmail] = useState<string>("");
  const [emailError, setEmailError] = useState<boolean>(true);

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
    console.log(props.isTaken);

    return;
  }

  return (
    <>
      <input
        className={`${
          props.isTaken || (emailError && props.wasFocused.email)
            ? "input-error"
            : ""
        }`}
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
          emailError || props.isTaken ? "invalid-icon" : "valid-icon"
        }`}
      ></i>

      <ul
        className={`validation-prompt-container ${
          props.isTaken || (emailError && props.wasFocused.email)
            ? "has-errors"
            : ""
        }`}
      >
        <li
          className={`${
            !email && props.wasFocused.email ? "input-invalid" : "input-valid"
          }`}
        >
          E-mail is required
        </li>

        <li
          className={`${
            emailError && props.wasFocused.email && email
              ? "input-invalid"
              : "input-valid"
          }`}
        >
          Invalid e-mail
        </li>

        <li className={`${props.isTaken ? "input-invalid" : "input-valid"}`}>
          E-mail is already in use
        </li>
      </ul>
    </>
  );
}

export { EmailInput };
