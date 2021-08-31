import styles from "../styles/Home.module.css";
import Image from "next/image";

export default function Footer() {
    return (
        <footer className={styles.footer}>
            <a
                href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
                target="_blank"
                rel="noopener noreferrer"
            >
                {new Date().getFullYear().toString()} • Hacker News Clone • IT-BG{' '}
                <span className={styles.logo}>
                    {/*<Image src="/pepe.bmp"*/}
                    {/*       alt="pepe hacker"*/}
                    {/*       width={100} height={100} />*/}
                </span>
            </a>
        </footer>
    )
}
