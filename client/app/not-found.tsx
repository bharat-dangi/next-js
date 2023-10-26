import Link from "next/link";

const NotFound: React.FC = () => {
  return (
    <div>
      <h1>404</h1>
      <h2>Page Not Found</h2>
      <p>The page you are looking for does not exist.</p>
      <button>
        <Link href="/">Home</Link>
      </button>
    </div>
  );
};

export default NotFound;
