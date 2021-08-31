import styles from "../../styles/Home.module.css";
import Image from "next/image";

export default function Footer() {
    return (
        <footer className={styles.footer}>
            {new Date().getFullYear().toString()} • IT-BG News • {' '}

            {/*<span className={styles.logo}>*/}
            {/*    <Image src="/pepe.bmp"*/}
            {/*           alt="pepe"*/}
            {/*           width={100} height={100} />*/}
            {/*</span>*/}
        </footer>
    )
}
