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
                } else router.push("/blogs");
            });
        else router.push("/blogs");
    }, [user, router]);

    return (
        <Container maxWidth="lg" sx={{ py: 4 }}>
            {/* {blogs?.length === 0 ? (
                <p>No blog post yet.</p>
            ) : (
                <LatestBlog blog={blogs ? blogs[0] : null} />
            )}
            <Divider sx={{ my: 5 }} />
            <Blogs blog={blogs ? blogs.slice(1) : null} /> */}
        </Container>
    );
}
