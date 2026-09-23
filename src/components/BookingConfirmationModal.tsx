import React from 'react';
import { ConfirmedBooking } from '../types';
import { CheckCircle2, Calendar, MapPin, Download, X, Heart } from 'lucide-react';

interface BookingConfirmationModalProps {
  booking: ConfirmedBooking | null;
  onClose: () => void;
}

export const BookingConfirmationModal: React.FC<BookingConfirmationModalProps> = ({
  booking,
  onClose,
}) => {
  if (!booking) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg bg-slate-900 border border-slate-700/80 rounded-2xl shadow-2xl p-6 sm:p-8 text-slate-100 overflow-hidden">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
          aria-label="Close confirmation"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Success Header */}
        <div className="flex flex-col items-center text-center mb-6">
          <div className="w-14 h-14 rounded-full bg-teal-500/15 border border-teal-500/30 flex items-center justify-center mb-3">
            <CheckCircle2 className="w-8 h-8 text-teal-400" />
          </div>
          <h3 className="text-xl font-bold font-display text-white">Reservation Confirmed!</h3>
          <p className="text-xs text-slate-400 mt-1">
            We are excited to welcome <span className="text-teal-300 font-semibold">{booking.catName}</span> to Ocean Whiskers.
          </p>
        </div>

        {/* Reservation Card Details */}
        <div className="bg-slate-950/70 border border-slate-800 rounded-xl p-4 sm:p-5 mb-5 space-y-3 text-xs sm:text-sm">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <span className="text-slate-400">Confirmation Code</span>
            <span className="font-mono font-bold text-teal-300 tracking-wider text-sm sm:text-base">
              {booking.bookingId}
            </span>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-slate-400">Reserved Suite</span>
            <span className="font-medium text-white">{booking.suiteName}</span>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-slate-400">Duration</span>
            <span className="font-mono text-slate-200">
              {booking.checkInDate} → {booking.checkOutDate} ({booking.nights} {booking.nights === 1 ? 'night' : 'nights'})
            </span>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-slate-400">Guest Cat</span>
            <span className="font-medium text-slate-200">
              {booking.catName} ({booking.catBreed || 'Domestic Cat'})
            </span>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-slate-400">Temperament</span>
            <span className="text-slate-200">{booking.catTemperament}</span>
          </div>

          {booking.selectedAddOns.length > 0 && (
            <div className="pt-2 border-t border-slate-800/80">
              <span className="text-slate-400 block mb-1">Included Care Add-ons:</span>
              <ul className="list-disc list-inside text-teal-200/90 text-xs space-y-0.5">
                {booking.selectedAddOns.map((addon) => (
                  <li key={addon}>{addon}</li>
                ))}
              </ul>
            </div>
          )}

          <div className="flex items-center justify-between pt-3 border-t border-slate-800 font-medium">
            <span className="text-white">Total Amount</span>
            <span className="font-mono text-base font-bold text-teal-300 tabular-nums">
              ${booking.totalAmount.toFixed(2)} USD
            </span>
          </div>
        </div>

        {/* Location & Reminder info */}
        <div className="flex items-start gap-2.5 text-xs text-slate-400 mb-6 bg-slate-800/40 p-3 rounded-lg">
          <MapPin className="w-4 h-4 text-teal-400 shrink-0 mt-0.5" />
          <p>
            Check-in time is between 12:00 PM – 4:00 PM. Complimentary seaside shuttle available upon request.
          </p>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-3">
          <button
            onClick={handlePrint}
            className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 font-medium rounded-xl text-xs sm:text-sm transition-colors"
          >
            <Download className="w-4 h-4" />
            <span>Download Voucher</span>
          </button>

          <button
            onClick={onClose}
            className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-teal-600 hover:bg-teal-500 text-white font-medium rounded-xl text-xs sm:text-sm transition-colors shadow-lg shadow-teal-900/30"
          >
            <Heart className="w-4 h-4" />
            <span>Complete</span>
          </button>
        </div>
      </div>
    </div>
  );
};
