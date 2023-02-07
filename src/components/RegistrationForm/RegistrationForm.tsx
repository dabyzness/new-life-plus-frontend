import React, { ChangeEvent, FormEvent, useState } from "react";
import { PasswordAndConfirmPasswordValidation } from "../PasswordAndConfirmPasswordValidation/PasswordAndConfirmPasswordValidation";
import { EmailInput } from "../EmailInput/EmailInput";
import { UsernameInput } from "../UsernameInput/UsernameInput";

export interface RegistrationFormData {
  email: string;
  password: string;
  username: string;
}

export interface RegistrationFormProps {
  handleSubmitRegistration: Function;
}

function RegistrationForm(props: RegistrationFormProps) {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    username: "",
  });

  function handleSetPassword(password: string) {
    setFormData({ ...formData, password });
  }

  function handleSetEmail(email: string) {
    setFormData({ ...formData, email });
  }

  function handleSetUsername(username: string) {
    setFormData({ ...formData, username });
  }

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    props.handleSubmitRegistration(formData);
  }

  return (
    <div>
      <form autoComplete="off" onSubmit={handleSubmit}>
        <EmailInput handleSetEmail={handleSetEmail} />
        <PasswordAndConfirmPasswordValidation
          handleSetPassword={handleSetPassword}
        />
        <UsernameInput handleSetUsername={handleSetUsername} />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export { RegistrationForm };
