import axios from "axios";
const Api = async (url) => {
  // provent url undefined path
  if (!url) {
    return;
  }
  console.log("url ", url);
  const res = await axios.get(url);
  return res.data;
};

export default Api;

// https://archive-api.open-meteo.com/v1/archive?latitude=52.52&longitude=13.41&start_date=2026-02-13&end_date=2026-02-13&daily=weather_code&hourly=temperature_2m&timezone=Asia%2FBangkok

// https://archive-api.open-meteo.com/v1/archive?latitude=52.52&longitude=13.41&start_date=2026-02-13&end_date=2026-02-13&daily=weather_code&hourly=temperature_2m&timezone=Asia%2FSingapore

// https://archive-api.open-meteo.com/v1/archive?latitude=52.52&longitude=13.41&start_date=2026-02-13&end_date=2026-02-13&daily=weather_code&hourly=temperature_2m&timezone=Asia%2FTokyo

// https://archive-api.open-meteo.com/v1/archive?latitude=52.52&longitude=13.41&start_date=2026-02-13&end_date=2026-02-13&daily=weather_code&hourly=temperature_2m&timezone=Europe%2FLondon

// https://archive-api.open-meteo.com/v1/archive?latitude=52.52&longitude=13.41&start_date=2026-02-13&end_date=2026-02-13&daily=weather_code&hourly=temperature_2m&timezone=America%2FNew_York
