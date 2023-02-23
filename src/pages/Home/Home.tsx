import { Navigate, useNavigate } from "react-router-dom";
import { CreateTaskForm } from "../../components/CreateTaskForm/CreateTaskForm";
import { ExperienceBar } from "../../components/ExperienceBar/ExperienceBar";
import { ProfileDisplay } from "../../components/ProfileDisplay/ProfileDisplay";
import { Loading } from "../Loading/Loading";

export interface HomeProps {
  profile: any;
  handleSubmitCreateTask: Function;
}

function Home(props: HomeProps) {
  const navigate = useNavigate();

  if (!props.profile) {
    return <Loading />;
  }

  return (
    <div style={{ display: "flex" }}>
      <ProfileDisplay profile={props.profile} />
      <button
        onClick={() => {
          navigate("/createTask");
        }}
      >
        Create New Task
      </button>
    </div>
  );
}

export { Home };
