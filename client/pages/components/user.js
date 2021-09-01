import React from "react";

const User = ({ data }) => {
    return (
        <li key={data.id}>
            #{data.id} - {data.firstName} {data.lastName} ({data.commentsCount} comments)
        </li>
    )
}

export default User;
