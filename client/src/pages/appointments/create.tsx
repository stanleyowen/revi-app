import React, {
  useState,
  useEffect,
  FormEvent,
  ChangeEvent,
  PropsWithChildren,
} from "react";
import axios from "axios";
import {
  Box,
  Tab,
  CssBaseline,
  Container,
  Typography,
  Divider,
  TextField,
  Grid,
  Link,
  FormControl,
  Select,
  MenuItem,
  InputLabel,
  SelectChangeEvent,
} from "@mui/material";
import { LoadingButton, TabContext, TabList, TabPanel } from "@mui/lab";
import { useRouter } from "next/router";

import BlogForm from "@/components/form.blog";
import { useAuthContext } from "@/firebase/auth";
import BlogContent from "@/components/content.blog";

export default function EditBlog() {
  const [isLoading, setStatus] = useState<boolean>(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [data, setData] = useState<any>({
    countryCode: 62,
    phone: 81234567890,
    address: "Jl. LetKol Martinus No.7, Pusat Ps., Kec. Medan Kota",
    city: "Medan",
    region: "Sumatera Utara",
    country: "Indonesia",
    postalCode: 20232,
    treatmentType: "Heart checkup",
    additionalInfo: "",
  });

  const router = useRouter();
  const key = router.query?.key;
  const { user }: any = useAuthContext();

  const handleDataChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    setData({ ...data, [name]: value });
  };

  const handleDataSelect = (select: SelectChangeEvent) => {
    const { name, value } = select.target;
    console.log(select.target);
    setData({ ...data, [name]: value });
  };

  useEffect(() => {
    if (user?.email)
      axios.get(`/admin/${user?.email}`).then((res) => {
        if (res.data?.email === user?.email && res.data?.isAdmin) {
          setIsAdmin(true);
          setStatus(false);
        } else router.push("/blogs");
      });
    else router.push("/blogs");
  }, [user, router]);

  const handleCreateAppointment = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus(true);

    if (typeof window !== "undefined") {
      const data = JSON.parse(localStorage.getItem("appointments") || "[]");
      localStorage.setItem("appointments", JSON.stringify([...data, data]));
    }
    setStatus(false);
    router.push("/appointments");
  };

  return (
    <Box
      component="form"
      onSubmit={handleCreateAppointment}
      noValidate
      sx={{ mt: 1 }}
    >
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Typography component="h1" variant="h5" sx={{ mb: 1 }}>
          Create an Appointment
        </Typography>

        <Grid container spacing={2}>
          <Grid item xs={12} sm={4}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="first-name"
              label="First"
              name="first-name"
              value="Sarah"
              disabled
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="middle-name"
              label="Middle"
              name="middle-name"
              value="Jessica"
              disabled
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="last-name"
              label="Last"
              name="last-name"
              value="Parker"
              disabled
            />
          </Grid>
        </Grid>

        <Grid container spacing={2}>
          <Grid item xs={3} sm={1}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="country-code"
              label="Code"
              name="countryCode"
              value={data?.countryCode}
              onChange={handleDataChange}
              type="number"
              disabled={!isAdmin}
            />
          </Grid>
          <Grid item xs={9} sm={5}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="phone"
              label="Phone"
              name="phone"
              value={data?.phone}
              onChange={handleDataChange}
              type="number"
              disabled={!isAdmin}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="birth-date"
              label="Date of Birth"
              name="birth-date"
              value="14 / 01 / 2006"
              disabled
            />
          </Grid>
        </Grid>

        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="address"
              label="Address"
              name="address"
              value={data?.address}
              onChange={handleDataChange}
              disabled={!isAdmin}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="city"
              label="City"
              name="city"
              value={data?.city}
              onChange={handleDataChange}
              disabled={!isAdmin}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="region"
              label="Region"
              name="region"
              value="North Sumatera"
              disabled={!isAdmin}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="postal-code"
              label="Postal Code"
              name="postalCode"
              value={data?.postalCode}
              onChange={handleDataChange}
              disabled={!isAdmin}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="country"
              label="Country"
              name="country"
              value={data?.country}
              onChange={handleDataChange}
              disabled={!isAdmin}
            />
          </Grid>
        </Grid>

        <Grid container>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Age</InputLabel>
            <Select
              id="treatmentType"
              value={data?.treatmentType}
              label="Treatment Type"
              name="treatmentType"
              onChange={handleDataSelect}
            >
              <MenuItem value={"Heart checkup"}>Heart checkup</MenuItem>
              <MenuItem value={"Cervix checkup"}>Cervix checkup</MenuItem>
              <MenuItem value={"Eye checkup"}>Eye checkup</MenuItem>
              <MenuItem value={"Hearing test"}>Hearing test</MenuItem>
              <MenuItem value={"Others"}>Others</MenuItem>
            </Select>
          </FormControl>
        </Grid>

        <TextField
          margin="normal"
          fullWidth
          required
          id="additionalInfo"
          label="Additional Comments"
          name="additionalInfo"
          value={data?.additionalInfo}
          onChange={handleDataChange}
          multiline
          disabled={!isAdmin}
        />

        <LoadingButton
          loading={isLoading}
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 4, mb: 2 }}
          disabled={isLoading}
        >
          Make Appointment
        </LoadingButton>
      </Container>
    </Box>
  );
}
