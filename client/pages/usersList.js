import styles from "../styles/Home.module.css";

function UsersList({ users }) {
    return (
        <div>
            <h1  className={styles.title}>All users</h1>
            <ul>
                {users.map((user) => (
                    <li key={user.id}>
                        {user.id} - {user.firstName} - {user.lastName}
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default UsersList;
