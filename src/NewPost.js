import { useState } from "react";
import { useForm } from "react-hook-form";

export default function NewPost() {
  const [newPost, setNewPost] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = async (data) => {
    const post = JSON.stringify(data);
    try {
      const response = await fetch("https://2czd7l-8080.csb.app/api/post", {
        method: "post",
        headers: {
          Accept: "application /json",
          "Content-Type": "application/json",
        },
        body: post,
      });
      if (response.ok) setNewPost("Post created successfully!");
    } catch (error) {
      console.error("Error creating data:", error);
      setNewPost("Post created failed!");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div style={{ padding: 10 }}>
        {" "}
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
        <button type="submit">Add New</button>
        <p className="text-success">{newPost}</p>
      </div>
    </form>
  );
}
