import React from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'

import { getPosts, getPostDetails } from '../../services'

import { PostDetail, Categories, PostWidget, Author, Comments, CommentsForm, Loader } from '../../components'

const PostDetails = ({ post }) => {
    const router = useRouter();

    if (router.isFallback) {
        return <Loader />
    }
    return (
        <>
            <Head>
                <title>{post.title}</title>
            </Head>
            <div className='container mx-auto px-10 mb-8'>
                <div className='pb-8 w-full'>
                    <div className='col-span-1 lg:col-span-8'>
                        <PostDetail post={post} />
                        <Author author={post.author} />
                        <CommentsForm slug={post.slug} />
                        <Comments slug={post.slug} />
                    </div>
                    <div className='w-full'>
                        <div className='relative lg:sticky top-8'>
                            <PostWidget slug={post.slug} categories={post.categories.map((category) => category.slug)} />
                            <Categories />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default PostDetails

export async function getStaticProps({ params }) {
    const data = await getPostDetails(params.slug);

    return {
        props: { post: data }
    }
}

export async function getStaticPaths() {
    const posts = await getPosts()

    return {
        paths: posts.map(({ node: { slug } }) => ({ params: { slug } })),
        fallback: true,
    }
}