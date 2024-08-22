import Alert from "./Alert";
import Confirm from "./Confirm";
import Modals from "./Modals";
import Viewer from "./Viewer";

const ModalProvider = () => {
  return (
    <>
      <Alert/>
      <Confirm/>
      <Modals/>
      <Viewer/>
    </>
  );
};

export default ModalProvider;
