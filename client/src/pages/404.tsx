import { Container, Typography } from "@mui/material";
import Head from "next/head";

export default function Custom404() {
  return (
    <>
      <Head>
        <title>404 - Page Not Found</title>
      </Head>
      <Container className="align-center">
        <Typography variant="h5" sx={{ mt: 20 }}>
          404 - Page Not Found
        </Typography>
        <Typography variant="h5">
          The page you are looking for does not exist.
        </Typography>
      </Container>
    </>
  );
}
