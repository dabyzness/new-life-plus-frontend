import { FormEvent, useState } from "react";
import { PasswordAndConfirmPasswordValidation } from "../PasswordAndConfirmPasswordValidation/PasswordAndConfirmPasswordValidation";
import { EmailInput } from "../EmailInput/EmailInput";
import { UsernameInput } from "../UsernameInput/UsernameInput";

import styles from "./RegistrationForm.module.css";
import { Navigate } from "react-router-dom";

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
  user: User | null;
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

  const [errorMessageTaken, setErrorMessageTaken] = useState<
    RegistrationFormData<boolean>
  >({
    email: false,
    password: false,
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

    const data = await props.handleSubmitRegistration(formData);

    if (data instanceof Error) {
      // If there's an error in registering, one of the fields must be taken, so we pass errors down.
      const target: string = JSON.parse(data.message).meta.target[0];
      setErrorMessageTaken({ ...errorMessageTaken, [target]: true });
    } else {
      // Set all values in errorMessageTaken to false
      const temp = {} as RegistrationFormData<boolean>;
      Object.keys(errorMessageTaken).forEach((key) => {
        temp[key as keyof typeof temp] = false;
      });

      setErrorMessageTaken(temp);
    }
  }

  return (
    <div className={styles.formContainer}>
      {props.user && <Navigate to="/home" />}
      <form
        className={styles.registrationForm}
        autoComplete="off"
        onSubmit={handleSubmit}
      >
        <h2>Sign-Up</h2>
        <EmailInput
          handleSetEmail={handleSetEmail}
          wasFocused={wasFocused}
          setWasFocused={setWasFocused}
          isTaken={errorMessageTaken.email}
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
          isTaken={errorMessageTaken.username}
        />
        <button
          type="submit"
          disabled={
            !formData.email || !formData.password || !formData.username
              ? true
              : false
          }
        >
          Submit
        </button>
        <a href="/login" className={styles.link}>
          Already have an account? Login here
        </a>
      </form>
    </div>
  );
}

export { RegistrationForm };
