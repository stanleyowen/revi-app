import { Container, Typography } from "@mui/material";
import Head from "next/head";

export default function Custom500() {
  return (
    <>
      <Head>
        <title>500 - Internal Server Error</title>
      </Head>
      <Container className="align-center">
        <Typography variant="h5" sx={{ mt: 20 }}>
          500 - Internal Server Error
        </Typography>
        <Typography variant="h5">
          The server encountered an internal error and was unable to complete
          your request.
        </Typography>
      </Container>
    </>
  );
}
