import { Navigate } from "react-router-dom";
import { Loading } from "../Loading/Loading";

export interface HomeProps {
  profile: any;
}

function Home(props: HomeProps) {
  if (!props.profile) {
    return <Loading />;
  }

  return <div>{props.profile && <div>{props.profile.username}</div>}</div>;
}

export { Home };
