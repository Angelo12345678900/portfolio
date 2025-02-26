// components/Icons.js
import React, { memo } from 'react';
import {
  SiPython,
  SiPhp,
  SiHtml5,
  SiCss3,
  SiDotnet,
  SiMysql,
  SiFirebase,
  SiGit,
  SiGooglecolab,
  SiJavascript
} from "react-icons/si";

import {
  DiJava,
  DiVisualstudio
} from "react-icons/di";

import {
  TbBrain,
  TbBrandPython,
  TbNetwork,
  TbEye
} from "react-icons/tb";

import { FaMicrosoft } from "react-icons/fa";

const skillIcons = {
  Python: <SiPython size={24} className="text-blue-300" />,
  Java: <DiJava size={24} className="text-blue-300" />,
  PHP: <SiPhp size={24} className="text-blue-300" />,
  HTML: <SiHtml5 size={24} className="text-blue-300" />,
  CSS: <SiCss3 size={24} className="text-blue-300" />,
  ".NET": <SiDotnet size={24} className="text-blue-300" />,
  MySQL: <SiMysql size={24} className="text-blue-300" />,
  Firebase: <SiFirebase size={24} className="text-blue-300" />,
  Git: <SiGit size={24} className="text-blue-300" />,
  "Machine Learning": <TbBrain size={24} className="text-blue-300" />,
  CNN: <TbNetwork size={24} className="text-blue-300" />,
  YOLOv8: <TbEye size={24} className="text-blue-300" />,
  JavaScript: <SiJavascript size={24} className="text-blue-300" />
};

const frameworkIcons = {
  Python: <TbBrandPython size={24} className="text-blue-300" />,
  YOLOv8: <TbEye size={24} className="text-blue-300" />,
  Firebase: <SiFirebase size={24} className="text-blue-300" />,
  HTML: <SiHtml5 size={24} className="text-blue-300" />,
  CSS: <SiCss3 size={24} className="text-blue-300" />,
  "Google Colab": <SiGooglecolab size={24} className="text-blue-300" />,
  Roboflow: <TbBrain size={24} className="text-blue-300" />,
  Git: <SiGit size={24} className="text-blue-300" />,
  ".NET": <SiDotnet size={24} className="text-blue-300" />,
  "Microsoft Access": <FaMicrosoft size={24} className="text-blue-300" />,
  "Visual Studio": <DiVisualstudio size={24} className="text-blue-300" />,
  JavaScript: <SiJavascript size={24} className="text-blue-300" />
};

const Icons = ({ skill, framework }) => {
  if (skill && skillIcons[skill]) {
    return skillIcons[skill];
  }
  
  if (framework && frameworkIcons[framework]) {
    return frameworkIcons[framework];
  }
  
  return null;
};

export default memo(Icons);
