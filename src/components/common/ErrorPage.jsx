import React from 'react';

function ErrorPage() {
  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <img
        src="./404_error_lost_in_space-removebg-preview.webpf"
        loading="lazy"
        alt="Error page"
      />
    </div>
  );
}
export default React.memo(ErrorPage);
