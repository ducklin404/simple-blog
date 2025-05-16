import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function ManagePosts() {
  const [data, setData] = useState([]);
  const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:8080/api/posts");
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const result = await response.json();
        setData(result);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
  useEffect(() => {
    fetchData();
  }, []);

  async function DeletePost(slug) {
    const resp = await fetch("http://localhost:8080/api/post/" + slug, {
      method: "DELETE",
    });

    if (resp.ok) {
      console.log("Post deleted successfully!");
      fetchData();
    }
  }

  return (
    <>
      <button>
        <Link to="/newpost">Add Post</Link>
      </button>
      <ul>
        {data.map((d) => (
          <li key={d.slug}>
            <Link to={`/posts/${d.slug}`}>
              <h3>{d.title}</h3>
            </Link>
            <button>
              <Link to={`/edit/${d.slug}`}>Edit Post</Link>
            </button>
            <button onClick={() => DeletePost(d.slug)}>Delete Post</button>
          </li>
        ))}
      </ul>
    </>
  );
}
