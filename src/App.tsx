import { useEffect, useState } from "react";
import { Routes, Route, redirect } from "react-router-dom";
import "./App.css";
import { CreateProfileForm } from "./components/CreateProfileForm/CreateProfileForm";
import {
  CreateTaskForm,
  CreateTaskFormState,
} from "./components/CreateTaskForm/CreateTaskForm";
import { LoginForm, LoginFormData } from "./components/LoginForm/LoginForm";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import {
  RegistrationForm,
  RegistrationFormData,
} from "./components/RegistrationForm/RegistrationForm";
import { Home } from "./pages/Home/Home";

import { login, register } from "./services/auth";
import { createProfile, getProfile } from "./services/profile";
import { createTask, getAllTasks } from "./services/task";
import { getUserFromToken } from "./services/token";

function App() {
  const [user, setUser] = useState<User | null>(getUserFromToken());
  const [profile, setProfile] = useState<Profile | null>(null);
  // Will most likely need to memoize the tasks
  const [tasks, setTasks] = useState<Task[]>([]);

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

  useEffect(() => {
    if (!profile) {
      setTasks([]);
      return;
    }

    const fetchTasks = async () => {
      const data = await getAllTasks(profile.username);

      if (data instanceof Error) {
        return;
      }
      setTasks(data);
    };

    fetchTasks();
  }, [profile]);

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

  async function handleSubmitCreateTask(
    formData: CreateTaskFormState
  ): Promise<Error | Response> {
    if (!user || !profile) {
      return redirect("/login");
    }

    const task = await createTask(formData, profile.id);

    if (task instanceof Error) {
      return task;
    }

    setTasks([...tasks, task]);

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
              <Home
                profile={profile}
                handleSubmitCreateTask={handleSubmitCreateTask}
                tasks={tasks}
              />
            </ProtectedRoute>
          }
        />

        {/* This needs its own page
            CreateTaskForm should not be its own page, instead
            it should just be a component. Really I'm thinking about a modal pop-up, but we'll see where that takes us. */}
        <Route
          path="/createTask"
          element={
            <ProtectedRoute user={user}>
              <CreateTaskForm handleSubmitCreateTask={handleSubmitCreateTask} />
            </ProtectedRoute>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
