import { useState, useEffect, useCallback, useMemo } from "react";
import axios from "axios";
import { getFiveDaysData } from "../../utils/transformData";
import {
  getBaseUrlFiveDaysForcast,
  getApiKeyOpenWeather,
} from "../../utils/environment";

export const useGetFiveDaysForecast = (lat, lon, tempUnits) => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  const fetchData = useCallback(async () => {
    try {
      const response = await axios.get(getBaseUrlFiveDaysForcast(), {
        params: {
          lat: lat,
          lon: lon,
          units: tempUnits,
          appid: getApiKeyOpenWeather(),
        },
      });

      const transformedData = getFiveDaysData(response.data.list);
      setData(transformedData);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      setIsError(true);
      window.alert("An error occurred while fetching the five days forecast."); // Display the error message as a window alert
    }
  }, [lat, lon, tempUnits]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const memoizedData = useMemo(
    () => ({ data, isLoading, isError }),
    [data, isLoading, isError]
  );

  return memoizedData;
};
