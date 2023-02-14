import { getProfileData } from "../../services/profile";

function Home() {
  getProfileData();

  return <div>YOU'RE LOGGED IN!</div>;
}

export { Home };
