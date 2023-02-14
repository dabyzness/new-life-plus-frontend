import styles from "./AvatarDisplay.module.css";

interface AvatarDisplayProps {
  avatar: string | null;
  username: string;
  level: number;
  experience: number;
}

function AvatarDisplay(props: AvatarDisplayProps) {
  return (
    <div className={styles.container}>
      <div className={styles.usernameContainer}>
        <h3 className={styles.username}>{props.username}</h3>
      </div>
      <div className={styles.frameContainer}>
        <img
          className={styles.avatar}
          src={props.avatar ? props.avatar : "/images/avatar.jpg"}
          alt=""
        />
        <div className={styles.corner}></div>
        <div className={styles.corner}></div>
        <div className={styles.corner}></div>
        <div className={styles.corner}></div>
      </div>
    </div>
  );
}

export { AvatarDisplay };
