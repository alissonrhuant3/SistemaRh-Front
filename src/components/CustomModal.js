import React from "react";
import { Modal, Space } from "antd";

const CustomModal = (props) => {
  const { open, hideModal, performAction, title } = props;
  return (
    <Modal
      title="Confirmação"
      open={open}
      onOk={performAction}
      onCancel={hideModal}
      okText="Sim"
      cancelText="Cancelar"
    >
      <p>{title}</p>
    </Modal>
  );
};

export default CustomModal;
