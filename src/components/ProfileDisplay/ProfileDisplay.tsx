import { Attributes } from "../Attributes/Attributes";
import { AvatarDisplay } from "../AvatarDisplay/AvatarDisplay";
import { ExperienceBar } from "../ExperienceBar/ExperienceBar";

import styles from "./ProfileDisplay.module.css";

interface ProfileDisplayProps {
  profile: Profile;
}

function ProfileDisplay(props: ProfileDisplayProps) {
  const {
    avatar,
    username,
    level,
    experience,
    health,
    strength,
    intellect,
    charisma,
    gold,
  } = props.profile;

  return (
    <div className={styles.container}>
      <div className={styles.avatarContainer}>
        <AvatarDisplay avatar={avatar} username={username} />
        <ExperienceBar level={level} experience={experience} />
      </div>
      <Attributes
        health={health}
        strength={strength}
        intellect={intellect}
        charisma={charisma}
        gold={gold}
      />
    </div>
  );
}

export { ProfileDisplay };
