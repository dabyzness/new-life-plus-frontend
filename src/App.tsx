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

import { login, register } from "./services/auth";
import { getUserFromToken } from "./services/token";

export interface User {
  id: number;
  username: string;
}

function App() {
  const [user, setUser] = useState<User | null>(getUserFromToken());
  const [profile, setProfile] = useState<any>(null);

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
              user={user}
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
              <Home profile={profile} />
            </ProtectedRoute>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
