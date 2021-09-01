// import '@fortawesome/fontawesome-free/css/all.min.css';

import Landing from './landing'
import Footer from "./components/footer";
import Navbar from "./components/navbar";

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
        <Navbar />
        <Landing posts={posts} />
        <Footer />
    </div>
  )
}
