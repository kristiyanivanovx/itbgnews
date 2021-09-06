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

export default AuthContainer;
