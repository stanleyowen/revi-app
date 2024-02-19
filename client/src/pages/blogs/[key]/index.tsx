import axios from "axios";
import { useEffect } from "react";
import { useRouter } from "next/router";

export default function Redirects() {
  const router = useRouter();
  const key = router.query?.key;
  // Redirects further to /blogs/[key]/[title]
  useEffect(() => {
    axios
      .get(`/blogs/${key}`)
      .then((res) =>
        router.push(
          `/blogs/${key}/${res.data.title
            .toLocaleLowerCase()
            .replace(/[\W_]+/g, "-")}`
        )
      )
      .catch((_) => router.push("/blogs"));
  }, [key, router]);

  return <></>;
}
