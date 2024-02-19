import React, { useState, useEffect, SyntheticEvent } from "react";
import axios from "axios";
import { Box, Tab, CssBaseline, Container } from "@mui/material";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import { useRouter } from "next/router";

import BlogForm from "@/components/form.blog";
import { useAuthContext } from "@/firebase/auth";
import { Blog } from "@/components/types.util";
import BlogContent from "@/components/content.blog";

export default function EditBlog() {
  const [isLoading, setStatus] = useState<boolean>(true);
  const [tabValue, setTabValue] = useState<string>("create");
  const [data, setData] = useState<Blog>({
    title: "",
    description: "",
    content: "",
    thumbnail: "",
    author: {
      name: "",
      profilePicture: "",
    },
  });

  const router = useRouter();
  const key = router.query?.key;
  const { user }: any = useAuthContext();

  const handleTabChange = (_: SyntheticEvent, newValue: string) =>
    setTabValue(newValue);

  useEffect(() => {
    if (user?.email)
      axios.get(`/admin/${user?.email}`).then((res) => {
        if (res.data?.email === user?.email && res.data?.isAdmin) {
          axios
            .get(`/blogs/${key}`)
            .then((res) => {
              setData(res.data);
              console.log(res.data);
            })
            .catch((_) => router.push("/blogs"));
        } else router.push("/blogs");
      });
    else router.push("/blogs");
  }, [user, router]);

  return (
    <Container>
      <TabContext value={tabValue}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <TabList value={0} onChange={handleTabChange}>
            <Tab label="Create" value="create" />
            <Tab label="Preview" value="preview" />
          </TabList>

          <TabPanel value="create">
            <BlogForm blog={data} setBlog={setData} />
          </TabPanel>

          <TabPanel value="preview">
            <Container maxWidth="sm">
              <BlogContent blog={data} />
            </Container>
          </TabPanel>
        </Box>
      </TabContext>
    </Container>
  );
}
