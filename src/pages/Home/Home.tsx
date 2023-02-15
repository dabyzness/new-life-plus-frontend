import { Navigate } from "react-router-dom";
import { CreateTaskForm } from "../../components/CreateTaskForm/CreateTaskForm";
import { ExperienceBar } from "../../components/ExperienceBar/ExperienceBar";
import { ProfileDisplay } from "../../components/ProfileDisplay/ProfileDisplay";
import { Loading } from "../Loading/Loading";

export interface HomeProps {
  profile: any;
}

function Home(props: HomeProps) {
  if (!props.profile) {
    return <Loading />;
  }

  return (
    <div>
      <ProfileDisplay profile={props.profile} />
      <CreateTaskForm />
    </div>
  );
}

export { Home };
