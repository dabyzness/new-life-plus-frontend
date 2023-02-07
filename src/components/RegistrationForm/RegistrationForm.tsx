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

// Validates Password to be:
// 1. Minimum 8 characters
// 2. At least 1 lowercase, uppercase, digit, and special char
// 3. no spaces
const passwordValidator: RegExp =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*[\d])(?=.*[!-/:-@[-`{-~])[A-Za-z\d!-/:-@[-`{-~]{8,}$/;

function RegistrationForm() {
  const [passwordInput, setPasswordInput] = useState({
    password: "",
    confirmPassword: "",
  });
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    username: "",
  });

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    setFormData({ ...formData, [e.target?.name]: e.target?.value });
  }

  function handleChangeEmail(e: ChangeEvent<HTMLInputElement>) {
    if (e.target?.value.match(emailValidator)) {
      setFormData({ ...formData, email: e.target?.value });
    } else {
      setFormData({ ...formData, email: "" });
    }
  }

  function handleChangePassword(e: ChangeEvent<HTMLInputElement>) {
    if (e.target?.value.match(passwordValidator)) {
      setFormData({ ...formData, password: e.target?.value });
    }

    setPasswordInput({ ...passwordInput, password: e.target?.value });
  }

  // function handleChangeConfirmPassword(e: ChangeEvent<HTMLInputElement>){
  //   e.target?.value
  // }

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
        <PasswordAndConfirmPasswordValidation />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export { RegistrationForm };
