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
  const [hasError, setHasError] = useState<boolean>(false);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const data = await props.handleSubmitLogin(formData);

    if (data instanceof Error) {
      setHasError(true);
    } else {
      setHasError(false);
    }
  }

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  return (
    <div className={styles.formContainer}>
      <form className={styles.loginForm} onSubmit={handleSubmit}>
        <h2>Log in</h2>
        <input
          type="text"
          name="email"
          autoCorrect="false"
          onChange={handleChange}
          required
        />
        <label htmlFor="email" className={formData.email ? "notEmpty" : ""}>
          E-mail
        </label>

        <input
          type="password"
          name="password"
          className={hasError ? "login-error" : ""}
          onChange={handleChange}
          required
        />
        <label
          htmlFor="password"
          className={formData.password ? "notEmpty" : ""}
        >
          Password
        </label>

        <ul
          className={`validation-prompt-container ${
            hasError ? "has-errors" : ""
          }`}
        >
          <li className={`input-invalid`}>Username or password is incorrect</li>
        </ul>

        <button
          type="submit"
          disabled={!formData.email || !formData.password ? true : false}
        >
          Submit
        </button>
        <a href="/signup" className={styles.link}>
          Don't have an account? Register here
        </a>
      </form>
    </div>
  );
}

export { LoginForm };
