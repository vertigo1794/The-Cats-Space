import React, { useState } from 'react';
import { MapPin, Clock, Phone, Mail, Car, HelpCircle, ChevronDown, Send, CheckCircle2 } from 'lucide-react';

interface FaqItem {
  q: string;
  a: string;
}

const FAQS: FaqItem[] = [
  {
    q: 'Can I visit and tour the suites before booking?',
    a: 'Absolutely! We welcome pet parents for scheduled coastal tours daily between 10:00 AM and 5:00 PM. Please book an appointment so we can keep noise levels peaceful for current guests.',
  },
  {
    q: 'What vaccinations are required for my cat?',
    a: 'To guarantee total guest safety, all cats must have up-to-date FVRCP (core feline distemper) and Rabies vaccinations, alongside a clean flea/parasite preventative check within 30 days.',
  },
  {
    q: 'How does the seaside shuttle service work?',
    a: 'Our temperature-controlled Whisker Chariot can pick up your cat directly from your home in an ultra-quiet acoustic carrier, equipped with soothing cat pheromones to ensure zero transit stress.',
  },
  {
    q: 'What happens if my cat gets anxious or misses home?',
    a: 'Every suite is infused with continuous Feliway calming pheromones. Our certified feline nurses provide gentle 1-on-1 bonding, hand-brushing sessions, and send you daily video updates so you can check on their contentment.',
  },
];

