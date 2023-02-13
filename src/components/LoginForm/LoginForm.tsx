import { ChangeEvent, FormEvent, useState } from "react";

import styles from "./LoginForm.module.css";

export interface LoginFormData {
  email: string;
  password: string;
}

export interface LoginFormProps {
  handleSubmitLogin: Function;
}

function LoginForm(props: LoginFormProps) {
  const [formData, setFormData] = useState<LoginFormData>({
    email: "",
    password: "",
  });

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const data = await props.handleSubmitLogin(formData);

    console.log(data);
  }

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  return (
    <div className={styles.formContainer}>
      <form className={styles.loginForm} onSubmit={handleSubmit}>
        <h2>Log in</h2>
        <input type="text" name="email" onChange={handleChange} required />
        <label htmlFor="email">E-mail</label>

        <input
          type="password"
          name="password"
          onChange={handleChange}
          required
        />
        <label htmlFor="password">Password</label>

        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export { LoginForm };
