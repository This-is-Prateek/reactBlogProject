import React, {useState, useEffect} from 'react'
import { Container, PostCard } from '../components'
import appwriteService from "../appwrite/config";

const AllPosts = () => {
    const [posts, setPosts] = useState([])
    useEffect(() => {
        appwriteService.getPosts([]).then((posts) => {   //no query is passed so all posts are required that are active
            if (posts) {
                setPosts(posts.documents)
            }
        })
        .catch((error)=>console.log("Error getting posts",error));
    }, [])

    return (
        <div className='w-full py-8 dark:bg-gray-500'>
            <Container>
                <div className='flex flex-wrap'>
                    {posts.map((post) => (
                        <div key={post.$id} className='p-2 w-1/4'>
                            <PostCard {...post} />
                        </div>
                    ))}
                </div>
            </Container>
        </div>
    )
}

export default AllPosts
