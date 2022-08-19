import React, { useEffect, useState } from "react";
import "./Overlay.scss";
import { Modal, Collapse, Spin } from "antd";
import PanelHeader from "../PanelHeader";
import MeaningsList from "../MeaningsList";
import SynonymsList from "../SynonymsList";
import AntonymsList from "../AntonymsList";
import { getWordDefinition } from "../../requests";

const { Panel } = Collapse;

const Overlay = ({ word, setIsModalVisible, isModalVisible }) => {
  const [wordDetails, setWordDetails] = useState({});
  let partsOfSpeech = [];

  useEffect(() => {
    if (isModalVisible) {
      const wrapperFunc = async () => {
        let { serializedResponse, succeeded } = await getWordDefinition(word);
        if (succeeded) {
          setWordDetails(serializedResponse);
        } else {
          setIsModalVisible(false);
        }
      };
      wrapperFunc();
    }
  }, [isModalVisible]);

  const closeModal = () => {
    setIsModalVisible(false);
  };

  const getPartsOfSpeechList = () => {
    let partsOfSpeechList = [];
    wordDetails?.sections?.forEach((section) => {
      let partOfSpeechArrayEachSection = [];
      section?.definitions.forEach((definition) =>
        partOfSpeechArrayEachSection.push(definition.partOfSpeech)
      );
      partsOfSpeechList.push(partOfSpeechArrayEachSection);
    });
    return partsOfSpeechList;
  };
  partsOfSpeech = getPartsOfSpeechList();

  return (
    <>
      <Modal
        title={word}
        visible={isModalVisible}
        onOk={closeModal}
        onCancel={closeModal}
        okText="Close"
        cancelButtonProps={{ className: "hidden" }}
        centered
      >
        {wordDetails.sections ? (
          <Collapse
            defaultActiveKey={[`0-${wordDetails.sections[0]?.phonetic}`]}
            accordion
          >
            {wordDetails.sections?.map((data, sectionIndex) => (
              <Panel
                header={
                  <PanelHeader
                    data={data}
                    sectionIndex={sectionIndex}
                    partsOfSpeech={partsOfSpeech}
                  />
                }
                key={`${sectionIndex}-${data.phonetic}`}
              >
                <Collapse
                  ghost
                  accordion
                  defaultActiveKey={[`definition-0-${data.phonetic}`]}
                >
                  <Panel
                    header="Definitions"
                    key={`definition-${sectionIndex}-${data.phonetic}`}
                  >
                    <MeaningsList data={data} sectionIndex={sectionIndex} />
                  </Panel>
                  {data.synonyms.length > 0 && (
                    <Panel
                      header="Synonyms"
                      key={`synonym-${data.phonetic}${sectionIndex}`}
                    >
                      <SynonymsList data={data} sectionIndex={sectionIndex} />
                    </Panel>
                  )}
                  {data.antonyms.length > 0 && (
                    <Panel
                      header="Antonyms"
                      key={`antonym-${data.phonetic}${sectionIndex}`}
                    >
                      <AntonymsList data={data} sectionIndex={sectionIndex} />
                    </Panel>
                  )}
                </Collapse>
              </Panel>
            ))}
          </Collapse>
        ) : (
          <Spin />
        )}
      </Modal>
    </>
  );
};

export default Overlay;
