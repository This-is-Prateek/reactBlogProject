import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import appwriteService from "../appwrite/config";
import { Button, Container } from "../components";
import parse from "html-react-parser";
import { useSelector } from "react-redux";

const Post = () => {
    const [post, setPost] = useState(null);
    const { slug } = useParams();
    const navigate = useNavigate();
    const [isAuthor, setIsAuthor] = useState(false);
    const [loading, setLoader] = useState(true);
    const userData = useSelector((state) => state.auth.userData);

    useEffect(() => {
        if (slug) {
            // Fetch the post and check if the current user is the author
            appwriteService.getPost(slug).then((post) => {
                if (post) {
                    setPost(post);
                    setLoader(false);
                } else {
                    navigate("/");
                }
            });
        } else {
            navigate("/");
        }
    }, [slug, navigate]);

    // Check if the user is the author once post and userData are available
    useEffect(() => {
        if (post && userData) {
            setIsAuthor(post.userId === userData.$id);
        }
        console.log(userData);
        
    }, [post, userData]);

    const deletePost = () => {
        appwriteService.deletePost(post.$id).then((status) => {
            if (status) {
                appwriteService.deleteFile(post.featuredImg);
                navigate("/");
            }
        });
    };

    if (loading || !post) {
        return <div>...loading</div>
    }

    return post ? (
        <div className="py-8 dark:bg-gray-500 dark:text-white">
            <Container>
                <div className="w-full flex justify-center mb-4 relative border rounded-xl p-2 dark:bg-gray-800">
                    <img
                        src={appwriteService.getFilePreview(post.featuredImg)}
                        alt={post.title}
                        className="rounded-xl"
                    />

                    {userData && isAuthor && (
                        <div className="absolute right-6 top-6">
                            <Link to={`/edit-post/${post.$id}`}>
                                <Button bgColor="bg-green-500" className="mr-3">
                                    Edit
                                </Button>
                            </Link>
                            <Button bgColor="bg-red-500" onClick={deletePost}>
                                Delete
                            </Button>
                        </div>
                    )}
                </div>
                <div className="w-full mb-6">
                    <h1 className="text-2xl font-bold text-center">{post.title}</h1>
                </div>
                <div className="browser-css text-center">
                    {parse(post.content)}
                </div>
            </Container>
        </div>
    ) : null;
}

export default Post
