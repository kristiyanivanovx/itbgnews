import styles from '../styles/Footer.module.css';

export default function Footer() {
    return (
        <footer className={styles.footer}>
            {new Date().getFullYear()} • IT-BG News •{' '}
            <a href="https://github.com/IT-BG/itbgnews">Open Source System</a>
        </footer>
    );
}
