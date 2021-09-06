import React, { Component } from 'react';
import styles from '../styles/Auth.module.css';

class Form extends Component {
    render() {
        return (
            <div className={styles.generic__input}>{this.props.children}</div>
        );
    }
}

export default Form;
