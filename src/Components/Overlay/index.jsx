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
        console.log(simplifiedResponse);
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

  useEffect(() => {
    console.log(partOfSpeechArray);
  }, [partOfSpeechArray]);

  const closeModal = () => {
    setIsModalVisible(false);
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
        <Collapse accordion>
          {wordDetails ? (
            wordDetails?.sections?.map((data, index) => (
              <Panel
                header={
                  <div className="main-collapse-title">
                    {data.phonetic}
                    <div>
                      {partOfSpeechArray[index].map((data) => (
                        <Tag color="#777">{data}</Tag>
                      ))}
                    </div>
                  </div>
                }
                key={data.phonetic + index}
              >
                <Collapse ghost>
                  <Panel header="Definitions" key={"1" + data.phonetic + index}>
                    <div className="list-of-meanings">
                      {data?.definitions.map((each) => {
                        return (
                          <ol>
                            <Text keyboard>{each.partOfSpeech}</Text>
                            {each?.meanings.map((desc, index) => (
                              <li key={desc + index}>{desc}</li>
                            ))}
                          </ol>
                        );
                      })}
                    </div>
                  </Panel>
                  {data.synonyms.length > 0 && (
                    <Panel header="Synonyms" key={"2" + data.phonetic + index}>
                      <ol className="list-of-meanings">
                        {data?.synonyms.map((each, index) => (
                          <li key={each + index}>{each}</li>
                        ))}
                      </ol>
                    </Panel>
                  )}
                  {data.synonyms.length > 0 && (
                    <Panel header="Antonyms" key={"3" + data.phonetic + index}>
                      <ol className="list-of-meanings">
                        {data?.antonyms.map((each, index) => (
                          <li key={each + index}>{each}</li>
                        ))}
                      </ol>
                    </Panel>
                  )}
                </Collapse>
              </Panel>
            ))
          ) : (
            <div>Data Loading...</div>
          )}
        </Collapse>
      </Modal>
    </>
  );
};

export default Overlay;
