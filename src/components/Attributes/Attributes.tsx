import { Attribute } from "../Attribute/Attribute";

import styles from "./Attributes.module.css";

interface AttributesProps {
  health: number;
  strength: number;
  intellect: number;
  charisma: number;
  gold: number;
}

function Attributes(props: AttributesProps) {
  return (
    <div className={styles.container}>
      {Object.keys(props).map((key) => (
        <Attribute attribute={key} value={props[key as keyof typeof props]} />
      ))}
    </div>
  );
}

export { Attributes };
