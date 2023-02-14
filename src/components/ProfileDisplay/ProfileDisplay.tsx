import { AvatarDisplay } from "../AvatarDisplay/AvatarDisplay";
import { ExperienceBar } from "../ExperienceBar/ExperienceBar";

import styles from "./ProfileDisplay.module.css";

interface ProfileDisplayProps {
  profile: Profile;
}

function ProfileDisplay(props: ProfileDisplayProps) {
  const { avatar, username, level, experience } = props.profile;

  return (
    <div className={styles.container}>
      <AvatarDisplay avatar={avatar} username={username} />
      <ExperienceBar level={level} experience={experience} />
      {/* Avatar broder Image */}
      {/* Current Level */}
      {/* Stats */}
    </div>
  );
}

export { ProfileDisplay };
