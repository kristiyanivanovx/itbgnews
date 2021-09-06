import React, { Component } from 'react';
import styles from '../styles/Articles.module.css';

class Articles extends Component {
    render() {
        return <main className={styles.articles}>{this.props.children}</main>;
    }
}

export default Articles;
