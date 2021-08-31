import styles from "../../styles/Home.module.css";

export default function Footer() {
    return (
        <footer className={styles.footer}>
            <div>
                {new Date().getFullYear().toString()} •
                IT-BG News&nbsp;
            </div>
            <div>
                <a href="https://github.com/IT-BG/itbgnews">• Open Source System</a>
            </div>

            {/*<span className={styles.logo}>*/}
            {/*    <Image src="/pepe.bmp"*/}
            {/*           alt="pepe"*/}
            {/*           width={100} height={100} />*/}
            {/*</span>*/}
        </footer>
    )
}
