import styles from "./Attribute.module.css";

interface AttributeProps {
  attribute: string;
  value: number;
  remainingValue?: number;
}

function Attribute(props: AttributeProps) {
  const { attribute, value, remainingValue } = props;

  return (
    <div className={styles.attribute}>
      <span className={styles.glyph}>{attribute[0]}</span>

      {!remainingValue && (
        <>
          <div className={styles.attributeName}>{attribute.toUpperCase()}</div>
          <span className={styles.value}>{value}</span>
        </>
      )}

      {remainingValue && (
        <div className={styles.container}>
          <div className={styles.experienceBarBorder}>
            <p>
              {remainingValue} / {value}
            </p>
          </div>

          <div
            className={styles.progress}
            style={{
              width: `${(90 * remainingValue) / value}%`,
              borderRadius: remainingValue === value ? "50px" : "50px 0 0 50px",
            }}
          ></div>
        </div>
      )}
    </div>
  );
}

export { Attribute };
