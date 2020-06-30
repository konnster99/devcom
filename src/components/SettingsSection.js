import React, { useState } from "react";
import Section from "components/Section";
import ReauthModal from "components/ReauthModal";
import SettingsNav from "components/SettingsNav";
import SettingsGeneral from "components/SettingsGeneral";
import SettingsPassword from "components/SettingsPassword";
import { useAuth } from "util/auth.js";
import "components/SettingsSection.scss";

function SettingsSection(props) {
  const auth = useAuth();
  const [section, setSection] = useState("general");

  // If an action is security sensitive it will
  // trigger a re-authentication flow.
  const [reauthState, setReauthState] = useState({
    show: false,
  });

  const handleRequireReauth = (callback) => {
    setReauthState({
      show: true,
      callback: callback,
    });
  };

  const handleCompleteReauth = () => {
    reauthState.callback();
    setReauthState({ show: false });
  };

  const handleCancelReauth = () => {
    setReauthState({ show: false });
  };

  return (
    <Section
      color={props.color}
      size={props.size}
      backgroundImage={props.backgroundImage}
      backgroundImageOpacity={props.backgroundImageOpacity}
    >
      {reauthState.show && (
        <ReauthModal
          provider={auth.user.providers[0]}
          onComplete={handleCompleteReauth}
          onCancel={handleCancelReauth}
        ></ReauthModal>
      )}

      <SettingsNav
        activeKey={section}
        onSelect={(selected) => setSection(selected)}
      ></SettingsNav>
      <div className="SettingsSection__container container">
        {section === "general" && (
          <SettingsGeneral
            onRequireReauth={handleRequireReauth}
            parentColor={props.color}
          ></SettingsGeneral>
        )}

        {section === "password" && (
          <SettingsPassword
            onRequireReauth={handleRequireReauth}
            parentColor={props.color}
          ></SettingsPassword>
        )}
      </div>
    </Section>
  );
}

export default SettingsSection;
