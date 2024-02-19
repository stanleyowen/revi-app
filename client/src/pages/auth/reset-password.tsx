import React, { useState } from "react";
import {
  Box,
  CssBaseline,
  TextField,
  Typography,
  Container,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { useRouter } from "next/router";
import { resetPasswordHandler } from "@/firebase/auth";

function Copyright(props: any) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"© " + new Date().getFullYear() + " Nusantara Youth Foundation"}
    </Typography>
  );
}

export default function ForgotPassword() {
  const [email, setEmail] = useState<string>("");
  const [invalidEmail, setInvalidEmail] = useState<boolean>(false);
  const [isLoading, setLoadingState] = useState<boolean>(false);
  const [success, setStatus] = useState<boolean>(false);
  const router = useRouter();

  const handleSubmit = async () => {
    setLoadingState(true);

    const { result, error }: any = await resetPasswordHandler(email);

    if (error) {
      setInvalidEmail(true);
      document.getElementById("email")?.focus();
    } else setInvalidEmail(false);
    if (result) setStatus(true);

    setLoadingState(false);
  };

  const verifyEmail = (email: string) => {
    const re = /\S+@\S+\.\S+/;

    if (re.test(email)) setInvalidEmail(false);
    else setInvalidEmail(true);
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography component="h1" variant="h5" sx={{ mb: 4 }}>
          Reset your password
        </Typography>
        {success ? (
          <>
            <Typography component="h2" variant="body1" sx={{ mb: 3 }}>
              Check your email for a link to reset your password. If it doesn’t
              appear within a few minutes, check your spam folder.
            </Typography>

            <LoadingButton
              fullWidth
              variant="outlined"
              onClick={() => router.push("/auth/login")}
            >
              Return to Login
            </LoadingButton>
          </>
        ) : (
          <>
            <Typography component="h2" variant="body1" sx={{ mb: 3 }}>
              To reset your password, enter your email below and submit. An
              email will be sent to you with instructions about how to complete
              the process.
            </Typography>

            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              error={invalidEmail}
              helperText={
                invalidEmail ? "Invalid email address. Please try again." : null
              }
              onBlur={(e) => verifyEmail(e.target.value)}
              autoComplete="email"
              autoFocus
            />

            <LoadingButton
              loading={isLoading}
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3 }}
              disabled={!email || invalidEmail}
              onClick={() => handleSubmit()}
            >
              Reset Password
            </LoadingButton>
          </>
        )}
      </Box>

      <Copyright sx={{ mt: 8, mb: 4 }} />
    </Container>
  );
}
