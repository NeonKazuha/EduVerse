// src/Component/ProfileManager.js
import React, { useState } from "react";
import ProfileButton from "./ProfileButton";
import ProfileDialog from "./ProfileDialog";
import { useAtom } from "jotai";
import { Findme } from "../Utils/Findme";

const ProfileManager = () => {
  const [isProfileDialogVisible, setIsProfileDialogVisible] = useState(false);
  const [me, setme] = useAtom(Findme);

  const handleProfileClick = () => {
    setIsProfileDialogVisible(true);
  };

  const handleCloseProfileDialog = () => {
    setIsProfileDialogVisible(false);
  };

  return (
    <>
      {me && (
        <div className="absolute z-10">
          <ProfileButton onClick={handleProfileClick} />
          {isProfileDialogVisible && (
            <ProfileDialog
              character={me}
              onClose={handleCloseProfileDialog}
            />
          )}
        </div>
      )}
    </>
  );
};

export default ProfileManager;