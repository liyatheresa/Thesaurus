import React from "react";
import { Button } from "antd";
import { SoundOutlined } from "@ant-design/icons";
import "./Pronunciation.scss";

const Pronunciation = ({ sectionData }) => {
  const getAudioUrl = (sectionData) =>
    sectionData.audio.find((audio) => audio !== "");

  const playAudio = (e) => {
    e.stopPropagation();
    let audio = new Audio();
    audio.src = getAudioUrl(sectionData);
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
