import React from "react";
import {
  Card,
  CardContent,
  CardHeader,
  Typography,
  Grid,
  IconButton,
} from "@mui/material";
import { RemoveCircle } from "@mui/icons-material";
import useStore from "../../store/useStore";
import WeatherIcon from "./WeatherIcon";
import { Link } from "react-router-dom";

const WeatherCard = ({ data }) => {
  const { removeCity, tempUnit } = useStore((state) => ({
    removeCity: state.removeCity,
    tempUnit: state.tempUnit,
  }));

  return (
    <Card sx={{ minWidth: 275, margin: 2 }}>
      <CardHeader
        title={data.name}
        action={
          <IconButton onClick={() => removeCity(data.name)} aria-label="Remove">
            <RemoveCircle />
          </IconButton>
        }
      />
      <Link
        to={`/cities/${data.name}?lat=${data.coord.lat}&lon=${data.coord.lon}`}
        style={{ textDecoration: "none" }}
      >
        <CardContent>
          <Typography variant="body1" color="text.secondary" gutterBottom>
            Current Temperature: {data[tempUnit].current}°{tempUnit}
          </Typography>
          <Typography variant="body1" color="text.secondary" gutterBottom>
            High: {data[tempUnit].high}°{tempUnit}
          </Typography>
          <Typography variant="body1" color="text.secondary" gutterBottom>
            Low: {data[tempUnit].low}°{tempUnit}
          </Typography>
          <Grid container spacing={1}>
            <Grid item>
              <WeatherIcon code={data.weather.icon} />
            </Grid>
            <Grid item>
              <Typography variant="body1" color="text.secondary" gutterBottom>
                {data.weather.description}
              </Typography>
            </Grid>
          </Grid>
        </CardContent>
      </Link>
    </Card>
  );
};

export default WeatherCard;
