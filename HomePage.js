import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./style.css";

const HomePage = () => {
  const [blogs, setBlogs] = useState([]);
  const [category, setCategory] = useState("");

  useEffect(() => {
    const fetchBlogs = async () => {
      const res = await axios.get("/api/blogs");
      setBlogs(res.data);
    };
    fetchBlogs();
  }, []);

  const filteredBlogs = category
    ? blogs.filter((blog) => blog.category === category)
    : blogs;

  return (
    <div className="home-page">
      {" "}
      {/* Apply 'home-page' class for background image */}
      <div className="container my-4">
        <h1 className="text-center mb-4">Home Page</h1>
        <div className="mb-4">
          <select
            className="form-select"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="">All Categories</option>
            <option value="character">Character</option>
            <option value="anime">Anime</option>
          </select>
        </div>
        <div className="row">
          {filteredBlogs.map((blog) => (
            <div className="col-md-4 mb-4" key={blog._id}>
              <div className="card h-100 glass">
                <img
                  src={blog.imageUrl}
                  className="card-img-top"
                  alt={blog.title}
                  style={{ height: "200px", objectFit: "cover" }}
                />
                <div className="card-body d-flex flex-column">
                  <h5 className="card-title">{blog.title}</h5>
                  <p className="card-text">
                    {blog.content.substring(0, 100)}...
                  </p>
                  <p className="card-text">
                    <strong>Category: </strong>
                    {blog.category}
                  </p>{" "}
                  {/* Display category */}
                  <Link
                    to={`/blogs/${blog._id}`}
                    className="mt-auto btn btn-primary"
                  >
                    Read More
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
