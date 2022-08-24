import React from "react";
import { Button, Tooltip } from "antd";
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
      <Tooltip
        title="Read out"
        color="#666"
        placement="left"
        arrowPointAtCenter
      >
        <Button
          type="text"
          shape="circle"
          icon={<SoundOutlined />}
          onClick={playAudio}
        />
      </Tooltip>
    )
  );
};

export default Pronunciation;
