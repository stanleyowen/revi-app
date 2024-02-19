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
  Button,
} from "@mui/material";
import { LoadingButton, TabContext, TabList, TabPanel } from "@mui/lab";
import { useRouter } from "next/router";

import { useAuthContext } from "@/firebase/auth";

export default function EditBlog() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [appointments, setAppointments] = useState<any[]>(
    JSON.parse(localStorage.getItem("appointments") ?? "[]")
  );

  const router = useRouter();
  const { user }: any = useAuthContext();

  useEffect(() => {
    if (user?.email)
      axios.get(`/admin/${user?.email}`).then((res) => {
        if (res.data?.email === user?.email && res.data?.isAdmin) {
          setIsAdmin(true);
        }
      });
    else router.push("/blogs");
  }, [user, router]);

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {isAdmin ? (
        <Button
          variant="outlined"
          color="primary"
          sx={{ mb: 2 }}
          onClick={() => router.push("/appointments/create")}
        >
          Create an Appointment
        </Button>
      ) : null}
    </Container>
  );
}
