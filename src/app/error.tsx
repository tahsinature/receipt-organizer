"use client";

const Error = ({ error, reset }: { error: Error; reset: () => void }) => {
  return (
    <>
      <div>{error.message}</div>
      <button onClick={reset}>Reset</button>
    </>
  );
};

export default Error;
