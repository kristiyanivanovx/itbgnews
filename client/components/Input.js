// import styles from '../styles/Input.module.css';

export default function Input({ type, name, placeholder }) {
    return (
        <input
            type={type}
            name={name}
            placeholder={placeholder}
            // onChange={(e) => setUsername(e.target.value)}
        />
    );
}
