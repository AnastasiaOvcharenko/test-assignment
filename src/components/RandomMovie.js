import React, { useEffect, useState } from "react";
import { Button, Form, Input, Space, Slider, DatePicker, Select } from "antd";
import { useNavigate, useSearchParams } from "react-router-dom";
import { fetchWithToken } from "../context/SearchProvider";
import Navbar from "./Navbar";

const { RangePicker } = DatePicker;
const formItemLayout = { labelCol: { span: 24 }, wrapperCol: { span: 24 } };
const buttonItemLayout = { wrapperCol: { span: 14 } };

function RandomMovie() {
  const navigate = useNavigate();
  const [movie, setMovie] = useState({});
  const [possibleCountries, setPossibleCountries] = useState([]);
  const [possibleGenres, setPossibleGenres] = useState([]);

  const [country, setCountry] = useState("");
  const [production, setProduction] = useState("");
  const [year, setYear] = useState("1874-2050");
  const [kpRating, setKpRating] = useState("0-10");
  const [contentType, setContentType] = useState("");
  const [genres, setGenres] = useState("");

  const [isLoading, setIsLoading] = useState(false);
  const [form] = Form.useForm();

  const marks = {
    0: 0,
    2: 2,
    4: 4,
    6: 6,
    8: 8,
    10: 10,
  };

  function onFinish({
    country,
    production,
    year,
    kpRating,
    contentType,
    genres,
  }) {
    const [minKp, maxKp] = kpRating ? kpRating : [0, 10];
    country && setCountry(country);
    production && setProduction(production);
    year && setYear(`${year[0].$y}-${year[1].$y}`);
    kpRating && setKpRating(`${minKp}-${maxKp}`);
    contentType && setContentType(contentType);
    genres && setGenres(genres);
  }

  function onReset() {
    form.resetFields();

    setCountry("");
    setProduction("");
    setYear("1874-2050");
    setKpRating("0-10");
    setContentType("");
    setGenres("");
  }

  useEffect(
    function () {
      async function fetchRandom() {
        try {
          setIsLoading(true);
          const data = await fetchWithToken(
            `v1.4/movie/random?${
              contentType ? `type=${contentType}` : ""
            }&year=${year}&rating.kp=${kpRating}&${
              genres ? `genres.name=${genres}` : ""
            }&${country ? `countries.name=${country}` : ""}&${
              production ? `networks.items.name=${production}` : ""
            }`
          );
          console.log(data);

          if (data?.id) navigate(`/movie/${data?.id}`);
        } catch (err) {
          throw new Error(err);
        } finally {
          setIsLoading(false);
        }
      }
      if (country || production || contentType || genres) fetchRandom();
    },
    [country, production, year, kpRating, contentType, genres]
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const res = await fetchWithToken(
          "v1/movie/possible-values-by-field?field=countries.name"
        );
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

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const res = await fetchWithToken(
          "v1/movie/possible-values-by-field?field=genres.name"
        );
        setPossibleGenres(res);
      } catch (err) {
        throw new Error(err);
        // setPossibleCountries([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  if (isLoading) return <h1 className="primary">Загрузка...</h1>;

  if (!isLoading)
    return (
      <>
        <Navbar />
        <div style={{ display: "flex", justifyContent: "center" }}>
          <Form
            {...formItemLayout}
            layout={"vertical"}
            form={form}
            onFinish={onFinish}
          >
            <Form.Item
              name="country"
              label={<span style={{ color: "white" }}>Страна</span>}
            >
              <Select
                style={{ width: "100%" }}
                placeholder="Выберите страну для поиска"
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
            </Form.Item>
            <Form.Item
              name="genres"
              label={<span style={{ color: "white" }}>Жанр</span>}
            >
              <Select
                style={{ width: "100%" }}
                placeholder="Выберите жанр для поиска"
                options={
                  !isLoading && possibleGenres?.length > 0
                    ? possibleGenres.map((obj) => ({
                        value: obj.name,
                        label: obj.name,
                      }))
                    : []
                }
              />
            </Form.Item>
            <Form.Item
              name="production"
              label={<span style={{ color: "white" }}>Сеть производства</span>}
            >
              <Select
                style={{ width: "100%" }}
                placeholder="Выберите сеть производства"
                options={[
                  { value: "Netflix", label: "Netflix" },
                  { value: "HBO", label: "HBO" },
                ]}
              />
            </Form.Item>
            <Form.Item
              name="contentType"
              label={<span style={{ color: "white" }}>Тип контента</span>}
            >
              <Select
                style={{ width: "100%" }}
                placeholder="Выберите тип контента"
                options={[
                  { value: "anime", label: "Аниме" },
                  { value: "cartoon", label: "Мультфильм" },
                  { value: "tv-series", label: "Сериал" },
                  { value: "movie", label: "Фильм" },
                ]}
              />
            </Form.Item>
            <Form.Item
              name="kpRating"
              label={
                <span style={{ color: "white" }}>Рейтинг на Кинопоиске</span>
              }
            >
              <Slider
                range
                min={0}
                max={10}
                defaultValue={[0, 10]}
                marks={marks}
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
        {movie?.id
          ? null
          : (country || production || contentType || genres) && (
              <h1>Фильм с такими параметрами не найден :(</h1>
            )}
      </>
    );
}

export default RandomMovie;
