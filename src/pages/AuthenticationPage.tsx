import { useState } from "react";
import { LoginForm } from "../components/LoginForm/LoginForm";
import { RegistrationForm } from "../components/RegistrationForm/RegistrationForm";

export interface IAuthenticationProps {
  handleSubmitRegistration: Function;
  handleSubmitLogin: Function;
}

function AuthenticationPage(props: IAuthenticationProps) {
  const { handleSubmitRegistration, handleSubmitLogin } = props;

  return (
    <div>
      <RegistrationForm handleSubmitRegistration={handleSubmitRegistration} />
      <LoginForm handleSubmitLogin={handleSubmitLogin} />
    </div>
  );
}

export { AuthenticationPage };
