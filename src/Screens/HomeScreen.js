import { useState } from "react";
import ActionButtons from "../components/ActionButtons";
import DataTable from "../components/DataTable/DataTable";
import Layout from "../components/Layout/Layout";
import Modal from "../components/Overlay/Modal";

function HomeScreen() {
  const [modalIsShown, setModalIsShown] = useState(false);

  const toggleModalHandler = () => {
    setModalIsShown((currentState) => !currentState);
  };

  const submitHandler = (data) => {
    console.log(data);
    toggleModalHandler();
  };

  return (
    <Layout>
      <ActionButtons toggleModal={toggleModalHandler} />
      <DataTable />

      {modalIsShown && (
        <Modal onClose={toggleModalHandler} onSubmit={submitHandler} />
      )}
    </Layout>
  );
}

export default HomeScreen;
