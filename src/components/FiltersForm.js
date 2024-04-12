import React, { useEffect, useState } from "react";
import { Button, Form, Input, Space } from "antd";
import { useNavigate, useSearchParams } from "react-router-dom";
import { getToken } from "../env";

const formItemLayout = { labelCol: { span: 24 }, wrapperCol: { span: 24 } };
const buttonItemLayout = { wrapperCol: { span: 14 } };

// const [yearFilter, setYearFilter] = useState();

function FiltersForm() {
  let [searchParams, setSearchParams] = useSearchParams();
  const [form] = Form.useForm();

  useEffect(
    function () {
      const url = `https://api.kinopoisk.dev/v1.4/movie?page=1&limit=10${
        searchParams.get("year") ? `&year=${searchParams.get("year")}` : ""
      }${
        searchParams.get("ageRating")
          ? `&ageRating=${searchParams.get("ageRating")}`
          : ""
      }${
        searchParams.get("country")
          ? `&country=${searchParams.get("country")}`
          : ""
      }`;

      // console.log(url);

      const fetchSearch = async function () {
        // dispatch({ type: "loading" });
        try {
          const res = await fetch(url, {
            method: "GET",
            headers: {
              "X-API-KEY": getToken(),
            },
          });
          const data = await res.json();
          console.log(data);
        } catch {}
      };
      fetchSearch();
    },
    [searchParams]
  );

  function onFinish({ year, country, ageRating }) {
    // if (year) setSearchParams("year", `${year}`);
    // if (country) setSearchParams("country", country);
    // if (ageRating) setSearchParams("ageRating", ageRating);
    // navigator(
    //   `?year=${year ? year : ""}&country=${country ? country : ""}&ageRating=${
    //     ageRating ? ageRating : ""
    //   }`
    // );

    setSearchParams({
      year: year ? year : "",
      country: country ? country : "",
      ageRating: ageRating ? ageRating : "",
    });
  }

  function onReset() {
    form.resetFields();
  }

  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <Form
        {...formItemLayout}
        layout={"vertical"}
        form={form}
        onFinish={onFinish}
        // style={{
        //   maxWidth: 600,
        // }}
      >
        {/* <p>Год (пример: 1874, !2020, 2020-2024)</p> */}
        <Form.Item
          name="year"
          label={
            <span style={{ color: "white" }}>
              Год (пример: 1874, !2020, 2020-2024)
            </span>
          }
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="country"
          label={
            <span style={{ color: "white" }}>
              Страна (пример: "Россия", "!Франция" , "+Великобритания")
            </span>
          }
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="ageRating"
          label={
            <span style={{ color: "white" }}>
              Возраст (пример: 12, !18, 12-18)
            </span>
          }
        >
          <Input />
        </Form.Item>

        <Form.Item
          {...buttonItemLayout}
          style={{ display: "flex", justifyContent: "center" }}
        >
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
