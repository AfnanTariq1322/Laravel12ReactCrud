import { useState } from "react";
import AppLayout from "@/layouts/app-layout";
import { Head, router, usePage } from "@inertiajs/react";
import UserFormModal from "@/components/UserFormModal";

export default function Users() {
    const { users } = usePage<{ users: { data: { id: number; name: string; email: string; created_at: string }[] } }>().props;

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);

    const openModal = (user = null) => {
        setSelectedUser(user);
        setIsModalOpen(true);
    };

    const handleDelete = (id: number) => {
        if (confirm("Are you sure you want to delete this user?")) {
            router.delete(`/users/${id}`);
        }
    };

    return (
        <AppLayout>
            <Head title="Users" />
            <div className="flex flex-1 flex-col gap-6 p-4 sm:p-6 bg-white text-black shadow-lg rounded-xl">
                <button
                    onClick={() => openModal()}
                    className="mb-4  sm:w-auto bg-green-600 text-white rounded-lg px-4 py-2 hover:bg-green-700 transition">
                    Add User
                </button>

                {/* Responsive Table Wrapper */}
                <div className="overflow-x-auto">
                    <table className="w-full min-w-max border-collapse border bg-white text-black shadow-sm rounded-lg overflow-hidden">
                        <thead>
                            <tr className="bg-gray-100 text-gray-800 border-b">
                                {["ID", "Name", "Email", "Created At", "Actions"].map((header) => (
                                    <th key={header} className="border p-3 text-left text-xs sm:text-sm font-semibold">
                                        {header}
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {users.data.length ? (
                                users.data.map(({ id, name, email, created_at }) => (
                                    <tr key={id} className="border-b hover:bg-gray-50">
                                        {[id, name, email, new Date(created_at).toLocaleDateString()].map((value, i) => (
                                            <td key={i} className="border p-3 text-gray-700 text-xs sm:text-sm">
                                                {value}
                                            </td>
                                        ))}
                                        <td className="border p-3 text-center space-y-2 sm:space-x-2 flex sm:inline-block">
                                            <button
                                                onClick={() => openModal({ id, name, email })}
                                                className="w-full sm:w-auto bg-blue-600 text-white rounded-lg px-4 py-2 hover:bg-blue-700 transition"
                                            >
                                                Edit
                                            </button>
                                            <button
                                                onClick={() => handleDelete(id)}
                                                className="w-full sm:w-auto bg-red-600 text-white rounded-lg px-4 py-2 hover:bg-red-700 transition"
                                            >
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={5} className="text-center p-4 text-gray-600">
                                        No users found.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            <UserFormModal isOpen={isModalOpen} closeModal={() => setIsModalOpen(false)} user={selectedUser} />
        </AppLayout>
    );
}
