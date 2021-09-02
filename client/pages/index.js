import Landing from './landing'
import Footer from "./footer";
import Navbar from "./navbar";
// import UsersList from './usersList'

// export async function getStaticProps() {
//     const res = await fetch('http://localhost:5000/api/customers');
//     const users = await res.json();
//
//     return {
//         props: { users }
//     }
// }

export default function Home( ) {
  return (
    <div>
        <Navbar />
        <Landing />
        <Footer/>
    </div>
  )
}