export const LocationSection: React.FC = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [inquirySent, setInquirySent] = useState(false);
  const [inquiryName, setInquiryName] = useState('');
  const [inquiryEmail, setInquiryEmail] = useState('');
  const [inquiryMessage, setInquiryMessage] = useState('');

  const handleInquirySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setInquirySent(true);
    setTimeout(() => {
      setInquirySent(false);
      setInquiryName('');
      setInquiryEmail('');
      setInquiryMessage('');
    }, 4000);
  };

  return (
    <section id="location" className="w-full py-16 px-4 sm:px-6 lg:px-8 bg-slate-950 border-t border-slate-800">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-widest uppercase text-teal-400 mb-2">
            <MapPin className="w-3.5 h-3.5" />
            <span>Seaside Haven & Concierge</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold font-display text-white tracking-tight">
            Find Us on the Shoreline
          </h2>
          <p className="mt-3 text-sm text-slate-400">
            Located on Ocean Bluff Point, surrounded by gentle waves, clean coastal air, and private tranquility.
          </p>
        </div>

        {/* 2-Column Grid: Map & Info vs Inquiry & FAQ */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16">
          {/* Left Column: Location Cards & Simulated Seaside Map */}
          <div className="lg:col-span-6 space-y-6">
            {/* Stylized Coastal Map Card */}
            <div className="relative rounded-3xl overflow-hidden border border-slate-800 bg-slate-900 shadow-xl h-80 flex flex-col justify-end p-6">
              {/* Map Graphic Layer */}
              <div
                className="absolute inset-0 bg-cover bg-center opacity-40 filter saturate-150"
                style={{ backgroundImage: `url('/images/cats_day_hero_1790168663147.jpg')` }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/70 to-slate-950/30" />

              {/* Pin indicator */}
              <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center animate-bounce">
                <div className="w-12 h-12 rounded-full bg-teal-500/30 border-2 border-teal-400 flex items-center justify-center backdrop-blur-md shadow-2xl">
                  <MapPin className="w-6 h-6 text-white" />
                </div>
                <div className="mt-2 text-[11px] font-bold tracking-wider uppercase text-white bg-slate-900/90 border border-slate-700 px-3 py-1 rounded-full shadow-lg">
                  Ocean Whiskers Sanctuary
                </div>
              </div>

              {/* Map Info Box */}
              <div className="relative z-10 bg-slate-900/90 backdrop-blur-md border border-slate-800 rounded-2xl p-4 text-xs">
                <div className="flex items-center justify-between mb-1">
                  <span className="font-bold text-white text-sm">Ocean Bluff Coastline</span>
                  <span className="text-teal-400 font-mono">108 Whisker Way</span>
                </div>
                <p className="text-slate-300">
                  Just 12 minutes from the Coastal Highway. Ample private parking and gated drop-off driveway.
                </p>
              </div>
            </div>

            {/* Quick Contact & Hours Pillars */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-4 text-xs space-y-2">
                <div className="flex items-center gap-2 text-teal-400 font-semibold uppercase tracking-wider text-[11px]">
                  <Clock className="w-4 h-4" />
                  <span>Visiting & Check-in</span>
                </div>
                <p className="text-slate-300">
                  <strong className="text-white">Check-in:</strong> 12:00 PM – 4:00 PM<br />
                  <strong className="text-white">Check-out:</strong> 9:00 AM – 11:30 AM<br />
                  <strong className="text-white">Lobby Hours:</strong> 8:00 AM – 8:00 PM
                </p>
              </div>

              <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-4 text-xs space-y-2">
                <div className="flex items-center gap-2 text-teal-400 font-semibold uppercase tracking-wider text-[11px]">
                  <Car className="w-4 h-4" />
                  <span>Pet Shuttle Service</span>
                </div>
                <p className="text-slate-300">
                  Complimentary pickup within 15 km of Ocean Bluff. Extended inter-city transfers available by private appointment.
                </p>
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-2xl bg-slate-900/40 border border-slate-800/80 text-xs">
              <div className="flex items-center gap-2 text-slate-300">
                <Phone className="w-4 h-4 text-teal-400" />
                <span>+60 12-345 6789 (Concierge 24/7)</span>
              </div>
              <div className="flex items-center gap-2 text-slate-300">
                <Mail className="w-4 h-4 text-teal-400" />
                <span>concierge@oceanwhiskers.com</span>
              </div>
            </div>
          </div>

          {/* Right Column: FAQ Accordion & Quick Message */}
          <div className="lg:col-span-6 space-y-6">
            {/* FAQ Accordion */}
            <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-6">
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-teal-400 mb-4">
                <HelpCircle className="w-4 h-4" />
                <span>Frequently Asked Questions</span>
              </div>

              <div className="space-y-3">
                {FAQS.map((faq, index) => {
                  const isOpen = openFaq === index;
                  return (
                    <div
                      key={index}
                      className="border border-slate-800 rounded-xl overflow-hidden bg-slate-950/40"
                    >
                      <button
                        onClick={() => setOpenFaq(isOpen ? null : index)}
                        className="w-full p-3.5 text-left text-xs sm:text-sm font-medium text-slate-200 hover:text-white flex items-center justify-between gap-2"
                      >
                        <span>{faq.q}</span>
                        <ChevronDown
                          className={`w-4 h-4 text-teal-400 shrink-0 transition-transform duration-200 ${
                            isOpen ? 'rotate-180' : ''
                          }`}
                        />
                      </button>
                      {isOpen && (
                        <div className="px-3.5 pb-3.5 text-xs text-slate-400 leading-relaxed border-t border-slate-800/60 pt-2.5">
                          {faq.a}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Quick Concierge Note / Message Box */}
            <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-6">
              <h3 className="text-sm font-semibold text-white mb-2">Have a Special Request?</h3>
              <p className="text-xs text-slate-400 mb-4">
                Send a quick inquiry directly to our feline hospitality coordinator.
              </p>

              {inquirySent ? (
                <div className="p-4 rounded-xl bg-teal-950/40 border border-teal-500/40 text-teal-300 text-xs flex items-center gap-2.5">
                  <CheckCircle2 className="w-5 h-5 text-teal-400 shrink-0" />
                  <span>Thank you! Our concierge team will reach out via WhatsApp/email shortly.</span>
                </div>
              ) : (
                <form onSubmit={handleInquirySubmit} className="space-y-3">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <input
                      type="text"
                      placeholder="Your Name"
                      value={inquiryName}
                      onChange={(e) => setInquiryName(e.target.value)}
                      required
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-100 focus:outline-none focus:border-teal-500"
                    />
                    <input
                      type="email"
                      placeholder="Your Email or Phone"
                      value={inquiryEmail}
                      onChange={(e) => setInquiryEmail(e.target.value)}
                      required
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-100 focus:outline-none focus:border-teal-500"
                    />
                  </div>
                  <textarea
                    rows={2}
                    placeholder="Tell us about your cat or ask any question..."
                    value={inquiryMessage}
                    onChange={(e) => setInquiryMessage(e.target.value)}
                    required
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-slate-100 focus:outline-none focus:border-teal-500"
                  />
                  <button
                    type="submit"
                    className="inline-flex items-center gap-2 px-4 py-2 bg-teal-600 hover:bg-teal-500 text-white rounded-xl text-xs font-semibold tracking-wider uppercase transition-colors"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Send Message</span>
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
