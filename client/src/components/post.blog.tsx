import Link from "next/link";
import {
  Avatar,
  Card,
  CardContent,
  CardMedia,
  Chip,
  Grid,
  Stack,
  Typography,
} from "@mui/material";
import { Blog } from "./types.util";

export default function LatestBlog(
  props: React.PropsWithChildren<{ blog: Blog[] | null }>
) {
  const blogs = props.blog || [];

  return (
    <Grid container spacing={4}>
      {blogs.map((blog) => {
        const link = `blogs/${blog?.key}/${blog?.title
          .toLocaleLowerCase()
          .replace(/[\W_]+/g, "-")}`;

        return (
          <Grid item xs={12} md={4} key={blog?.key}>
            <Link href={link}>
              <Card className="blog-card">
                <CardMedia
                  component="img"
                  height="180"
                  image={
                    blog?.thumbnail || "https://source.unsplash.com/random?blog"
                  }
                  className="blog-img"
                />
                <CardContent>
                  <Chip
                    size="small"
                    label={new Date(
                      blog?.properties?.createdAt || Date.now()
                    ).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                    color="primary"
                    variant="outlined"
                    className="inline-flex"
                    sx={{ mb: 1, fontSize: "0.6125rem", height: "20px" }}
                  />

                  <Typography gutterBottom variant="h5" component="div">
                    {blog?.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {blog?.description}
                  </Typography>

                  <Stack
                    direction="row"
                    spacing={1}
                    sx={{ mt: 2, mb: -1.5 }}
                    alignItems="center"
                  >
                    <Avatar
                      src={
                        blog?.author?.profilePicture ||
                        "https://source.unsplash.com/random?profile"
                      }
                      sx={{ width: 24, height: 24 }}
                    />
                    <Typography variant="caption" color="text.secondary">
                      {blog?.author?.name} |{" "}
                      {blog?.properties?.estimatedReadTime} min read
                    </Typography>
                  </Stack>
                </CardContent>
              </Card>
            </Link>
          </Grid>
        );
      })}
    </Grid>
  );
}
