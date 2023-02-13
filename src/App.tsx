import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import { LoginForm, LoginFormData } from "./components/LoginForm/LoginForm";
import {
  RegistrationForm,
  RegistrationFormData,
} from "./components/RegistrationForm/RegistrationForm";

import { login, register } from "./services/auth";
import { getToken } from "./services/token";

export interface User {
  id: string;
  username: string;
}

async function handleSubmitRegistration(user: RegistrationFormData<string>) {
  const registrationData = await register(user);

  return registrationData;
}

async function handleSubmitLogin(user: LoginFormData) {
  const loginData = await login(user);

  return loginData;
}

function App() {
  const [user, setUser] = useState();

  getToken();

  return (
    <div className="App">
      <Routes>
        <Route
          path="/signup"
          element={
            <RegistrationForm
              handleSubmitRegistration={handleSubmitRegistration}
            />
          }
        />
        <Route
          path="/login"
          element={<LoginForm handleSubmitLogin={handleSubmitLogin} />}
        />
      </Routes>
    </div>
  );
}

export default App;
