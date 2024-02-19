import Image from "next/image";
import { Avatar, Divider, Stack, Typography } from "@mui/material";
import { Blog } from "./types.util";
import Markdown from "@/components/markdown.blog";

export default function BlogContent(
  props: React.PropsWithChildren<{ blog: Blog | null }>
) {
  const { blog } = props;

  return (
    <>
      <Typography variant="caption" component="h4" color="text.secondary">
        {new Date(blog?.properties?.createdAt || Date.now()).toLocaleDateString(
          "en-US",
          {
            year: "numeric",
            month: "short",
            day: "numeric",
          }
        )}
      </Typography>
      <Typography variant="h4" component="h1" gutterBottom color="primary">
        {blog?.title}
      </Typography>

      <Stack
        direction="row"
        spacing={1}
        sx={{ mt: 1, mb: 5 }}
        alignItems="center"
      >
        <Avatar
          sx={{ width: 26, height: 26 }}
          src={
            blog?.author?.profilePicture || "https://source.unsplash.com/random"
          }
        />
        <Typography variant="caption" color="text.secondary">
          {blog?.author?.name}
        </Typography>
        <Divider orientation="vertical" flexItem />
        <Typography variant="caption" color="text.secondary">
          {blog?.properties?.estimatedReadTime} min read
        </Typography>
      </Stack>

      <Image
        src={blog?.thumbnail || "https://source.unsplash.com/random?blog"}
        alt={blog?.title || "Blog thumbnail"}
        width={700}
        height={400}
        style={{ marginBottom: "2rem" }}
        className="blog-headerImg"
      />

      <Markdown>{blog?.content || ""}</Markdown>
    </>
  );
}
