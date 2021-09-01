import Landing from '../components/Landing'
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import HeadComponent from "../components/HeadComponent";
import React from "react";

export const getStaticProps = async () => {
    const result = await fetch(`http://localhost:5000/api/posts`)
    const data = await result.json();

    return {
        props: { posts: data },
    }
}

export default function Home({ posts }) {
  return (
    <div>
        <HeadComponent currentPageName={"Index"}/>
        <Navbar />
        <Landing posts={posts} />
        <Footer />
    </div>
  )
}
