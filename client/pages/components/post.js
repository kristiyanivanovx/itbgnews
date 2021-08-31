import styles from "../../styles/Home.module.css";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faChevronUp} from "@fortawesome/free-solid-svg-icons";
import React, {Component} from "react";

class Post extends Component {
    render() {
        return (
            <div className={styles.grid}>
                <div className={styles.card}>
                    <div>
                        <a href="">
                            <h2>Title 1</h2>
                        </a>
                        <button className={"button"}>
                            <FontAwesomeIcon icon={faChevronUp} />
                        </button>
                    </div>
                    <p>Some details about this item</p>
                    <div>
                        <p>by <a href="">SomeUser</a> | <a href="">4 hours ago</a> | <a href="">100 comments</a></p>
                    </div>
                </div>
            </div>
        )
    }
}

export default Post;
