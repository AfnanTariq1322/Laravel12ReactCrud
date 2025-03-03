import { useState } from "react";
import { Head, router, usePage } from "@inertiajs/react";
import PostFormModal from "@/components/PostFormModal";
import AppLayout from "@/layouts/app-layout";

export default function Posts() {
  const { posts } = usePage<{ posts: { id: number; title: string; content: string; picture?: string }[] }>().props;

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);

  const openModal = (post = null) => {
    setSelectedPost(post);
    setIsModalOpen(true);
  };

  const handleDelete = (id: number) => {
    router.delete(`/posts/${id}`, {
      onSuccess: () => {
        router.reload();
      },
      onError: () => {
        console.error("Failed to delete post.");
      },
    });
  };

  return (
    <AppLayout>
      <Head title="Posts" />

      <div className="flex flex-col gap-6 p-6 bg-white text-black shadow-lg rounded-xl">
        <div className="flex justify-end">
          <button onClick={() => openModal()} className="bg-green-600 text-white rounded px-3 py-1 text-sm hover:bg-green-700 transition">
            Add Post
          </button>
        </div>

        <table className="w-full border-collapse bg-white text-black shadow-sm rounded-lg">
          <thead>
            <tr className="bg-gray-100 text-gray-800 border-b">
              {["Picture", "Title", "Content", "Actions"].map((header) => (
                <th key={header} className="border p-3 text-left">{header}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {posts.length ? (
              posts.map((post) => (
                <tr key={post.id} className="border-b">
                  <td className="p-3">
                    {post.picture ? <img src={post.picture} alt="Post" className="w-16 h-16 object-cover rounded-full" /> : "No Picture"}
                  </td>
                  <td className="p-3">{post.title}</td>
                  <td className="p-3">{post.content}</td>
                  <td className="p-3 flex gap-2">
                    <button onClick={() => openModal(post)} className="bg-blue-500 text-sm text-white px-3 py-1 rounded">Edit</button>
                    <button onClick={() => handleDelete(post.id)} className="bg-red-500 text-sm text-white px-3 py-1 rounded">Delete</button>
                  </td>
                </tr>
              ))
            ) : (
              <tr><td colSpan={4} className="text-center p-4 text-gray-600">No posts found.</td></tr>
            )}
          </tbody>
        </table>
      </div>

      <PostFormModal isOpen={isModalOpen} closeModal={() => setIsModalOpen(false)} post={selectedPost} />
    </AppLayout>
  );
}



























