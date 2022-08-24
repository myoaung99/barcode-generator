import { useState } from "react";

export const useTogglePasswordVisibility = () => {
  const [passwordVisibility, setPasswordVisibility] = useState(true);
  const [rightIcon, setRightIcon] = useState("Eye");

  const handlePasswordVisibility = () => {
    if (rightIcon === "Eye") {
      setRightIcon("EyeOff");
      setPasswordVisibility(!passwordVisibility);
    } else if (rightIcon === "EyeOff") {
      setRightIcon("Eye");
      setPasswordVisibility(!passwordVisibility);
    }
  };

  return {
    passwordVisibility,
    rightIcon,
    handlePasswordVisibility,
  };
};
