import React from "react";

type Props = {
  color?: string;
};

const Separate = (props: Props) => {
  return (
    <div className="flex-1 flex items-end px-2">
      <span
        className={`w-full h-px border-b border-dashed opacity-20 ${props.color}`}
      />
    </div>
  );
};

export default Separate;
