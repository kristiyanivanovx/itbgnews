export const getStaticProps = async () => {
    const baseUrl = 'https://jsonplaceholder.typicode.com/users';

    const res = await fetch('https://jsonplaceholder.typicode.com/users');
    const data = await res.json();

    return {
        props: { users: data }
    }
}

const Users = ({ users }) => {
    return (
        <div>
            <h1>All users</h1>
            {users.map(user => (
                <div key={user.id}>
                    <a>
                        <h3>{user.name}</h3>
                    </a>
                </div>
            ))}
        </div>
    )
}

export default Users;
