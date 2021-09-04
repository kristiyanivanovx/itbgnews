import styles from '../styles/Example.module.css';

export default function Example() {
    return (
        <div className={styles.searchBar}>
            <div className={styles.rectangle}>
                <input className={styles.text} />
            </div>
        </div>
    );
}
