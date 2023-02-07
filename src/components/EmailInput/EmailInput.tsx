import { ChangeEvent, KeyboardEvent, useState } from "react";

export interface EmailInputProps {
  handleSetEmail: Function;
}

function EmailInput(props: EmailInputProps) {
  const [email, setEmail] = useState<string>("");
  const [emailError, setEmailError] = useState<boolean>(false);

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

  return (
    <>
      <input
        type="email"
        name="email"
        autoComplete="off"
        placeholder="E-mail"
        value={email}
        onChange={handleChange}
        onKeyUp={handleValidation}
        required
      />
      <p style={{ display: emailError ? "block" : "none" }}>Email is invalid</p>
    </>
  );
}

export { EmailInput };
