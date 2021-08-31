import Landing from './landing'
// import UsersList from './usersList'
import Footer from "./footer";
import Navbar from "./navbar";

export async function getStaticProps() {
    const res = await fetch('http://localhost:5000/api/customers');
    const users = await res.json();

    return {
        props: { users }
    }
}

export default function Home({ users }) {
  return (
    <div>
        <Navbar />
        <Landing />
        <Footer/>
    </div>
  )
}
