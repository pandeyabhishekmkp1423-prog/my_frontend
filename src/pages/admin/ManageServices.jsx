// src/pages/admin/ManageServices.jsx
import React, { useEffect, useState } from "react";
import API from "../../api";

const ManageServices = () => {
  const [services, setServices] = useState([]);
  const [error, setError] = useState("");
  const [form, setForm] = useState({ name: "", description: "", price: "", duration: "" });
  const [editingId, setEditingId] = useState(null);

  const fetchServices = async () => {
    try {
      const res = await API.get("/admin/services");
      setServices(res.data);
    } catch (err) {
      console.error(err);
      setError("Failed to fetch services.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        const res = await API.put(`/admin/services/${editingId}`, form);
        setServices(services.map(s => (s._id === editingId ? res.data : s)));
      } else {
        const res = await API.post("/admin/services", form);
        setServices([...services, res.data]);
      }
      setForm({ name: "", description: "", price: "", duration: "" });
      setEditingId(null);
    } catch (err) {
      console.error(err);
      alert("Failed to save service.");
    }
  };

  const handleEdit = (service) => {
    setForm(service);
    setEditingId(service._id);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure?")) return;
    try {
      await API.delete(`/admin/services/${id}`);
      setServices(services.filter(s => s._id !== id));
    } catch (err) {
      console.error(err);
      alert("Failed to delete service.");
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  if (error) return <p className="text-red-600 text-center mt-8">{error}</p>;

  return (
    <div className="min-h-screen p-8 bg-gray-50">
      <h1 className="text-3xl font-bold mb-8 text-center text-gray-800">
        Manage Services
      </h1>

      <form onSubmit={handleSubmit} className="mb-8 max-w-2xl mx-auto bg-white p-6 rounded-xl shadow space-y-4">
        <input
          type="text"
          placeholder="Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          className="w-full border px-3 py-2 rounded"
          required
        />
        <input
          type="text"
          placeholder="Description"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
          className="w-full border px-3 py-2 rounded"
          required
        />
        <input
          type="number"
          placeholder="Price"
          value={form.price}
          onChange={(e) => setForm({ ...form, price: e.target.value })}
          className="w-full border px-3 py-2 rounded"
          required
        />
        <input
          type="text"
          placeholder="Duration"
          value={form.duration}
          onChange={(e) => setForm({ ...form, duration: e.target.value })}
          className="w-full border px-3 py-2 rounded"
        />
        <button type="submit" className="bg-purple-600 text-white px-6 py-2 rounded hover:bg-purple-700 transition">
          {editingId ? "Update Service" : "Add Service"}
        </button>
      </form>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow rounded-xl">
          <thead>
            <tr className="bg-purple-600 text-white">
              <th className="py-3 px-6">Name</th>
              <th className="py-3 px-6">Description</th>
              <th className="py-3 px-6">Price</th>
              <th className="py-3 px-6">Duration</th>
              <th className="py-3 px-6 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {services.map((s) => (
              <tr key={s._id} className="border-b">
                <td className="py-3 px-6">{s.name}</td>
                <td className="py-3 px-6">{s.description}</td>
                <td className="py-3 px-6">₹{s.price}</td>
                <td className="py-3 px-6">{s.duration}</td>
                <td className="py-3 px-6 text-center space-x-2">
                  <button
                    onClick={() => handleEdit(s)}
                    className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600 transition"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(s._id)}
                    className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 transition"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
            {services.length === 0 && (
              <tr>
                <td colSpan="5" className="py-4 text-center text-gray-500">
                  No services found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageServices;
