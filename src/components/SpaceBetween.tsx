import { PropsWithChildren } from "react";

function SpaceBetween(props: PropsWithChildren) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        flexWrap: 'wrap'
      }}
    >
      {props.children}
    </div>
  );
}

export default SpaceBetween;
