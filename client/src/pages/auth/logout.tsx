import { useEffect } from "react";
import { useRouter } from "next/router";
import { signOutHandler } from "@/firebase/auth";

export default function SignOut() {
  const router = useRouter();

  useEffect(() => {
    const handleSignOut = async () => {
      await signOutHandler()
        .then(() => router.push("/"))
        .catch((err) => console.log(err));
    };

    handleSignOut();
  }, [router]);
}
