import React from "react";
import { LucideIcon } from "lucide-react";

type Props = {
  icon: LucideIcon;
  title: string;
  color: string;
};

const SubSectionTitle = (props: Props) => {
  return (
    <div className="flex items-center space-x-1">
      <props.icon className={`size-3.5 transition-colors ${props.color}`} />
      <span className={`text-xs font-medium ${props.color}`}>
        {props.title}
      </span>
    </div>
  );
};

export default SubSectionTitle;
