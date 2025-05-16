import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useForm } from "react-hook-form";

export default function EditPost() {
  const { slug } = useParams();
  const [post, setPost] = useState({});
  const [newPost, setNewPost] = useState("");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      slug: "",
      title: "",
      description: ""
    }
  });

  // Fetch data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:8080/api/post/" + slug);
        const result = await response.json();
        setPost(result);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [slug]);

  // Reset form when post is loaded
  useEffect(() => {
    if (post.title) {
      reset({
        slug: slug,
        title: post.title,
        description: post.description
      });
    }
  }, [post, slug, reset]);

  const onSubmit = async (data) => {
    try {
      const response = await fetch("http://localhost:8080/api/post/" + slug, {
        method: "PATCH",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      if (response.ok) {
        setNewPost("Post edited successfully!");
        window.history.pushState({}, null, "/edit/" + data.slug);
      }
      else setNewPost("Failed to edit post.");
    } catch (error) {
      console.error("Error editing data:", error);
      setNewPost("Post edited failed!");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div style={{ padding: 10 }}>
        <br />
        <span>Slug:</span>
        <br />
        <input type="text" {...register("slug", { required: true })} />
        <br />
        {errors.slug && <div style={{ color: "red" }}>Slug is required</div>}
        <span>Title:</span>
        <br />
        <input type="text" {...register("title", { required: true })} />
        <br />
        {errors.title && <div style={{ color: "red" }}>Title is required</div>}
        <span>Description:</span>
        <br />
        <input type="text" {...register("description", { required: true })} />
        <br />
        {errors.description && (
          <div style={{ color: "red" }}>Description is required</div>
        )}
        <br />
        <button type="submit">Save</button>
        <p className="text-success">{newPost}</p>
      </div>
    </form>
  );
}
