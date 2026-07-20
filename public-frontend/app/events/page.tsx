'use client';
import { useEffect, useState } from 'react';
import api from '../../utils/api';

interface EventItem {
  _id: string;
  title: string;
  description: string;
  eventDate: string;
  location: string;
}

export default function EventsPage() {
  const [events, setEvents] = useState<EventItem[]>([]);
  const [loading, setLoading] = useState(true);
  
  // 📅 BROAD EVENT DETAIL STATE
  const [selectedEvent, setSelectedEvent] = useState<EventItem | null>(null);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await api.get('/events');
        setEvents(res.data);
      } catch (err) {
        console.error("Error fetching event calendar roster:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchEvents();
  }, []);

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 py-12 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-4xl mx-auto space-y-10">
        
        {/* Header Block */}
        <div className="text-center space-y-2">
          <h1 className="text-4xl font-black tracking-tight text-white uppercase">School Activities Calendar</h1>
          <p className="text-xs font-semibold text-school-accent uppercase tracking-widest">Upcoming dynamic schedules and athletic matches</p>
          <div className="h-1 w-20 bg-school-accent mx-auto rounded-full mt-2"></div>
        </div>

        {/* Events Catalog list */}
        {loading ? (
          <div className="space-y-4 animate-pulse">
            {[1, 2, 3].map(i => <div key={i} className="h-32 bg-slate-800 rounded-xl"></div>)}
          </div>
        ) : events.length === 0 ? (
          <div className="text-center py-20 bg-slate-950 rounded-2xl border border-slate-800">
            <p className="text-sm text-slate-400 italic">No upcoming public calendar entries found.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {events.map((ev) => (
              <div
                key={ev._id}
                onClick={() => setSelectedEvent(ev)}
                className="p-5 bg-slate-950 border border-slate-800 rounded-xl shadow-md hover:border-school-accent/40 hover:-translate-y-1 transition-all duration-300 cursor-pointer group flex flex-col justify-between space-y-4"
              >
                <div className="space-y-2">
                  <div className="flex items-center text-xs text-school-accent font-mono">
                    <span>📅 {new Date(ev.eventDate).toLocaleDateString(undefined, {dateStyle: 'medium'})}</span>
                  </div>
                  <h3 className="font-bold text-white text-base group-hover:text-amber-400 transition-colors line-clamp-1">{ev.title}</h3>
                  <p className="text-xs text-slate-400 line-clamp-3 leading-relaxed">{ev.description}</p>
                </div>
                
                <div className="pt-2 border-t border-slate-900 flex justify-between items-center text-[11px] text-slate-500">
                  <span className="truncate max-w-[70%]">📍 Venue: {ev.location}</span>
                  <span className="font-bold group-hover:text-school-accent transition-colors shrink-0">Details ➔</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* 🔮 BROAD EVENT TIMELINE MODAL OVERLAY */}
      {selectedEvent && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4" onClick={() => setSelectedEvent(null)}>
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 max-w-lg w-full shadow-2xl space-y-4 animate-fade-in relative" onClick={e => e.stopPropagation()}>
            <button className="absolute top-4 right-4 text-slate-400 hover:text-white border border-slate-800 p-1.5 rounded-full bg-slate-950/45 cursor-pointer" onClick={() => setSelectedEvent(null)}>✕</button>
            <div className="text-xs text-school-accent font-mono uppercase tracking-wider font-bold">🎯 Event Parameters</div>
            <h3 className="text-xl font-black text-white leading-snug pt-2 border-b border-slate-800 pb-3">{selectedEvent.title}</h3>
            
            <div className="grid grid-cols-2 gap-4 bg-slate-950 p-3 rounded-xl border border-slate-800 text-xs font-medium text-slate-300">
              <div>📅 SCHEDULED DATE:<div className="text-white font-mono font-bold mt-1">✓ {new Date(selectedEvent.eventDate).toLocaleDateString(undefined, {dateStyle: 'long'})}</div></div>
              <div>📍 TARGET VENUE:<div className="text-white font-bold mt-1">📍 {selectedEvent.location}</div></div>
            </div>

            <p className="text-sm text-slate-300 leading-relaxed max-h-[40vh] overflow-y-auto whitespace-pre-line pt-2">{selectedEvent.description}</p>
          </div>
        </div>
      )}

    </div>
  );
}