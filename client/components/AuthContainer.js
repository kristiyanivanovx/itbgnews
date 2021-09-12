
import React, { Component } from 'react';
import styles from '../styles/Auth.module.css';

class AuthContainer extends Component {
    render() {
        return (
            <div className={styles.generic__container}>
                {this.props.children}
            </div>
        );
    }
}

import React from 'react';
import styles from '../styles/Auth.module.css';

const AuthContainer = ({ children }) => {
    return <div className={styles.auth__container}>{children}</div>;
};

export default AuthContainer;
