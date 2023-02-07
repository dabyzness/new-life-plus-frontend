import React from "react";
import "./App.css";
import {
  RegistrationForm,
  RegistrationFormData,
} from "./components/RegistrationForm/RegistrationForm";

import { register } from "./services/auth";

async function handleSubmitRegistration(user: RegistrationFormData) {
  const registrationData = await register(user);

  return registrationData;
}

function App() {
  return (
    <div className="App">
      <RegistrationForm handleSubmitRegistration={handleSubmitRegistration} />
    </div>
  );
}

export default App;
