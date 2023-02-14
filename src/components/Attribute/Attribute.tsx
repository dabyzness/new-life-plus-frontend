interface AttributeProps {
  attribute: string;
  value: number;
}

function Attribute(props: AttributeProps) {
  return <div>{props.attribute}</div>;
}

export { Attribute };
