import { getProfileData } from "../../services/profile";

export interface HomeProps {
  profile: any;
}

function Home(props: HomeProps) {
  getProfileData();

  return <div>YOU'RE LOGGED IN!</div>;
}

export { Home };
