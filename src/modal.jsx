import React, { useState } from "react";
import { Modal, Input, Button } from "antd";

const NameModal = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [name, setName] = useState("");

  const showModal = () => setIsModalOpen(true);
  const handleOk = () => {
    console.log("Имя сохранено:", name);
    setIsModalOpen(false);
  };
  const handleCancel = () => setIsModalOpen(false);

  return (
    <div>
      <Button type="primary" onClick={showModal}>
        Открыть модалку
      </Button>
      <Modal
        title="Введите имя"
        open={isModalOpen}
        onOk
        onCancel={handleCancel}
      >
        <Input
          placeholder="Введите имя"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </Modal>
    </div>
  );
};

export default NameModal;
