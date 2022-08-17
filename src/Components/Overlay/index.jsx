import React, { useEffect, useState } from "react";
import "./Overlay.scss";
import { DICTIONARY_URL } from "../../constants";
import { fetchData } from "../../util";
import { serializeWordDefinition } from "../../serializers";
import { notification } from "antd";
import { Modal } from "antd";
import { Collapse } from "antd";
import { Typography } from "antd";
import { Tag } from "antd";
import { Spin } from "antd";

const { Text } = Typography;
const { Panel } = Collapse;

const Overlay = ({ word, setIsModalVisible, isModalVisible }) => {
  const [wordDetails, setWordDetails] = useState({});
  const [partOfSpeechArray, setPartOfSpeechArray] = useState([]);

  useEffect(() => {
    const getWordDefinition = async () => {
      const url = DICTIONARY_URL + word;
      let { succeeded, response } = await fetchData(url);
      if (succeeded) {
        let simplifiedResponse = serializeWordDefinition(response);
        let partOfSpeechArrayTemp = [];
        simplifiedResponse?.sections?.forEach((data) => {
          let partOfSpeechArrayEachSection = [];
          data?.definitions.forEach((each) =>
            partOfSpeechArrayEachSection.push(each.partOfSpeech)
          );
          partOfSpeechArrayTemp.push(partOfSpeechArrayEachSection);
        });
        setPartOfSpeechArray(partOfSpeechArrayTemp);
        setWordDetails(simplifiedResponse);
      } else {
        setIsModalVisible(false);
        notification.error({
          message: "Error",
          description: "Word not found!",
        });
      }
    };
    getWordDefinition();
  }, []);

  const closeModal = () => {
    setIsModalVisible(false);
    document.querySelector(".ant-dropdown-menu").classList.remove("hidden");
  };

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
            defaultActiveKey={[wordDetails.sections[0]?.phonetic + "0"]}
            accordion
          >
            {wordDetails.sections?.map((data, sectionIndex) => (
              <Panel
                header={
                  <div className="main-collapse-title">
                    {data.phonetic}
                    <div>
                      {partOfSpeechArray[sectionIndex].map(
                        (partOfSpeech, partOfSpeechIndex) => (
                          <Tag
                            color="#777"
                            key={
                              sectionIndex + partOfSpeech + partOfSpeechIndex
                            }
                          >
                            {partOfSpeech}
                          </Tag>
                        )
                      )}
                    </div>
                  </div>
                }
                key={data.phonetic + sectionIndex}
              >
                <Collapse
                  ghost
                  accordion
                  defaultActiveKey={["definition-" + data.phonetic + "0"]}
                >
                  <Panel
                    header="Definitions"
                    key={"definition-" + data.phonetic + sectionIndex}
                  >
                    <div className="list-of-meanings">
                      {data?.definitions.map((definition, definitionIndex) => {
                        return (
                          <ol
                            key={"definition-" + sectionIndex + definitionIndex}
                          >
                            <Text keyboard>{definition.partOfSpeech}</Text>
                            {definition?.meanings.map(
                              (meaning, meaningIndex) => (
                                <li
                                  key={
                                    "meaning-" +
                                    sectionIndex +
                                    definitionIndex +
                                    meaningIndex
                                  }
                                >
                                  {meaning}
                                </li>
                              )
                            )}
                          </ol>
                        );
                      })}
                    </div>
                  </Panel>
                  {data.synonyms.length > 0 && (
                    <Panel
                      header="Synonyms"
                      key={"synonym-" + data.phonetic + sectionIndex}
                    >
                      <ol className="list-of-meanings">
                        {data?.synonyms.map((synonym, synonymIndex) => (
                          <li
                            key={sectionIndex + "synonym" + synonymIndex}
                            ckey={sectionIndex + "synonym" + synonymIndex}
                          >
                            {synonym}
                          </li>
                        ))}
                      </ol>
                    </Panel>
                  )}
                  {data.antonyms.length > 0 && (
                    <Panel
                      header="Antonyms"
                      key={"antonym-" + data.phonetic + sectionIndex}
                    >
                      <ol className="list-of-meanings">
                        {data?.antonyms.map((antonym, antonymIndex) => (
                          <li
                            key={sectionIndex + "antonym" + antonymIndex}
                            ckey={sectionIndex + "antonym" + antonymIndex}
                          >
                            {antonym}
                          </li>
                        ))}
                      </ol>
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
