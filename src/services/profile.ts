import axios, { AxiosError } from "axios";
import { getToken } from "./token";

const BASE_URL = `${process.env.REACT_APP_BACKEND_SERVER_URL}`;

async function createProfile(username: string, name: string) {
  try {
    const res = await axios.request({
      method: "post",
      url: `${BASE_URL}/api/profile`,
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${getToken()}`,
      },
      data: { username, name },
    });

    const profile = await res.data;

    return profile;
  } catch (error) {
    if (error instanceof AxiosError) {
      // return error.response?.data;
      return new Error(JSON.stringify(error.response?.data));
    }
    return error as Error;
  }
}

async function getProfile(username: string | undefined) {
  try {
    const res = await axios.request({
      method: "get",
      url: `${BASE_URL}/api/profile/${username}`,
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${getToken()}`,
      },
    });

    return await res.data;

    // return profile;
  } catch (error) {
    if (error instanceof AxiosError) {
      // return error.response?.data;
      return new Error(JSON.stringify(error.response?.data));
    }
    return error as Error;
  }
}

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

export { createProfile, getProfile, getProfileData };
