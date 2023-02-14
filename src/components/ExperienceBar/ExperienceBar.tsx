import styles from "./ExperienceBar.module.css";

interface ExperienceBarProps {
  level: number;
  experience: number;
}

function ExperienceBar(props: ExperienceBarProps) {
  return (
    <div className={styles.container}>
      <div className={styles.experienceBarBorder}>
        <p>{props.experience} / 100</p>
      </div>

      <div
        className={styles.progress}
        style={{ width: `${(90 * props.experience) / 100}%` }}
      ></div>

      <div className={styles.star}>
        <img src="/images/star.svg" alt="star" />
        <p>{props.level}</p>
      </div>
    </div>
  );
}

export { ExperienceBar };
