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

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await api.get('/events');
        setEvents(res.data);
      } catch (err) {
        console.error('Error fetching calendar events:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchEvents();
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto space-y-8">
        
        {/* Section Header */}
        <div className="text-center space-y-2">
          <h1 className="text-4xl font-extrabold text-blue-950 tracking-tight">Upcoming Campus Events</h1>
          <div className="h-1 w-20 bg-amber-500 mx-auto rounded-full"></div>
          <p className="text-slate-500 text-sm">Join us in experiencing student initiatives, exhibitions, and athletic meets.</p>
        </div>

        {/* Dynamic Display Layout Container */}
        {loading ? (
          <div className="space-y-4 animate-pulse">
            {[1, 2].map(i => <div key={i} className="h-28 bg-slate-200 rounded-xl"></div>)}
          </div>
        ) : events.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-xl shadow border border-slate-100 text-slate-400 italic">
            No upcoming events listed at this time. Check back soon!
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6">
            {events.map((eventItem) => (
              <div key={eventItem._id} className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 hover:shadow-md transition-all grid grid-cols-1 md:grid-cols-4 gap-6 items-center">
                
                {/* Visual Calendar Date Block Card */}
                <div className="bg-blue-950 text-white rounded-lg p-4 text-center space-y-1 md:col-span-1 flex flex-col justify-center h-full">
                  <span className="text-2xl font-black tracking-tight">
                    {new Date(eventItem.eventDate).toLocaleDateString('en-US', { day: '2-digit' })}
                  </span>
                  <span className="text-xs font-bold uppercase tracking-widest text-amber-400">
                    {new Date(eventItem.eventDate).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
                  </span>
                </div>

                {/* Event Descriptive Metrics */}
                <div className="space-y-2 md:col-span-3">
                  <h3 className="text-xl font-bold text-slate-900 tracking-tight">{eventItem.title}</h3>
                  <p className="text-sm text-slate-600 font-light leading-relaxed">{eventItem.description}</p>
                  <div className="pt-2 text-xs text-slate-500 font-semibold flex items-center space-x-4">
                    <span>📍 Venue: {eventItem.location}</span>
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