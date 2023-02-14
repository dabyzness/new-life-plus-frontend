import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import { LoginForm, LoginFormData } from "./components/LoginForm/LoginForm";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import {
  RegistrationForm,
  RegistrationFormData,
} from "./components/RegistrationForm/RegistrationForm";
import { Home } from "./pages/Home/Home";

import { login, register, AuthResponseJSON } from "./services/auth";
import { getUserFromToken } from "./services/token";

export interface User {
  id: string;
  username: string;
}

function App() {
  const [user, setUser] = useState<User | null>(getUserFromToken());

  async function handleSubmitRegistration(user: RegistrationFormData<string>) {
    const registrationData = await register(user);

    return registrationData;
  }

  async function handleSubmitLogin(user: LoginFormData) {
    const loginData = await login(user);

    if (loginData instanceof Error) {
      return loginData;
    }

    setUser(loginData.user);
    return loginData;
  }

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
          element={
            <LoginForm user={user} handleSubmitLogin={handleSubmitLogin} />
          }
        />
        <Route
          path="/home"
          element={
            <ProtectedRoute user={user}>
              <Home />
            </ProtectedRoute>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
