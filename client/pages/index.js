// import '@fortawesome/fontawesome-free/css/all.min.css';


import Landing from './landing'
import Footer from "./components/footer";
import Navbar from "./components/navbar";
import { Fragment } from "react";
// import UsersList from './usersList'

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
        <Landing/>
        <Footer/>
        {/*<UsersList users={users} />*/}
    </div>
  )
}
