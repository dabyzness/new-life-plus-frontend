import axios from "axios";
import { RegistrationFormData } from "../components/RegistrationForm/RegistrationForm";

const BASE_URL = `${process.env.REACT_APP_BACKEND_SERVER_URL}`;

async function register(user: RegistrationFormData) {
  console.log(BASE_URL);

  try {
    const res = await axios.request({
      method: "post",
      url: `${BASE_URL}/register`,
      data: user,
      headers: { "Content-type": "application/json" },
    });

    const json = await res.data;

    return json;
  } catch (err) {
    return err;
  }
}

export { register };
