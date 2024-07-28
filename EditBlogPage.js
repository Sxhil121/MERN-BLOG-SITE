import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import "./style.css"; // Importing the CSS file for custom styles

const EditBlogPage = () => {
  const [title, setTitle] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState(""); // Add state for category
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBlog = async () => {
      const res = await axios.get(`/api/blogs/${id}`);
      setTitle(res.data.title);
      setImageUrl(res.data.imageUrl);
      setContent(res.data.content);
      setCategory(res.data.category); // Set the category state
    };
    fetchBlog();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.put(`/api/blogs/${id}`, { title, imageUrl, content, category });
    navigate(`/blogs/${id}`);
  };

  return (
    <div className="edit-blog-container">
      <h1>Edit Blog</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Title</label>
          <input
            type="text"
            className="form-control"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Image URL</label>
          <input
            type="text"
            className="form-control"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Content</label>
          <textarea
            className="form-control"
            rows="5"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
          ></textarea>
        </div>
        <div className="mb-3">
          <label className="form-label">Category</label>
          <select
            className="form-control"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
          >
            <option value="">Select Category</option>
            <option value="character">Character</option>
            <option value="anime">Anime</option>
          </select>
        </div>
        <button type="submit" className="btn btn-primary me-2">
          Submit
        </button>
        <button
          type="button"
          className="btn btn-secondary"
          onClick={() => navigate(-1)}
        >
          Cancel
        </button>
      </form>
    </div>
  );
};

export default EditBlogPage;
