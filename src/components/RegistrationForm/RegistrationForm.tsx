import React, { ChangeEvent, useState } from "react";
import { PasswordAndConfirmPasswordValidation } from "../PasswordAndConfirmPasswordValidation/PasswordAndConfirmPasswordValidation";
import { EmailInput } from "../EmailInput/EmailInput";

export interface RegistrationFormData {
  email: string;
  password: string;
  username: string;
}

function RegistrationForm() {
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

  return (
    <div>
      <form autoComplete="off">
        <EmailInput handleSetEmail={handleSetEmail} />
        <PasswordAndConfirmPasswordValidation
          handleSetPassword={handleSetPassword}
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export { RegistrationForm };
