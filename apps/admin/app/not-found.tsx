export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[500px] px-6">
      <h1 className="text-4xl font-bold mb-4">404 – Page Not Found</h1>
      <p className="text-lg text-gray-600 mb-8">
        Sorry, the page you were looking for could not be found.
      </p>
      <a
        href="/"
        className="inline-block px-5 py-2 bg-black text-white rounded hover:bg-gray-800 transition"
      >
        Go back home
      </a>
    </div>
  );
}
