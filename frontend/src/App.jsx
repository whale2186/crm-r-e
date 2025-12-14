import { useState, useEffect } from "react";
import axios from "axios";
import Fuse from "fuse.js";
import "bootstrap/dist/css/bootstrap.min.css";

const API = import.meta.env.VITE_API_URL + "/customers";

function App() {
  const [customers, setCustomers] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [form, setForm] = useState({ name: "", email: "", phone: "", company: "", notes: "" });
  const [editId, setEditId] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [search, setSearch] = useState("");

  useEffect(() => {
    getCustomers();
  }, []);

  useEffect(() => {
    if (!search.trim()) {
      setFiltered(customers);
      return;
    }
    const fuse = new Fuse(customers, {
      keys: ["name", "email", "company", "phone", "notes"],
      threshold: 0.4
    });
    const results = fuse.search(search);
    setFiltered(results.map((r) => r.item));
  }, [search, customers]);

  const getCustomers = async () => {
    try {
      const res = await axios.get(API);
      setCustomers(res.data);
      setFiltered(res.data);
    } catch {}
  };

  const openNewModal = () => {
    setForm({ name: "", email: "", phone: "", company: "", notes: "" });
    setEditId(null);
    setShowModal(true);
  };

  const openEditModal = (cust) => {
    setForm(cust);
    setEditId(cust._id);
    setShowModal(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email) return;
    try {
      if (editId) await axios.put(`${API}/${editId}`, form);
      else await axios.post(API, form);
      setShowModal(false);
      getCustomers();
    } catch {}
  };

  const handleDelete = async (id) => {
    if (!confirm("Delete this customer?")) return;
    try {
      await axios.delete(`${API}/${id}`);
      getCustomers();
    } catch {}
  };

  return (
    <div className="container mt-4">
      <h3>CRM Application</h3>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <input
          className="form-control w-50"
          placeholder="Search..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button className="btn btn-primary" onClick={openNewModal}>
          +
        </button>
      </div>
      <table className="table table-bordered table-striped">
        <thead className="table-light">
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Company</th>
            <th>Notes</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {filtered.length === 0 ? (
            <tr>
              <td colSpan="6" className="text-center">
                No customers found
              </td>
            </tr>
          ) : (
            filtered.map((c) => (
              <tr key={c._id}>
                <td>{c.name}</td>
                <td>{c.email}</td>
                <td>{c.phone}</td>
                <td>{c.company}</td>
                <td>{c.notes}</td>
                <td>
                  <button className="btn btn-sm btn-outline-secondary me-2" onClick={() => openEditModal(c)}>
                    Edit
                  </button>
                  <button className="btn btn-sm btn-outline-danger" onClick={() => handleDelete(c._id)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      {showModal && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            background: "rgba(0,0,0,0.5)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center"
          }}
        >
          <div className="bg-white p-3 rounded" style={{ width: "350px" }}>
            <h5>{editId ? "Edit Customer" : "New Customer"}</h5>
            <form onSubmit={handleSubmit}>
              <input
                className="form-control my-1"
                placeholder="Name"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                required
              />
              <input
                className="form-control my-1"
                placeholder="Email"
                type="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                required
              />
              <input
                className="form-control my-1"
                placeholder="Phone"
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
              />
              <input
                className="form-control my-1"
                placeholder="Company"
                value={form.company}
                onChange={(e) => setForm({ ...form, company: e.target.value })}
              />
              <input
                className="form-control my-1"
                placeholder="Notes"
                value={form.notes}
                onChange={(e) => setForm({ ...form, notes: e.target.value })}
              />
              <div className="d-flex justify-content-end mt-2">
                <button type="submit" className="btn btn-success me-2">
                  {editId ? "Update" : "Add"}
                </button>
                <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
