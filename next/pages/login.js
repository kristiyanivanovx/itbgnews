import styles from "../styles/Home.module.css";

function Login() {
    return (
        <form action="/" method="POST">
            <label htmlFor="name">Name</label>
            <input id="name" type="text" autoComplete="name" required/>

            <label htmlFor="password">Password</label>
            <input id="password" type="text" autoComplete="name" required/>

            <button type="submit">Login</button>
        </form>
    )
}

export default Login;
