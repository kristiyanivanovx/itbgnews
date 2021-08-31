function UsersList({ users }) {
    return (
        <div>
            <h1>All users</h1>
            <ul>
                {users.map((user) => (
                    <li key={user.id}>
                        {user.firstName}&nbsp;-&nbsp;{user.lastName}
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default UsersList;
