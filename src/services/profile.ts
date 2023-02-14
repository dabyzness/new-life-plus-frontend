import axios from "axios";
import { getToken } from "./token";

const BASE_URL = `${process.env.REACT_APP_BACKEND_SERVER_URL}`;

async function getProfileData() {
  await axios.request({
    method: "get",
    url: `${BASE_URL}/api/attribute`,
    headers: {
      "Content-type": "application/json",
      Authorization: `Bearer ${getToken()}`,
    },
  });
}

export { getProfileData };
