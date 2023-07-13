import React from "react";
import { TextField } from "@mui/material";
import { usePlacesWidget } from "react-google-autocomplete";
import { useGetCurrentForecast } from "../../api/weather-forecast/currentWeatherGetApi";
import useStore from "../../store/useStore";
import { getApiKeyGoogleAutocomplete } from "../../utils/environment";
import { styled } from "@mui/material/styles";

const AddCity = () => {
  const addCity = useStore((state) => state.addCity);

  const handleAdd = async (place) => {
    const city = await useGetCurrentForecast(
      place.geometry.location.lat(),
      place.geometry.location.lng()
    );
    addCity(city);
  };

  const { ref: materialRef } = usePlacesWidget({
    apiKey: getApiKeyGoogleAutocomplete(),
    onPlaceSelected: (place) => {
      handleAdd(place);
      materialRef.current.value = "";
    },
    language: "en",
  });

  return (
    <StyledTextField
      color="secondary"
      variant="outlined"
      inputRef={materialRef}
      placeholder="Add a City"
    />
  );
};
AddCity;
export default AddCity;

const StyledTextField = styled(TextField)(
  () => `
    width: 400px;
  `
);
