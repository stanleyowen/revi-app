import { LoadingButton } from "@mui/lab";
import {
  Container,
  Box,
  Typography,
  Divider,
  TextField,
  Grid,
  Link,
} from "@mui/material";
import { Blog } from "./types.util";
import {
  useEffect,
  useState,
  FormEvent,
  ChangeEvent,
  PropsWithChildren,
} from "react";
import axios from "axios";
import { useRouter } from "next/router";

export default function BlogForm(
  props: PropsWithChildren<{
    blog: Blog;
    setBlog: (blog: Blog) => void;
  }>
) {
  const [isLoading, setLoadingState] = useState<boolean>(true);
  const { blog, setBlog } = props;
  const router = useRouter();

  useEffect(() => {
    if (props.blog) setBlog(props.blog);
    setLoadingState(false);
  }, [props.blog, setBlog]);

  const handleDataChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    setBlog({ ...blog, [name]: value });
  };

  const handleCreateBlog = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoadingState(true);

    axios
      .post("/blogs", blog)
      .then((res) => router.push(`/blogs/${res.data?.data?.key}`))
      .catch((err) => console.log(err));

    setLoadingState(false);
  };

  return (
    <Box component="form" onSubmit={handleCreateBlog} noValidate sx={{ mt: 1 }}>
      <Typography component="h1" variant="h5" sx={{ mb: 1 }}>
        Create Blog
      </Typography>

      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="title"
            label="Title"
            name="title"
            value={blog?.title}
            onChange={handleDataChange}
            autoFocus
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            margin="normal"
            required
            fullWidth
            value={blog?.thumbnail}
            name="thumbnail"
            label="Thumbnail"
            id="thumbnail"
            onChange={handleDataChange}
            helperText="A link to the thumbnail image"
          />
        </Grid>
      </Grid>

      <TextField
        margin="normal"
        required
        fullWidth
        value={blog?.description}
        name="description"
        label="Description"
        id="description"
        onChange={handleDataChange}
        multiline
        helperText="A short description of the blog post (max 200 characters)"
      />

      <TextField
        margin="normal"
        fullWidth
        required
        id="content"
        label="Content"
        name="content"
        value={blog?.content}
        onChange={handleDataChange}
        multiline
        helperText="Styling with Markdown is supported"
      />

      <LoadingButton
        loading={isLoading}
        type="submit"
        fullWidth
        variant="contained"
        sx={{ mt: 4, mb: 2 }}
        disabled={isLoading}
      >
        Create
      </LoadingButton>
    </Box>
  );
}
