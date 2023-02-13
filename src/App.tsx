import React from "react";
import "./App.css";
import { LoginForm, LoginFormData } from "./components/LoginForm/LoginForm";
import {
  RegistrationForm,
  RegistrationFormData,
} from "./components/RegistrationForm/RegistrationForm";

import { login, register } from "./services/auth";

async function handleSubmitRegistration(user: RegistrationFormData<string>) {
  const registrationData = await register(user);

  return registrationData;
}

async function handleSubmitLogin(user: LoginFormData) {
  const loginData = await login(user);

  return loginData;
}

function App() {
  return (
    <div className="App">
      <RegistrationForm handleSubmitRegistration={handleSubmitRegistration} />
      <LoginForm handleSubmitLogin={handleSubmitLogin} />
    </div>
  );
}

export default App;
