import styles from "../styles/Layout.module.css";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faChevronUp} from "@fortawesome/free-solid-svg-icons";
import React, {Component} from "react";

const Post = ({ data }) => {
    return (
        <div key={data.id} className={styles.grid}>
            <div className={styles.card}>
                <button className={`button ${styles.btnTransparent}`}>
                    <FontAwesomeIcon icon={faChevronUp} />
                </button>

                <span>{' '}{data.upvotesCount}{' '}points</span>
                {/* todo: if user has voted -> display unvote button */}

                <a href={data.fullURL}>
                    <h2>{data.title} <span className={styles.shortURL}>({data.shortURL})</span></h2>
                </a>

                <div>
                    by <a href="">{data.creatorUsername}</a> | <a href="">{data.dateCreated}</a> | <a href="">{data.commentsCount} comments</a>
                </div>
            </div>
        </div>
    )
}

export default Post;
