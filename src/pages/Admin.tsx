import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Search, Filter, Phone, MessageCircle, ChevronDown,
  BarChart3, Clock, CheckCircle2, XCircle, Loader2,
  Eye, ArrowLeft, LogOut, RefreshCw
} from "lucide-react";
import { getAllBookings, updateBookingStatus, getBookingStats } from "@/lib/bookingService";
import { Booking, BookingStatus } from "@/types/booking";
import { formatCurrency } from "@/lib/fareCalculator";
import { formatDatetime, formatDate } from "@/lib/utils";
import { KMD_CONFIG } from "@/constants/config";
import { cn } from "@/lib/utils";

const STATUS_CONFIG: Record<BookingStatus, { label: string; color: string; icon: React.ElementType }> = {
  pending: { label: "Pending", color: "bg-yellow-100 text-yellow-800 border-yellow-200", icon: Clock },
  confirmed: { label: "Confirmed", color: "bg-blue-100 text-blue-800 border-blue-200", icon: CheckCircle2 },
  completed: { label: "Completed", color: "bg-green-100 text-green-800 border-green-200", icon: CheckCircle2 },
  cancelled: { label: "Cancelled", color: "bg-red-100 text-red-800 border-red-200", icon: XCircle },
};

export default function AdminPage() {
  const navigate = useNavigate();
  const [authed, setAuthed] = useState(false);
  const [password, setPassword] = useState("");
  const [pwError, setPwError] = useState("");
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<BookingStatus | "all">("all");
  const [selected, setSelected] = useState<Booking | null>(null);

  // Check session
  useEffect(() => {
    const s = sessionStorage.getItem("kmd_admin");
    if (s === "1") { setAuthed(true); loadBookings(); }
  }, []);

  const loadBookings = () => setBookings(getAllBookings());

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === KMD_CONFIG.adminPassword) {
      sessionStorage.setItem("kmd_admin", "1");
      setAuthed(true);
      loadBookings();
    } else {
      setPwError("Incorrect password. Please try again.");
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem("kmd_admin");
    setAuthed(false);
  };

  const handleStatusChange = (id: string, status: BookingStatus) => {
    updateBookingStatus(id, status);
    loadBookings();
    if (selected?.id === id) setSelected((prev) => prev ? { ...prev, status } : null);
  };

  const stats = getBookingStats();

  const filtered = bookings.filter((b) => {
    const matchSearch =
      !search ||
      b.customerName.toLowerCase().includes(search.toLowerCase()) ||
      b.bookingId.toLowerCase().includes(search.toLowerCase()) ||
      b.pickup.toLowerCase().includes(search.toLowerCase()) ||
      b.destination.toLowerCase().includes(search.toLowerCase()) ||
      b.phone.includes(search);
    const matchStatus = statusFilter === "all" || b.status === statusFilter;
    return matchSearch && matchStatus;
  });

  if (!authed) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md">
          <div className="text-center mb-8">
            <div className="w-14 h-14 bg-navy rounded-2xl flex items-center justify-center mx-auto mb-4">
              <BarChart3 className="w-7 h-7 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-navy">KMD Travels Admin</h1>
            <p className="text-gray-400 text-sm mt-1">Booking Management Dashboard</p>
          </div>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">Admin Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => { setPassword(e.target.value); setPwError(""); }}
                placeholder="Enter admin password"
                className="input-field"
                autoFocus
              />
              {pwError && <p className="text-red-500 text-xs mt-1.5">{pwError}</p>}
            </div>
            <button type="submit" className="w-full btn-navy py-3">Sign In</button>
          </form>
          <button onClick={() => navigate("/")} className="w-full mt-4 text-gray-400 hover:text-gray-600 text-sm flex items-center justify-center gap-1 transition-colors">
            <ArrowLeft className="w-3.5 h-3.5" /> Back to Website
          </button>
        </div>
      </div>
    );
  }

  if (selected) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="bg-navy text-white px-6 py-4 flex items-center justify-between">
          <button onClick={() => setSelected(null)} className="flex items-center gap-2 text-blue-300 hover:text-white transition-colors">
            <ArrowLeft className="w-4 h-4" /> Back to Dashboard
          </button>
          <span className="font-bold">Booking: {selected.bookingId}</span>
        </div>
        <div className="max-w-3xl mx-auto px-4 py-8">
          <div className="bg-white rounded-2xl shadow border border-gray-100 overflow-hidden">
            <div className="bg-navy/5 px-6 py-5 border-b border-gray-100 flex items-center justify-between">
              <div>
                <h2 className="font-bold text-navy text-xl">{selected.bookingId}</h2>
                <p className="text-gray-500 text-sm mt-0.5">{formatDatetime(selected.createdAt)}</p>
              </div>
              <StatusBadge status={selected.status} />
            </div>
            <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold text-gray-700 text-xs uppercase tracking-wider mb-3">Customer</h4>
                <div className="space-y-2 text-sm">
                  <Row label="Name" value={selected.customerName} />
                  <Row label="Phone" value={selected.phone} />
                  <Row label="WhatsApp" value={selected.whatsapp} />
                  <Row label="Email" value={selected.email || "—"} />
                </div>
              </div>
              <div>
                <h4 className="font-semibold text-gray-700 text-xs uppercase tracking-wider mb-3">Trip</h4>
                <div className="space-y-2 text-sm">
                  <Row label="Pickup" value={selected.pickup} />
                  <Row label="Destination" value={selected.destination} />
                  <Row label="Distance" value={`${selected.distance} km`} />
                  <Row label="Journey" value={selected.journeyType === "round-trip" ? "Round Trip" : "One Way"} />
                  <Row label="Travel Date" value={formatDate(selected.travelDate)} />
                  {selected.returnDate && <Row label="Return Date" value={formatDate(selected.returnDate)} />}
                  <Row label="Passengers" value={`${selected.passengers}`} />
                  <Row label="Vehicle" value={selected.vehicleName} />
                </div>
              </div>
              <div className="md:col-span-2">
                <h4 className="font-semibold text-gray-700 text-xs uppercase tracking-wider mb-3">Fare Breakdown</h4>
                <div className="bg-gray-50 rounded-xl p-4 space-y-2 text-sm">
                  <FareRow label="Base Fare" value={selected.baseFare} />
                  <FareRow label="Driver Allowance" value={selected.driverAllowance} />
                  <FareRow label="Toll Estimate" value={selected.tollEstimate} />
                  <div className="border-t border-gray-200 pt-2">
                    <FareRow label="GST (5%)" value={selected.gstAmount} />
                  </div>
                  <div className="border-t border-gray-200 pt-2">
                    <div className="flex justify-between font-bold text-navy text-base">
                      <span>Total</span>
                      <span>{formatCurrency(selected.finalAmount)}</span>
                    </div>
                  </div>
                </div>
              </div>
              {selected.specialRequirements && (
                <div className="md:col-span-2">
                  <h4 className="font-semibold text-gray-700 text-xs uppercase tracking-wider mb-2">Special Requirements</h4>
                  <p className="text-sm text-gray-600 bg-gray-50 rounded-lg p-3">{selected.specialRequirements}</p>
                </div>
              )}
            </div>
            <div className="px-6 py-5 border-t border-gray-100 flex flex-wrap gap-3">
              <a href={`tel:${selected.phone}`} className="flex items-center gap-2 bg-navy text-white px-4 py-2.5 rounded-lg text-sm font-medium hover:bg-navy-light transition-colors">
                <Phone className="w-4 h-4" /> Call
              </a>
              <a
                href={`https://wa.me/${selected.whatsapp.replace(/\D/g, "")}?text=${encodeURIComponent(`Hello ${selected.customerName}, regarding your booking ${selected.bookingId}...`)}`}
                target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-2 bg-green-500 text-white px-4 py-2.5 rounded-lg text-sm font-medium hover:bg-green-600 transition-colors"
              >
                <MessageCircle className="w-4 h-4" /> WhatsApp
              </a>
              <div className="flex items-center gap-2 ml-auto">
                <span className="text-sm text-gray-500 font-medium">Change Status:</span>
                <select
                  value={selected.status}
                  onChange={(e) => handleStatusChange(selected.id, e.target.value as BookingStatus)}
                  className="input-field w-auto py-2 text-sm"
                >
                  {(Object.keys(STATUS_CONFIG) as BookingStatus[]).map((s) => (
                    <option key={s} value={s}>{STATUS_CONFIG[s].label}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Admin header */}
      <div className="bg-navy text-white px-6 py-4 flex items-center justify-between sticky top-0 z-40 shadow-lg">
        <div className="flex items-center gap-3">
          <BarChart3 className="w-6 h-6 text-orange-brand" />
          <span className="font-bold text-lg">KMD Admin Dashboard</span>
        </div>
        <div className="flex items-center gap-3">
          <button onClick={loadBookings} className="text-blue-300 hover:text-white p-2 rounded-lg hover:bg-white/10 transition-colors" title="Refresh">
            <RefreshCw className="w-4 h-4" />
          </button>
          <button onClick={() => navigate("/")} className="text-blue-300 hover:text-white text-sm px-3 py-1.5 rounded-lg hover:bg-white/10 transition-colors">
            View Website
          </button>
          <button onClick={handleLogout} className="flex items-center gap-1.5 text-blue-300 hover:text-white text-sm px-3 py-1.5 rounded-lg hover:bg-white/10 transition-colors">
            <LogOut className="w-4 h-4" /> Logout
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Stats cards */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
          {([
            { key: "all", label: "Total", value: stats.total, color: "bg-navy text-white" },
            { key: "pending", label: "Pending", value: stats.pending, color: "bg-yellow-50 text-yellow-700" },
            { key: "confirmed", label: "Confirmed", value: stats.confirmed, color: "bg-blue-50 text-blue-700" },
            { key: "completed", label: "Completed", value: stats.completed, color: "bg-green-50 text-green-700" },
            { key: "cancelled", label: "Cancelled", value: stats.cancelled, color: "bg-red-50 text-red-700" },
          ] as const).map((s) => (
            <button
              key={s.key}
              onClick={() => setStatusFilter(s.key as BookingStatus | "all")}
              className={cn(
                "rounded-xl p-5 text-center border-2 transition-all duration-200 hover:shadow-md",
                statusFilter === s.key ? "border-orange-brand shadow-md scale-[1.02]" : "border-transparent",
                s.color
              )}
            >
              <div className="text-3xl font-bold">{s.value}</div>
              <div className="text-sm font-medium mt-1 opacity-80">{s.label}</div>
            </button>
          ))}
        </div>

        {/* Filters */}
        <div className="bg-white rounded-xl border border-gray-100 p-4 mb-6 flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by name, booking ID, phone or route..."
              className="input-field pl-9 text-sm"
            />
          </div>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value as BookingStatus | "all")}
            className="input-field w-full sm:w-44 text-sm"
          >
            <option value="all">All Status</option>
            {(Object.keys(STATUS_CONFIG) as BookingStatus[]).map((s) => (
              <option key={s} value={s}>{STATUS_CONFIG[s].label}</option>
            ))}
          </select>
        </div>

        {/* Bookings list */}
        {filtered.length === 0 ? (
          <div className="bg-white rounded-2xl border border-gray-100 p-16 text-center text-gray-400">
            <div className="text-5xl mb-4">📋</div>
            <div className="font-semibold text-gray-500 text-lg">No bookings found</div>
            <p className="text-sm mt-2">Bookings will appear here once customers submit trip requests.</p>
          </div>
        ) : (
          <div className="space-y-3">
            {filtered.map((booking) => (
              <div
                key={booking.id}
                className="bg-white rounded-xl border border-gray-100 p-5 hover:shadow-md transition-shadow cursor-pointer"
                onClick={() => setSelected(booking)}
              >
                <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-2 mb-2">
                      <span className="font-bold text-navy text-sm">{booking.bookingId}</span>
                      <StatusBadge status={booking.status} />
                    </div>
                    <div className="font-semibold text-gray-800 mb-1">{booking.customerName}</div>
                    <div className="text-sm text-gray-500 flex flex-wrap gap-3">
                      <span>{booking.pickup.split(",")[0]} → {booking.destination.split(",")[0]}</span>
                      <span>•</span>
                      <span>{booking.vehicleName}</span>
                      <span>•</span>
                      <span>{booking.passengers} pax</span>
                      <span>•</span>
                      <span>{formatDate(booking.travelDate)}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 shrink-0">
                    <div className="text-right">
                      <div className="font-bold text-navy text-lg">{formatCurrency(booking.finalAmount)}</div>
                      <div className="text-xs text-gray-400">{booking.distance} km</div>
                    </div>
                    <div className="flex gap-2">
                      <a href={`tel:${booking.phone}`} onClick={(e) => e.stopPropagation()}
                        className="w-9 h-9 bg-navy rounded-lg flex items-center justify-center text-white hover:bg-navy-light transition-colors">
                        <Phone className="w-4 h-4" />
                      </a>
                      <a href={`https://wa.me/${booking.whatsapp.replace(/\D/g, "")}`}
                        target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()}
                        className="w-9 h-9 bg-green-500 rounded-lg flex items-center justify-center text-white hover:bg-green-600 transition-colors">
                        <MessageCircle className="w-4 h-4" />
                      </a>
                      <button onClick={(e) => { e.stopPropagation(); setSelected(booking); }}
                        className="w-9 h-9 bg-gray-100 rounded-lg flex items-center justify-center text-gray-600 hover:bg-gray-200 transition-colors">
                        <Eye className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function StatusBadge({ status }: { status: BookingStatus }) {
  const cfg = STATUS_CONFIG[status];
  const Icon = cfg.icon;
  return (
    <span className={cn("inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-full border", cfg.color)}>
      <Icon className="w-3 h-3" />
      {cfg.label}
    </span>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex gap-2">
      <span className="text-gray-400 w-24 shrink-0">{label}</span>
      <span className="text-gray-800 font-medium">{value}</span>
    </div>
  );
}

function FareRow({ label, value }: { label: string; value: number }) {
  return (
    <div className="flex justify-between text-gray-600">
      <span>{label}</span>
      <span className="font-medium text-gray-800">{formatCurrency(value)}</span>
    </div>
  );
}
