"use client";

import React, { useState, useEffect } from "react";

export default function AdminDashboard() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passwordInput, setPasswordInput] = useState("");
  const [loginError, setLoginError] = useState("");

  const [activeTab, setActiveTab] = useState<"bookings" | "kundali">("bookings");
  const [bookings, setBookings] = useState<any[]>([]);
  const [kundaliList, setKundaliList] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  // Check login state on mount
  useEffect(() => {
    const isAuth = sessionStorage.getItem("admin_authenticated");
    if (isAuth === "true") {
      setIsAuthenticated(true);
      fetchData();
    }
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError("");

    try {
      const res = await fetch("/api/admin/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password: passwordInput }),
      });
      const data = await res.json();

      if (data.success) {
        sessionStorage.setItem("admin_authenticated", "true");
        setIsAuthenticated(true);
        fetchData();
      } else {
        setLoginError(data.message || "Galat password!");
      }
    } catch {
      setLoginError("Server se sampark nahi ho saka.");
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem("admin_authenticated");
    setIsAuthenticated(false);
  };

  // Fetch all Bookings & Kundali Data
  const fetchData = async () => {
    setLoading(true);
    try {
      const [resB, resK] = await Promise.all([
        fetch("/api/bookings"),
        fetch("/api/kundali"),
      ]);
      const dataB = await resB.json();
      const dataK = await resK.json();

      if (dataB.success) setBookings(dataB.data || []);
      if (dataK.success) setKundaliList(dataK.data || []);
    } catch (err) {
      console.error("Data fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  // Update Status handler
  const handleStatusChange = async (id: string, newStatus: string, type: "bookings" | "kundali") => {
    try {
      const endpoint = type === "bookings" ? `/api/bookings/${id}` : `/api/kundali/${id}`;
      const res = await fetch(endpoint, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ paymentStatus: newStatus }),
      });
      const data = await res.json();

      if (data.success) {
        if (type === "bookings") {
          setBookings((prev) =>
            prev.map((b) => (b._id === id ? { ...b, paymentStatus: newStatus } : b))
          );
        } else {
          setKundaliList((prev) =>
            prev.map((k) => (k._id === id ? { ...k, paymentStatus: newStatus } : k))
          );
        }
      }
    } catch (err) {
      alert("Status update nahi ho saka.");
    }
  };

  // Delete Item handler
  const handleDelete = async (id: string, type: "bookings" | "kundali") => {
    if (!confirm("Kya aap sach me ise delete karna chahte hain?")) return;

    try {
      const endpoint = type === "bookings" ? `/api/bookings/${id}` : `/api/kundali/${id}`;
      const res = await fetch(endpoint, { method: "DELETE" });
      const data = await res.json();

      if (data.success) {
        if (type === "bookings") {
          setBookings((prev) => prev.filter((b) => b._id !== id));
        } else {
          setKundaliList((prev) => prev.filter((k) => k._id !== id));
        }
      }
    } catch (err) {
      alert("Delete karne me dikkat aayi.");
    }
  };

  // Stats Calculations
  const totalRevenue = bookings
    .filter((b) => b.paymentStatus === "Completed")
    .reduce((acc, curr) => acc + (curr.amount || 0), 0);

  const pendingBookingsCount = bookings.filter((b) => b.paymentStatus === "Pending").length;
  const completedBookingsCount = bookings.filter((b) => b.paymentStatus === "Completed").length;

  // Filter list by Search & Status
  const filteredBookings = bookings.filter((item) => {
    const matchesSearch =
      item.customerName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.mobile?.includes(searchTerm) ||
      item.serviceName?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "All" || item.paymentStatus === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const filteredKundali = kundaliList.filter((item) => {
    const matchesSearch =
      item.fullName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.mobile?.includes(searchTerm);
    const matchesStatus = statusFilter === "All" || item.paymentStatus === statusFilter;
    return matchesSearch && matchesStatus;
  });

  // --- 1. LOGIN SCREEN (If not authenticated) ---
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#f7f4ee] px-4">
        <div className="bg-white border-2 border-amber-300 rounded-3xl p-8 max-w-md w-full shadow-xl text-center">
          <span className="text-4xl block mb-2">🪔</span>
          <h1 className="text-2xl font-black text-stone-800">Sanatan Seva Admin</h1>
          <p className="text-xs text-stone-500 mt-1 uppercase tracking-wider font-semibold">
            Prabandhak Login Portal
          </p>

          <form onSubmit={handleLogin} className="mt-6 space-y-4">
            <div>
              <input
                type="password"
                required
                placeholder="Admin Passcode Dalein..."
                value={passwordInput}
                onChange={(e) => setPasswordInput(e.target.value)}
                className="w-full px-4 py-3 border border-amber-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 text-stone-900 text-center font-medium"
              />
            </div>

            {loginError && <p className="text-red-600 text-xs font-semibold">{loginError}</p>}

            <button
              type="submit"
              className="w-full bg-orange-600 hover:bg-orange-700 text-white font-bold py-3 rounded-xl shadow transition-transform active:scale-95 cursor-pointer"
            >
              Dashboard Me Pravesh Karein →
            </button>
          </form>
        </div>
      </div>
    );
  }

  // --- 2. MAIN DASHBOARD ---
  return (
    <div className="min-h-screen bg-[#f9f7f2] py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Top Bar */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-amber-200 shadow-sm mb-6">
          <div className="flex items-center gap-3">
            <span className="text-3xl">🪔</span>
            <div>
              <h1 className="text-xl sm:text-2xl font-extrabold text-stone-900 leading-tight">
                Sanatan Seva Prabandhan (Admin Panel)
              </h1>
              <p className="text-xs text-orange-600 font-semibold">Live Bookings & Jyotish Management</p>
            </div>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end">
            <button
              onClick={fetchData}
              disabled={loading}
              className="bg-amber-100 hover:bg-amber-200 text-amber-900 text-xs font-bold px-3 py-2 rounded-lg flex items-center gap-1 transition-colors"
            >
              🔄 {loading ? "Updating..." : "Refresh"}
            </button>
            <button
              onClick={handleLogout}
              className="bg-stone-100 hover:bg-stone-200 text-stone-700 text-xs font-bold px-3 py-2 rounded-lg transition-colors"
            >
              🚪 Logout
            </button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="bg-white border border-amber-200 p-5 rounded-2xl shadow-sm">
            <span className="text-xs font-bold text-stone-500 uppercase tracking-wider block">Kul Dakshina (Revenue)</span>
            <span className="text-2xl sm:text-3xl font-black text-green-700 mt-1 block">₹{totalRevenue.toLocaleString("en-IN")}</span>
          </div>
          <div className="bg-white border border-amber-200 p-5 rounded-2xl shadow-sm">
            <span className="text-xs font-bold text-stone-500 uppercase tracking-wider block">Kul Puja Bookings</span>
            <span className="text-2xl sm:text-3xl font-black text-stone-800 mt-1 block">{bookings.length}</span>
          </div>
          <div className="bg-white border border-amber-200 p-5 rounded-2xl shadow-sm">
            <span className="text-xs font-bold text-stone-500 uppercase tracking-wider block">Pending Anurodh</span>
            <span className="text-2xl sm:text-3xl font-black text-amber-600 mt-1 block">{pendingBookingsCount}</span>
          </div>
          <div className="bg-white border border-amber-200 p-5 rounded-2xl shadow-sm">
            <span className="text-xs font-bold text-stone-500 uppercase tracking-wider block">Kundali Anurodh</span>
            <span className="text-2xl sm:text-3xl font-black text-orange-600 mt-1 block">{kundaliList.length}</span>
          </div>
        </div>

        {/* Tab Switcher & Search Controls */}
        <div className="bg-white border border-amber-200 p-4 rounded-2xl shadow-sm mb-6 flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Tabs */}
          <div className="flex bg-stone-100 p-1 rounded-xl w-full md:w-auto">
            <button
              onClick={() => setActiveTab("bookings")}
              className={`flex-1 md:flex-none px-5 py-2 rounded-lg text-sm font-bold transition-all ${
                activeTab === "bookings" ? "bg-white text-orange-600 shadow-sm" : "text-stone-600 hover:text-stone-900"
              }`}
            >
              🕉️ Puja Bookings ({bookings.length})
            </button>
            <button
              onClick={() => setActiveTab("kundali")}
              className={`flex-1 md:flex-none px-5 py-2 rounded-lg text-sm font-bold transition-all ${
                activeTab === "kundali" ? "bg-white text-orange-600 shadow-sm" : "text-stone-600 hover:text-stone-900"
              }`}
            >
              🪐 Kundali Anurodh ({kundaliList.length})
            </button>
          </div>

          {/* Search & Filter */}
          <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto">
            <input
              type="text"
              placeholder="Naam ya phone se khojein..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full sm:w-64 px-3.5 py-2 border border-stone-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 bg-stone-50 text-stone-900"
            />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full sm:w-auto px-3.5 py-2 border border-stone-200 rounded-xl text-sm focus:outline-none bg-stone-50 text-stone-900 font-medium"
            >
              <option value="All">Sabhi Status</option>
              <option value="Completed">Completed</option>
              <option value="Pending">Pending</option>
              <option value="Failed">Failed</option>
            </select>
          </div>
        </div>

        {/* --- VIEW 1: PUJA BOOKINGS --- */}
        {activeTab === "bookings" && (
          <div className="space-y-4">
            {filteredBookings.length === 0 ? (
              <div className="bg-white border border-amber-200 rounded-2xl p-12 text-center text-stone-500">
                Koi booking nahi mili.
              </div>
            ) : (
              filteredBookings.map((b) => {
                const waMessage = encodeURIComponent(
                  `Namaste ${b.customerName} ji! 🙏 Sanatan Seva se aapki "${b.serviceName}" puja (${new Date(
                    b.date
                  ).toLocaleDateString("en-IN")}) ke sambandh me aapse sampark kiya ja raha hai.`
                );

                return (
                  <div
                    key={b._id}
                    className="bg-white border border-amber-200 rounded-2xl p-5 shadow-sm hover:shadow-md transition-shadow"
                  >
                    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-stone-100 pb-4">
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="text-lg font-bold text-stone-900">{b.customerName}</h3>
                          <span
                            className={`text-xs font-bold px-2.5 py-0.5 rounded-full ${
                              b.paymentStatus === "Completed"
                                ? "bg-green-100 text-green-800"
                                : b.paymentStatus === "Failed"
                                ? "bg-red-100 text-red-800"
                                : "bg-amber-100 text-amber-800"
                            }`}
                          >
                            {b.paymentStatus}
                          </span>
                        </div>
                        <p className="text-sm text-orange-700 font-semibold mt-0.5">
                          {b.serviceType} • {b.serviceName} (₹{b.amount})
                        </p>
                      </div>

                      {/* Actions */}
                      <div className="flex flex-wrap items-center gap-2">
                        {/* WhatsApp Button */}
                        <a
                          href={`https://wa.me/91${b.whatsapp || b.mobile}?text=${waMessage}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="bg-green-600 hover:bg-green-700 text-white text-xs font-bold px-3 py-2 rounded-xl flex items-center gap-1 shadow-sm transition-transform active:scale-95"
                        >
                          💬 WhatsApp Chat
                        </a>

                        {/* Status Select */}
                        <select
                          value={b.paymentStatus}
                          onChange={(e) => handleStatusChange(b._id, e.target.value, "bookings")}
                          className="text-xs font-bold border border-stone-300 rounded-xl px-2.5 py-2 bg-stone-50 text-stone-800 cursor-pointer"
                        >
                          <option value="Pending">Pending</option>
                          <option value="Completed">Completed</option>
                          <option value="Failed">Failed</option>
                        </select>

                        {/* Delete Button */}
                        <button
                          onClick={() => handleDelete(b._id, "bookings")}
                          className="text-red-600 hover:bg-red-50 p-2 rounded-xl text-sm transition-colors"
                          title="Delete"
                        >
                          🗑️
                        </button>
                      </div>
                    </div>

                    {/* Booking Details Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 mt-4 text-xs text-stone-600">
                      <div>
                        <strong className="text-stone-900 block font-semibold">📞 Mobile:</strong>
                        <span>{b.mobile}</span>
                      </div>
                      <div>
                        <strong className="text-stone-900 block font-semibold">📅 Tithi & Samay:</strong>
                        <span>
                          {new Date(b.date).toLocaleDateString("en-IN")} ({b.time})
                        </span>
                      </div>
                      <div>
                        <strong className="text-stone-900 block font-semibold">📍 Pata / Location:</strong>
                        <span>{b.location}</span>
                      </div>
                      <div>
                        <strong className="text-stone-900 block font-semibold">💳 Payment ID:</strong>
                        <span className="font-mono">{b.paymentId || "N/A (Cash / Unpaid)"}</span>
                      </div>
                    </div>

                    {b.specialNotes && (
                      <div className="mt-3 bg-amber-50/70 p-2.5 rounded-xl text-xs text-amber-900 border border-amber-200/50">
                        <strong>Vishesh Sankalp / Note:</strong> {b.specialNotes}
                      </div>
                    )}
                  </div>
                );
              })
            )}
          </div>
        )}

        {/* --- VIEW 2: KUNDALI REQUESTS --- */}
        {activeTab === "kundali" && (
          <div className="space-y-4">
            {filteredKundali.length === 0 ? (
              <div className="bg-white border border-amber-200 rounded-2xl p-12 text-center text-stone-500">
                Koi Kundali anurodh nahi mila.
              </div>
            ) : (
              filteredKundali.map((k) => {
                const waMessage = encodeURIComponent(
                  `Namaste ${k.fullName} ji! 🙏 Sanatan Jyotish Seva se aapki Kundali vishleshan request prapt hui hai.`
                );

                return (
                  <div
                    key={k._id}
                    className="bg-white border border-amber-200 rounded-2xl p-5 shadow-sm hover:shadow-md transition-shadow"
                  >
                    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-stone-100 pb-4">
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="text-lg font-bold text-stone-900">{k.fullName}</h3>
                          <span
                            className={`text-xs font-bold px-2.5 py-0.5 rounded-full ${
                              k.paymentStatus === "Completed"
                                ? "bg-green-100 text-green-800"
                                : "bg-amber-100 text-amber-800"
                            }`}
                          >
                            {k.paymentStatus}
                          </span>
                        </div>
                        <p className="text-sm text-orange-700 font-semibold mt-0.5">
                          Prashna: {k.queryType || "Kundali Vishleshan"}
                        </p>
                      </div>

                      <div className="flex items-center gap-2">
                        <a
                          href={`https://wa.me/91${k.whatsapp || k.mobile}?text=${waMessage}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="bg-green-600 hover:bg-green-700 text-white text-xs font-bold px-3 py-2 rounded-xl flex items-center gap-1 shadow-sm"
                        >
                          💬 WhatsApp
                        </a>

                        <select
                          value={k.paymentStatus}
                          onChange={(e) => handleStatusChange(k._id, e.target.value, "kundali")}
                          className="text-xs font-bold border border-stone-300 rounded-xl px-2.5 py-2 bg-stone-50 text-stone-800 cursor-pointer"
                        >
                          <option value="Pending">Pending</option>
                          <option value="Completed">Completed</option>
                        </select>

                        <button
                          onClick={() => handleDelete(k._id, "kundali")}
                          className="text-red-600 hover:bg-red-50 p-2 rounded-xl text-sm"
                        >
                          🗑️
                        </button>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 mt-4 text-xs text-stone-600">
                      <div>
                        <strong className="text-stone-900 block font-semibold">📞 Mobile:</strong>
                        <span>{k.mobile}</span>
                      </div>
                      <div>
                        <strong className="text-stone-900 block font-semibold">🎂 Janm Tithi (DOB):</strong>
                        <span>{new Date(k.dob).toLocaleDateString("en-IN")}</span>
                      </div>
                      <div>
                        <strong className="text-stone-900 block font-semibold">⏰ Janm Samay:</strong>
                        <span>{k.birthTime}</span>
                      </div>
                      <div>
                        <strong className="text-stone-900 block font-semibold">📍 Janm Sthan:</strong>
                        <span>{k.birthPlace}</span>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        )}
      </div>
    </div>
  );
}