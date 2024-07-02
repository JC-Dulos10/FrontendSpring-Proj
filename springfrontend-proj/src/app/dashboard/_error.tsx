import { NextPage } from 'next';
import Link from 'next/link';

const ErrorPage: NextPage<{ statusCode: number }> = ({ statusCode }) => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="max-w-lg w-full p-6 bg-white rounded shadow-md text-center">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">Error {statusCode}</h1>
        <p className="text-gray-600">An error occurred.</p>
        <p className="text-gray-600 mb-4">Please click the button below to return to the login page.</p>
        <Link href="/login">
          <a className="bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500">
            Go to Login
          </a>
        </Link>
      </div>
    </div>
  );
};

ErrorPage.getInitialProps = ({ res, err }) => {
  let statusCode = 500; // Default status code for error

  if (res) {
    // Server-side rendering
    statusCode = res.statusCode;
  } else if (err) {
    // Client-side rendering
    statusCode = err.statusCode || 500;
  }

  return { statusCode };
};

export default ErrorPage;
