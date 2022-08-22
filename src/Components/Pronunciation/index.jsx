import React from "react";
import { Button } from "antd";
import { SoundOutlined } from "@ant-design/icons";
import "./Pronunciation.scss";

const Pronunciation = ({ sectionData }) => {
  const getAudioPath = (sectionData) => {
    if (sectionData.audio.length > 0) {
      if (sectionData.audio[0]) {
        return sectionData.audio[0];
      } else if (sectionData.audio.length > 1) {
        return sectionData.audio[1];
      }
    }
  };
  const playAudio = (e) => {
    e.stopPropagation();
    var audio = new Audio();
    audio.src = getAudioPath(sectionData);
    audio.play();
  };

  return (
    sectionData.audio.length > 0 && (
      <Button
        type="text"
        shape="circle"
        icon={<SoundOutlined />}
        onClick={(e) => playAudio(e)}
      ></Button>
    )
  );
};

export default Pronunciation;
