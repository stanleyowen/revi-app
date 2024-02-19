import Link from "next/link";
import Image from "next/image";
import { Blog } from "./types.util";
import { useRouter } from "next/router";
import { Grid, Typography, Chip, Button, Stack, Avatar } from "@mui/material";

export default function LatestBlog(
  props: React.PropsWithChildren<{ blog: Blog | null }>
) {
  const { blog } = props;
  const router = useRouter();
  const link = `blogs/${blog?.key}/${blog?.title
    .toLocaleLowerCase()
    .replace(/[\W_]+/g, "-")}`;

  return (
    <>
      <Grid container spacing={5}>
        <Grid item xs={12} md={7}>
          <Link href={link} className="blog-img">
            <figure>
              <Image
                src={
                  blog?.thumbnail || "https://source.unsplash.com/random?blog"
                }
                alt="blog"
                width={500}
                height={500}
                className="blog-headerImg"
              />
            </figure>
          </Link>
        </Grid>

        <Grid item xs={12} md={5} sx={{ my: "auto" }}>
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
            sx={{ mb: 1 }}
          />

          <Typography variant="h4" component="h4" gutterBottom>
            {blog?.title}
          </Typography>
          <Typography
            variant="body1"
            component="p"
            gutterBottom
            sx={{ mb: 2 }}
            align="justify"
          >
            {blog?.description}
          </Typography>

          <Button
            size="small"
            color="primary"
            variant="contained"
            className="inline-flex"
            onClick={() => router.push(link)}
          >
            Read More
          </Button>

          <Stack direction="row" spacing={1} sx={{ mt: 4 }} alignItems="center">
            <Avatar
              sx={{ width: 24, height: 24 }}
              src={
                blog?.author?.profilePicture ||
                "https://source.unsplash.com/random"
              }
            />
            <Typography variant="caption" color="text.secondary">
              {blog?.author?.name} | {blog?.properties?.estimatedReadTime} min
              read
            </Typography>
          </Stack>
        </Grid>
      </Grid>
    </>
  );
}
