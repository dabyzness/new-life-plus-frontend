import { useEffect, useState } from "react";
import { Routes, Route, redirect } from "react-router-dom";
import "./App.css";
import { CreateProfileForm } from "./components/CreateProfileForm/CreateProfileForm";
import { LoginForm, LoginFormData } from "./components/LoginForm/LoginForm";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import {
  RegistrationForm,
  RegistrationFormData,
} from "./components/RegistrationForm/RegistrationForm";
import { Home } from "./pages/Home/Home";

import { login, register } from "./services/auth";
import { createProfile, getProfile } from "./services/profile";
import { getUserFromToken } from "./services/token";

function App() {
  const [user, setUser] = useState<User | null>(getUserFromToken());
  const [profile, setProfile] = useState<Profile | null>(null);

  useEffect(() => {
    if (!user) {
      setProfile(null);
      return;
    }
    const fetchProfile = async () => {
      const data = await getProfile(user.username);

      if (data instanceof Error) {
        setProfile(null);
        return;
      }
      setProfile(data);
    };

    fetchProfile();
  }, [user]);

  async function handleSubmitRegistration(user: RegistrationFormData<string>) {
    const registrationData = await register(user);

    if (registrationData instanceof Error) {
      return registrationData;
    }

    setUser(registrationData.user);
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

  async function handleSubmitCreateProfile(formData: CreateProfileFormData) {
    if (!user) {
      return;
    }

    const profile = await createProfile(user?.username, formData.name);

    if (profile instanceof Error) {
      return profile;
    }

    setProfile(profile);

    return redirect("/home");
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
          path="/createProfile"
          element={
            <ProtectedRoute user={user}>
              <CreateProfileForm
                handleSubmitCreateProfile={handleSubmitCreateProfile}
              />
            </ProtectedRoute>
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
