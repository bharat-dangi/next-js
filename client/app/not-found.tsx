import Link from "next/link";
import styles from "./notFound.module.css";

const NotFound: React.FC = () => {
  return (
    <div className={styles["not-found"]}>
      <h1 className={styles["not-found-title"]}>404</h1>
      <h2 className={styles["not-found-subtitle"]}>Page Not Found</h2>
      <p className={styles["not-found-text"]}>
        The page you are looking for does not exist.
      </p>
      <button className={styles["home-button"]}>
        <Link href="/" className={styles["btn-link"]}>
          Home
        </Link>
      </button>
    </div>
  );
};

export default NotFound;
