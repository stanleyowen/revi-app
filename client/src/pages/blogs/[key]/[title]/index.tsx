import axios from "axios";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Button, Container, Grid } from "@mui/material";
import { ArrowBackIosRounded, EditRounded } from "@mui/icons-material";
import { Blog } from "@/components/types.util";
import BlogContent from "@/components/content.blog";

export default function Redirects() {
  const router = useRouter();
  const key = router.query?.key;
  const [blog, setBlog] = useState<Blog | null>(null);

  // Redirects further to /blogs/[key]/[title]
  useEffect(() => {
    axios
      .get(`/blogs/${key}`)
      .then((res) => setBlog(res.data))
      .catch((_) => router.push("/blogs"));
  }, [key, router]);

  return (
    <Container maxWidth="sm" sx={{ mb: 5 }}>
      <Grid container>
        <Grid item xs>
          <Button
            variant="text"
            size="small"
            onClick={() => router.push("/blogs")}
            startIcon={<ArrowBackIosRounded />}
            sx={{ mb: 3 }}
          >
            Back to blog
          </Button>
        </Grid>
        <Grid item>
          <Button
            variant="text"
            size="small"
            onClick={() => router.push(`/blog/edit/${key}`)}
            startIcon={<EditRounded />}
            sx={{ mb: 3 }}
          >
            Edit
          </Button>
        </Grid>
      </Grid>

      <BlogContent blog={blog} />
    </Container>
  );
}
