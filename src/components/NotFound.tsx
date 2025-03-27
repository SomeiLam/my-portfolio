const NotFound = () => {
  return (
    <div className="flex flex-col justify-center items-center py-14 gap-10">
      <h1 className="text-6xl">404</h1>
      <div className="flex flex-col justify-center items-center gap-2">
        <p className="text-lg">Oops! This page doesn't exist.</p>
        <a href="/my-portfolio" className="underline hover:font-semibold">
          Go back home
        </a>
      </div>
    </div>
  );
};

export default NotFound;
