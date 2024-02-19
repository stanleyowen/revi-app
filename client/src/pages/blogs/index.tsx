import axios from "axios";
import { useEffect, useState } from "react";
import Blogs from "@/components/post.blog";
import LatestBlog from "@/components/latest.blog";
import { useAuthContext } from "@/firebase/auth";
import { Blog } from "@/components/types.util";
import { useRouter } from "next/router";
import { Button, Container, Divider } from "@mui/material";

export default function About() {
  const [blogs, setBlogs] = useState<Blog[]>();
  const [isAdmin, setIsAdmin] = useState(false);

  const router = useRouter();
  const { user }: any = useAuthContext();

  useEffect(() => {
    axios
      .get("/blogs")
      .then((res) => setBlogs(res.data))
      .catch((err) => console.log(err));

    if (user?.email)
      axios.get(`/admin/${user?.email}`).then((res) => {
        if (res.data?.email === user?.email && res.data?.isAdmin)
          setIsAdmin(true);
      });
  }, [user]);

  return (
    <>
      <Container maxWidth="lg" sx={{ py: 4 }}>
        {isAdmin ? (
          <Button
            variant="outlined"
            color="primary"
            sx={{ mb: 2 }}
            onClick={() => router.push("/blogs/create")}
          >
            Create Post
          </Button>
        ) : null}

        {blogs?.length === 0 ? (
          <p>No blog post yet.</p>
        ) : (
          <LatestBlog blog={blogs ? blogs[0] : null} />
        )}
        <Divider sx={{ my: 5 }} />
        <Blogs blog={blogs ? blogs.slice(1) : null} />
      </Container>
    </>
  );
}
