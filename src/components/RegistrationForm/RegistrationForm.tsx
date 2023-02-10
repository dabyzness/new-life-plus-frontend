import React, { ChangeEvent, FormEvent, useState } from "react";
import { PasswordAndConfirmPasswordValidation } from "../PasswordAndConfirmPasswordValidation/PasswordAndConfirmPasswordValidation";
import { EmailInput } from "../EmailInput/EmailInput";
import { UsernameInput } from "../UsernameInput/UsernameInput";

import styles from "./RegistrationForm.module.css";

export interface RegistrationFormData<T extends string | boolean> {
  email: T;
  password: T;
  username: T;
}

export interface WasFocused extends RegistrationFormData<boolean> {
  confirmPassword: boolean;
}

export interface RegistrationFormProps {
  handleSubmitRegistration: Function;
}

function RegistrationForm(props: RegistrationFormProps) {
  const [formData, setFormData] = useState<RegistrationFormData<string>>({
    email: "",
    password: "",
    username: "",
  });

  const [wasFocused, setWasFocused] = useState<WasFocused>({
    email: false,
    password: false,
    confirmPassword: false,
    username: false,
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

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    props.handleSubmitRegistration(formData);

    // Insert Navigate here to get us off of the page
  }

  return (
    <div className={styles.formContainer}>
      <form
        className={styles.registrationForm}
        autoComplete="off"
        onSubmit={handleSubmit}
      >
        <EmailInput
          handleSetEmail={handleSetEmail}
          wasFocused={wasFocused}
          setWasFocused={setWasFocused}
        />
        <PasswordAndConfirmPasswordValidation
          handleSetPassword={handleSetPassword}
          wasFocused={wasFocused}
          setWasFocused={setWasFocused}
        />
        <UsernameInput
          handleSetUsername={handleSetUsername}
          wasFocused={wasFocused}
          setWasFocused={setWasFocused}
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export { RegistrationForm };
