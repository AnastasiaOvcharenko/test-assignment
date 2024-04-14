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
          style={{ height: "45vh" }}
          title={
            <>
              <p>
                {review.title?.slice(0, 38)}
                {review.title?.length > 38 && "..."}
              </p>
              <strong>Автор: {review.author}</strong>
            </>
          }
          bordered={false}
        >
          <p style={{ width: "100%" }}>{review.review.slice(0, 225)}... </p>
          <Button type="link" onClick={showModal}>
            Показать полностью
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
