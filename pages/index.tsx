import type { NextPage } from 'next'
import Head from 'next/head'

import { getPosts } from '../services'

import { PostCard, Categories, PostWidget } from '../components'
import { FeaturedPosts } from '../sections'

const Home: NextPage = ({ posts }) => {
  return (
    <div className="container mx-auto px-10 mb-8">
      <Head>
        <title>Shivesh's Blog</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <h1 className='mb-4 text-3xl font-semibold ml-5'>Feeds</h1>
      <FeaturedPosts />

        <h1 className='mb-4 text-3xl font-semibold ml-2 pt-8'>Posts</h1>
      <div className='grid grid-cols-1 lg:grid-cols-12 gap-12'>
        <div className='lg:col-span-8 col-span-1'>
          {posts ?
            posts.reverse().map((post) => <PostCard post={post.node} key={post.title} />)
            : ('No Posts Found')}
        </div>

        <div className="lg:col-span-4 col-span-1">
          <div className='lg:sticky relative top-8'>
            <PostWidget />
            <Categories />
          </div>
        </div>
      </div>

    </div>
  )
}

export async function getStaticProps() {
  const posts = (await getPosts()) || [];

  return {
    props: { posts }
  }
}

export default Home
