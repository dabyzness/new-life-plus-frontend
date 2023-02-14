import jwtDecode, { JwtPayload } from "jwt-decode";

export interface JWTUserPayload extends JwtPayload {
  exp: number;
  id: number;
  username: string;
}

function setToken(token: string): void {
  localStorage.setItem("token", token);
}

function getToken<T extends string | undefined | null>(): T {
  let token = localStorage.getItem("token") as T;

  if (token) {
    const payload = jwtDecode<JWTUserPayload>(token);
    if (payload.exp < Date.now() / 1000) {
      removeToken();
      token = null as T;
    }
  } else {
    removeToken();
  }

  return token;
}

function getUserFromToken(): User | null {
  const token = getToken();
  if (!token) {
    return null;
  }

  const { id, username } = jwtDecode<JWTUserPayload>(token);
  const user: User = { id: Number(id), username };

  return user;
}

function removeToken() {
  localStorage.removeItem("token");
}

export { setToken, getToken, removeToken, getUserFromToken };
