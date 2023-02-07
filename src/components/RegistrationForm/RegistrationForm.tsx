import React, { ChangeEvent, useState } from "react";
import { PasswordAndConfirmPasswordValidation } from "../PasswordAndConfirmPasswordValidation/PasswordAndConfirmPasswordValidation";

export interface RegistrationFormData {
  email: string;
  password: string;
  username: string;
}

// Validates Email to be:
// 1. Minimum 2 characters before the @
// 2. alphanumeric okay, periods okay, and able to have a +
// 3. any alphanumeric domain, between 2-4 digits after the .
const emailValidator: RegExp = /^[\w-\.]+(?:[+\w]+)@([\w-]+\.)+[\w-]{2,4}$/;

function RegistrationForm() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    username: "",
  });

  function handleChangeEmail(e: ChangeEvent<HTMLInputElement>) {
    if (e.target?.value.match(emailValidator)) {
      setFormData({ ...formData, email: e.target?.value });
    } else {
      setFormData({ ...formData, email: "" });
    }
  }

  function handleSetPassword(password: string) {
    setFormData({ ...formData, password });
  }

  return (
    <div>
      <form autoComplete="off">
        <input
          type="email"
          name="email"
          autoComplete="off"
          placeholder="E-mail"
          onChange={handleChangeEmail}
          required
        />
        <PasswordAndConfirmPasswordValidation
          handleSetPassword={handleSetPassword}
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export { RegistrationForm };
