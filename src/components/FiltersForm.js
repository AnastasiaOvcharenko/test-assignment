import React, { useEffect, useState } from "react";
import { Button, Form, Space, Slider, DatePicker, Select } from "antd";
import { useSearchParams } from "react-router-dom";
import { fetchWithToken } from "../context/SearchProvider";

const { RangePicker } = DatePicker;
const formItemLayout = { labelCol: { span: 24 }, wrapperCol: { span: 24 } };
const buttonItemLayout = { wrapperCol: { span: 14 } };

// const [yearFilter, setYearFilter] = useState();

function FiltersForm() {
  let [searchParams, setSearchParams] = useSearchParams();
  const [possibleCountries, setPossibleCountries] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [form] = Form.useForm();

  const marks = {
    0: <label style={{ color: "white" }}>0</label>,
    6: <label style={{ color: "white" }}>6</label>,
    12: <label style={{ color: "white" }}>12</label>,
    16: <label style={{ color: "white" }}>16</label>,
    18: <label style={{ color: "white" }}>18</label>,
  };

  function onFinish({ country, ageRating, yearPicker }) {
    const [minAge, maxAge] = ageRating ? ageRating : [0, 18];
    setSearchParams({
      year: yearPicker ? `${yearPicker[0].$y}-${yearPicker[1].$y}` : "",
      country: country ? country : "",
      ageRating: `${minAge}-${maxAge}`,
    });

    // yearPicker &&
    //   searchParams.set("year", `${yearPicker[0].$y}-${yearPicker[1].$y}`);
    // country && searchParams.set("country", country);
    // searchParams.set("ageRating", `${minAge}-${maxAge}`);
    searchParams.delete("query");
  }

  function onReset() {
    form.resetFields();
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const res = await fetchWithToken(
          "v1/movie/possible-values-by-field?field=countries.name"
        );
        // console.log(res);
        setPossibleCountries(res);
      } catch (err) {
        throw new Error(err);
        // setPossibleCountries([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  // console.log(possibleCountries);

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
          name="country"
          label={<span style={{ color: "white" }}>Страны</span>}
        >
          {/* <Col span={24}> */}
          <Select
            // mode="tags"
            style={{ width: "100%" }}
            placeholder="Выберите страны для поиска"
            options={
              !isLoading && possibleCountries?.length > 0
                ? possibleCountries.map((obj) =>
                    // <Select.Option value={obj.name}>{obj.name}</Select.Option>

                    ({
                      value: obj.name,
                      label: obj.name,
                    })
                  )
                : []
            }
          />
          {/* </Col> */}
        </Form.Item>
        <Form.Item
          name="ageRating"
          label={<span style={{ color: "white" }}>Возраст</span>}
        >
          <Slider
            range
            min={0}
            max={18}
            defaultValue={[0, 18]}
            marks={marks}
            style={{ color: "white" }}
          />
        </Form.Item>
        <Form.Item
          name="year"
          label={<span style={{ color: "white" }}>Год</span>}
        >
          <RangePicker
            style={{ width: "100%" }}
            picker="year"
            id={{
              start: "startYear",
              end: "endYear",
            }}
            placeholder={["От", "До"]}
          />
        </Form.Item>
        {/* <Form.Item
          name="country"
          label={
            <span style={{ color: "white" }}>
              Страна (пример: "Россия", "!Франция" , "+Великобритания")
            </span>
          }
        >
          <Input />
        </Form.Item> */}
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
