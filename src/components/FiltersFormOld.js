import React from "react";
import { Button, Form, Input, Select, Space } from "antd";

const { Option } = Select;

const layout = {
  labelCol: { span: 16 },
  wrapperCol: { span: 8 },
};

const tailLayout = {
  wrapperCol: { offset: 8, span: 4 },
};

function FiltersForm() {
  const [form] = Form.useForm();

  function onFinish() {
    console.log(values);
  }

  function onReset() {
    form.resetFields();
  }

  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <Form
        {...layout}
        form={form}
        name="control-hooks"
        onFinish={onFinish}
        style={{ maxWidth: "100vw", backgroundColor: "#ececec" }}
      >
        <Form.Item name="year" label="Год (пример: 1874, !2020, 2020-2024)">
          <Input />
        </Form.Item>
        <Form.Item
          name="country"
          label='Страна (пример: "Россия", "!Франция" , "+Великобритания")'
        >
          <Input />
        </Form.Item>
        <Form.Item name="ageRating" label="Возраст (пример: 12, !18, 12-18)">
          <Input />
        </Form.Item>

        <Form.Item {...tailLayout}>
          <Space>
            <Button type="primary" htmlType="submit">
              Применить
            </Button>
            <Button htmlType="button" onClick={onReset}>
              Очистить
            </Button>
          </Space>
        </Form.Item>
      </Form>
    </div>
  );
}

export default FiltersForm;
