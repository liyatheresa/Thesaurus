import React, { useEffect, useState } from "react";
import "./Overlay.scss";
import { DICTIONARY_URL } from "../../constants";
import { fetchData } from "../../util";
import { notification } from "antd";
import { Modal } from "antd";
import { Collapse } from "antd";

const { Panel } = Collapse;

const Overlay = ({ word, setIsModalVisible, isModalVisible }) => {
  const [definitions, setDefinition] = useState([]);
  const [meaningsArray, setMeaningsArray] = useState([]);

  useEffect(() => {
    const getWordDefinition = async () => {
      const url = DICTIONARY_URL + word;
      // let arrayOfMeanings = [];
      let numberOfDefinitionObjects = 0;
      let { succeeded, response } = await fetchData(url);
      if (succeeded) {
        // response.map((data) => {
        //   return data.meanings.map((each) =>
        //     each.definitions.map((desc) =>
        //       arrayOfMeanings.push(desc.definition)
        //     )
        //   );
        // });
        // setDefinition(arrayOfMeanings);
        setMeaningsArray(response);
        console.log(meaningsArray);
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
          {meaningsArray.map((data, index) => (
            <Panel header={data.phonetic} key={data.phonetic + index}>
              <Collapse ghost>
                <Panel header="Definitions" key={"1" + data.phonetic}>
                  <ol className="list-of-meanings">
                    {data.meanings.map((each) =>
                      each.definitions.map((desc) => (
                        <li key={desc.definition}>{desc.definition}</li>
                      ))
                    )}
                  </ol>
                </Panel>
                <Panel header="Synonyms" key={"2" + data.phonetic}>
                  <p>Data Loading..</p>
                </Panel>
                <Panel header="Antonyms" key={"3" + data.phonetic}>
                  <p>Data Loading..</p>
                </Panel>
              </Collapse>
            </Panel>
          ))}
        </Collapse>
      </Modal>
    </>
  );
};

export default Overlay;
