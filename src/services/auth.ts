import axios, { Axios, AxiosError } from "axios";
import { LoginFormData } from "../components/LoginForm/LoginForm";
import { RegistrationFormData } from "../components/RegistrationForm/RegistrationForm";

const BASE_URL = `${process.env.REACT_APP_BACKEND_SERVER_URL}`;

async function register(user: RegistrationFormData<string>) {
  try {
    const res = await axios.request({
      method: "post",
      url: `${BASE_URL}/register`,
      data: user,
      headers: { "Content-type": "application/json" },
    });

    const json = await res.data;

    return json;
  } catch (error) {
    if (error instanceof AxiosError) {
      // return error.response?.data;
      return new Error(JSON.stringify(error.response?.data));
    }
    return error;
  }
}

async function login(user: LoginFormData) {
  try {
    const res = await axios.request({
      method: "post",
      url: `${BASE_URL}/login`,
      data: user,
      headers: { "Content-Type": "application/json" },
    });

    const json = await res.data;

    return json;
  } catch (error) {
    if (error instanceof AxiosError) {
      return error.response?.data.message;
    }

    return new Error("Something went wrong");
  }
}

export { register, login };
