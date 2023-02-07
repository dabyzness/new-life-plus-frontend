import React, { ChangeEvent, KeyboardEvent, useState } from "react";
import { PasswordInput } from "./PasswordInput";
import { ConfirmPasswordInput } from "./ConfirmPasswordInput";

export interface PasswordsInput {
  password: string;
  confirmPassword: string;
}

export interface PasswordError {
  hasMinLength: boolean;
  hasUppercase: boolean;
  hasLowercase: boolean;
  hasDigit: boolean;
  hasSpecial: boolean;
  isCorrect: boolean;
}

function PasswordAndConfirmPasswordValidation() {
  const [passwordError, setPasswordError] = useState<PasswordError>({
    hasMinLength: false,
    hasUppercase: false,
    hasLowercase: false,
    hasDigit: false,
    hasSpecial: false,
    isCorrect: false,
  });
  const [confirmPasswordMatch, setConfirmPasswordMatch] =
    useState<boolean>(false);
  const [passwordInput, setPasswordInput] = useState<PasswordsInput>({
    password: "",
    confirmPassword: "",
  });

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    setPasswordInput({ ...passwordInput, [e.target?.name]: e.target?.value });
  }

  function handleValidation(e: KeyboardEvent<HTMLInputElement>) {
    const inputName = (e.target as HTMLInputElement)?.name;

    console.log(inputName);

    if (inputName === "password") {
      const uppercaseRegExp: RegExp = /(?=.*?[A-Z])[A-Z]/;
      const lowercaseRegExp: RegExp = /(?=.*?[a-z])[a-z]/;
      const digitRegExp: RegExp = /(?=.*?[0-9])[0-9]/;
      const specialRexExp: RegExp = /(?=.*?[!-/:-@[-`{-~])[!-/:-@[-`{-~]/;
      const minLengthRegExp: RegExp = /.{8,}/;
      const allTogetherRegExp: RegExp =
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[\d])(?=.*[!-/:-@[-`{-~])[A-Za-z\d!-/:-@[-`{-~]{8,}$/;

      setPasswordError({
        hasUppercase: uppercaseRegExp.test(passwordInput[inputName]),
        hasLowercase: lowercaseRegExp.test(passwordInput[inputName]),
        hasDigit: digitRegExp.test(passwordInput[inputName]),
        hasSpecial: specialRexExp.test(passwordInput[inputName]),
        hasMinLength: minLengthRegExp.test(passwordInput[inputName]),
        isCorrect: allTogetherRegExp.test(passwordInput[inputName]),
      });
    }

    if (
      inputName === "confirmPassword" ||
      (inputName === "password" && passwordInput.confirmPassword.length > 0)
    ) {
      console.log(confirmPasswordMatch);
      setConfirmPasswordMatch(
        passwordInput.password === passwordInput.confirmPassword
      );
    }
  }

  return (
    <>
      <PasswordInput
        handleChange={handleChange}
        handleValidation={handleValidation}
        passwordValue={passwordInput.password}
        passwordError={passwordError}
      />
      <ConfirmPasswordInput
        handleChange={handleChange}
        handleValidation={handleValidation}
        passwordValue={passwordInput.confirmPassword}
        confirmPasswordMatch={confirmPasswordMatch}
      />
    </>
  );
}

export { PasswordAndConfirmPasswordValidation };
