import React, {useEffect, useState} from "react";
import {checkCredentials, generateProduct} from "../services/apiService";

function FormPage () {
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState('');
  const [error, setError] = useState('');
  const [generating, setGenerating] = useState(false);
  const [hasCredentials, setHasCredentials] = useState(null)

  useEffect(() => {
    (async () => {
      setHasCredentials(await checkCredentials());
    })()
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (!title.trim() || !price.trim()) {
      setError('Please fill in all fields.');
      return;
    }
    setGenerating(true)
    try {
      await generateProduct(title, price);
      alert('Product successfully created. Check store!');
      setTitle('');
      setPrice('');
      console.log('Form submitted:', { title, price });
    } catch (error) {
      setError(error);
      console.error(error)
    }
    finally {
      setGenerating(false)
    }
  };

  if (hasCredentials === null) {
    return (
      <div className="form-container">
        Checking settings
      </div>
    )
  }

  if (hasCredentials === false) {
    return (
      <div className="form-container">
        You need to install the application add go through authentication
      </div>
    )
  }

  return (
    <div className="form-container">
      <h1>Generate new product</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="title">Title:</label>
          <input type="text" id="title" value={title} onChange={(e) => setTitle(e.target.value)} />
        </div>
        <div className="form-group">
          <label htmlFor="price">Price:</label>
          <input type="number" id="price" value={price} onChange={(e) => setPrice(e.target.value)} />
        </div>
        {error && <p className="error">{error}</p>}
        <button type="submit" disabled={generating}>{generating ? "Generating...." : "Generate"}</button>
      </form>
    </div>
  );
}

export default FormPage;