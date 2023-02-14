import { Navigate } from "react-router-dom";
import { getProfileData } from "../../services/profile";

export interface HomeProps {
  profile: any;
}

function Home(props: HomeProps) {
  return <div>{!props.profile && <Navigate to="/createProfile" />}</div>;
}

export { Home };
