import React from "react";
import {Link} from "react-router-dom";

function ErrorPage() {
  return (
    <div className="error-container">
      <h1>Error</h1>
      <p>Something went wrong.</p>
      <Link to="/">Go back to form</Link>
    </div>
  );
}

export default ErrorPage