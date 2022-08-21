import React from "react";
import { notification } from "antd";
import { AiTwotoneSound } from "react-icons/ai";
import "./Pronunciation.scss";

const Pronunciation = ({ data }) => {
  const getAudioPath = (data) => {
    if (data.audio.length > 0) {
      if (data.audio[0]) {
        return data.audio[0];
      } else if (data.audio.length > 1) {
        return data.audio[1];
      }
    } else {
      notification.error({
        message: "Error",
        description: "Pronunciation not found!",
      });
    }
  };
  return (
    <>
      <button
        className="pronunciation-play-button"
        onClick={(e) => {
          e.stopPropagation();
          var audio = new Audio();
          audio.src = getAudioPath(data);
          audio.play();
        }}
      >
        <AiTwotoneSound size={20} />
      </button>
    </>
  );
};

export default Pronunciation;
