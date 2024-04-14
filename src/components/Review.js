import React, { useEffect, useState } from "react";
import { Card, Col, Button, Modal } from "antd";
import useWindow from "../hooks/useWindow";

function Review({ review, limit }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  return (
    <>
      <Col span={24 / limit} key={review.id}>
        <Card
          style={{ height: "50vh" }}
          title={
            <div style={{ margin: "1.2rem" }}>
              <div style={{ overflow: "hidden" }}>
                <p>{review.title}</p>
              </div>
              <strong>Автор: {review.author}</strong>
            </div>
          }
          bordered={false}
        >
          <div style={{ width: "100%", height: "24vh", overflow: "hidden" }}>
            <p>{review.review}... </p>
          </div>
          <Button type="link" onClick={showModal}>
            Показать отзыв полностью
          </Button>
        </Card>
      </Col>

      <Modal
        title={review.title}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <p>{review.review}</p>
      </Modal>
    </>
  );
}

export default Review;
