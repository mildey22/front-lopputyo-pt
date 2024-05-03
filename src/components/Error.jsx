import { Typography } from "@mui/material";
import { useRouteError } from "react-router-dom";

export default function Error() {
  const error = useRouteError();
  console.log(error);

  return (
    <Typography>
      <h1>Page not found</h1>
      <p>{error.data}</p>
    </Typography>
  );
}