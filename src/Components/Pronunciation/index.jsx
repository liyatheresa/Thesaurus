import React from "react";
import { Button } from "antd";
import { SoundOutlined } from "@ant-design/icons";
import "./Pronunciation.scss";

const Pronunciation = ({ sectionData }) => {
  const getAudioPath = (sectionData) =>
    sectionData.audio.find((audio) => audio !== "");

  const playAudio = (e) => {
    e.stopPropagation();
    var audio = new Audio();
    audio.src = getAudioPath(sectionData);
    audio.play();
  };

  return (
    sectionData.audio.some((audiopath) => audiopath !== "") && (
      <Button
        type="text"
        shape="circle"
        icon={<SoundOutlined />}
        onClick={playAudio}
      />
    )
  );
};

export default Pronunciation;
