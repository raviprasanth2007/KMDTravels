// ============================================================
// KMD TRAVELS – BOOKING SERVICE
// Handles booking storage (localStorage for V1.0)
// ============================================================

import { Booking, BookingStatus } from "@/types/booking";
import { KMD_CONFIG } from "@/constants/config";

const STORAGE_KEY = "kmd_bookings";

function generateBookingId(): string {
  const year = new Date().getFullYear();
  const random = Math.floor(1000 + Math.random() * 9000);
  return `${KMD_CONFIG.bookingPrefix}-${year}-${random}`;
}

export function getAllBookings(): Booking[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    return JSON.parse(raw) as Booking[];
  } catch {
    return [];
  }
}

export function saveBooking(booking: Omit<Booking, "id" | "bookingId" | "createdAt">): Booking {
  const bookings = getAllBookings();
  const newBooking: Booking = {
    ...booking,
    id: crypto.randomUUID ? crypto.randomUUID() : `${Date.now()}`,
    bookingId: generateBookingId(),
    createdAt: new Date().toISOString(),
  };
  bookings.unshift(newBooking);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(bookings));
  return newBooking;
}

export function updateBookingStatus(id: string, status: BookingStatus): void {
  const bookings = getAllBookings();
  const idx = bookings.findIndex((b) => b.id === id);
  if (idx !== -1) {
    bookings[idx].status = status;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(bookings));
  }
}

export function getBookingById(id: string): Booking | undefined {
  return getAllBookings().find((b) => b.id === id || b.bookingId === id);
}

export function getBookingStats() {
  const bookings = getAllBookings();
  return {
    total: bookings.length,
    pending: bookings.filter((b) => b.status === "pending").length,
    confirmed: bookings.filter((b) => b.status === "confirmed").length,
    completed: bookings.filter((b) => b.status === "completed").length,
    cancelled: bookings.filter((b) => b.status === "cancelled").length,
  };
}
