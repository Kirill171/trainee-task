import { Link } from 'react-router-dom';

export default function NotFoundPage() {
  return (
    <section className="flex justify-center items-center h-full">
      <div className="flex flex-col text-center">
        <h1 className="text-4xl font-bold">Page Not Found</h1>
        <Link to="/" className="text-2xl text-blue-900 underline font-medium">
          Back to Home
        </Link>
      </div>
    </section>
  );
}
