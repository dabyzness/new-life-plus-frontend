import { ChangeEvent, KeyboardEvent, useState, useEffect } from "react";
import { PasswordInput } from "./PasswordInput";
import { ConfirmPasswordInput } from "./ConfirmPasswordInput";
import { WasFocused } from "../RegistrationForm/RegistrationForm";

export interface PasswordsInput {
  password: string;
  confirmPassword: string;
}

export interface PasswordError<T extends string | boolean> {
  [key: string]: T;
  hasMinLength: T;
  hasUppercase: T;
  hasLowercase: T;
  hasDigit: T;
  hasSpecial: T;
  isCorrect: T;
}

export interface PasswordAndConfirmPasswordValidationProps {
  handleSetPassword: Function;
  setWasFocused: Function;
  wasFocused: WasFocused;
}

function PasswordAndConfirmPasswordValidation(
  props: PasswordAndConfirmPasswordValidationProps
) {
  const [passwordError, setPasswordError] = useState<PasswordError<boolean>>({
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

  useEffect(() => {
    if (passwordError.isCorrect && confirmPasswordMatch) {
      props.handleSetPassword(passwordInput.password);
    } else {
      props.handleSetPassword("");
    }
  }, [passwordError.isCorrect, confirmPasswordMatch]);

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    setPasswordInput({ ...passwordInput, [e.target?.name]: e.target?.value });
  }

  function handleValidation(e: KeyboardEvent<HTMLInputElement>) {
    const inputName = (e.target as HTMLInputElement)?.name;

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
        wasFocused={props.wasFocused}
        setWasFocused={props.setWasFocused}
      />
      <ConfirmPasswordInput
        handleChange={handleChange}
        handleValidation={handleValidation}
        passwordValue={passwordInput.confirmPassword}
        confirmPasswordMatch={confirmPasswordMatch}
        wasFocused={props.wasFocused}
        setWasFocused={props.setWasFocused}
      />
    </>
  );
}

export { PasswordAndConfirmPasswordValidation };
