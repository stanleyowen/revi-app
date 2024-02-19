import React, { useState, FormEvent } from "react";
import {
  Box,
  Grid,
  Divider,
  CssBaseline,
  TextField,
  Typography,
  Container,
} from "@mui/material";
import { Google } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import {
  signInWithGoogleHandler,
  signInWithEmailAndPasswordHandler,
} from "@/firebase/auth";
import { useRouter } from "next/router";
import Link from "next/link";

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

export default function SignIn() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [invalidEmail, setInvalidEmail] = useState<boolean>(false);
  const [invalidAuth, setInvalidAuth] = useState<boolean>(false);
  const [isLoading, setLoadingState] = useState<boolean>(false);
  const router = useRouter();

  const handleSignIn = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoadingState(true);

    const { result, error }: any = await signInWithEmailAndPasswordHandler(
      email,
      password
    );

    if (error) {
      if (error.code === "auth/invalid-email") setInvalidEmail(true);
      else {
        setInvalidEmail(false);
        setInvalidAuth(true);
      }
      document.getElementById("email")?.focus();
      setLoadingState(false);
    } else if (result) return router.push("/");
  };

  const handleGoogleSignIn = async () => {
    setLoadingState(true);
    const { result, error } = await signInWithGoogleHandler();

    if (!result || error) setLoadingState(false);
    else return router.push("/");
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
        <Typography component="h1" variant="h5">
          Sign in to Nusantara Youth Foundation
        </Typography>

        <LoadingButton
          fullWidth
          variant="outlined"
          sx={{ mt: 4, mb: 2 }}
          loading={isLoading}
          startIcon={<Google />}
          onClick={() => handleGoogleSignIn()}
        >
          Sign in with Google
        </LoadingButton>

        <Divider>or</Divider>

        <Box component="form" onSubmit={handleSignIn} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email address"
            name="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            error={invalidEmail || invalidAuth}
            helperText={
              invalidEmail
                ? "Please enter a valid email address."
                : invalidAuth
                ? "Invalid email or password. Please try again."
                : null
            }
            autoComplete="email"
            autoFocus
          />

          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            label="Password"
            type="password"
            id="password"
            error={invalidAuth}
            helperText={
              invalidAuth
                ? "Invalid email or password. Please try again."
                : null
            }
            autoComplete="current-password"
          />

          <Grid container>
            <Grid item xs>
              <Link href="/auth/reset-password" className="link">
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <Typography variant="body2">
                  New to Nusantara Youth Foundation?&nbsp;
                </Typography>
                <Link href="/auth/get-started" className="link">
                  Join here
                </Link>
              </Box>
            </Grid>
          </Grid>

          <LoadingButton
            loading={isLoading}
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 4, mb: 2 }}
            disabled={!password || !email}
          >
            Sign In
          </LoadingButton>
        </Box>
      </Box>

      <Copyright sx={{ mt: 8, mb: 4 }} />
    </Container>
  );
}
