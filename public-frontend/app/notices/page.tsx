'use client';
import { useEffect, useState } from 'react';
import api from '../../utils/api';

interface Notice {
  _id: string;
  title: string;
  content: string;
  category: string;
  createdAt?: string;
}

export default function NoticesPage() {
  const [notices, setNotices] = useState<Notice[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('All');
  
  // 📢 BROAD MODAL DETAIL STATE
  const [selectedNotice, setSelectedNotice] = useState<Notice | null>(null);

  useEffect(() => {
    const fetchNotices = async () => {
      try {
        const res = await api.get('/notices');
        setNotices(res.data);
      } catch (err) {
        console.error("Error fetching circulars:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchNotices();
  }, []);

  const filteredNotices = filter === 'All' 
    ? notices 
    : notices.filter(n => n.category.toLowerCase() === filter.toLowerCase());

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 py-12 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-4xl mx-auto space-y-8">
        
        {/* Header Block */}
        <div className="text-center space-y-2">
          <h1 className="text-4xl font-black tracking-tight text-white uppercase">Official Notice Board</h1>
          <p className="text-xs font-semibold text-school-accent uppercase tracking-widest">Live announcements and academic circulars</p>
          <div className="h-1 w-20 bg-school-accent mx-auto rounded-full mt-2"></div>
        </div>

        {/* Dynamic Category Tabs Filter */}
        <div className="flex flex-wrap justify-center gap-2 border-b border-slate-800 pb-4">
          {['All', 'General', 'Academic', 'Admission', 'Exam'].map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-4 py-2 text-xs font-bold uppercase tracking-wider rounded-lg border transition-all cursor-pointer ${
                filter === cat 
                  ? 'bg-school-accent text-slate-950 border-school-accent' 
                  : 'bg-slate-950 text-slate-400 border-slate-800 hover:text-white hover:border-slate-700'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Notices Cards Grid */}
        {loading ? (
          <div className="space-y-4 animate-pulse">
            {[1, 2, 3].map(i => <div key={i} className="h-28 bg-slate-800 rounded-xl"></div>)}
          </div>
        ) : filteredNotices.length === 0 ? (
          <div className="text-center py-16 bg-slate-950 rounded-2xl border border-slate-800">
            <p className="text-sm text-slate-500 italic">No bulletin announcements under this filter tag.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredNotices.map((notice) => (
              <div
                key={notice._id}
                onClick={() => setSelectedNotice(notice)}
                className="p-5 bg-slate-950 border border-slate-800 rounded-xl shadow-md hover:border-school-accent/40 hover:-translate-y-0.5 transition-all cursor-pointer group flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
              >
                <div className="space-y-2">
                  <span className="inline-block text-[9px] font-black uppercase tracking-widest bg-slate-900 border border-slate-800 text-school-accent px-2 py-0.5 rounded">
                    {notice.category}
                  </span>
                  <h3 className="font-bold text-white text-base group-hover:text-amber-400 transition-colors line-clamp-1">{notice.title}</h3>
                  <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed max-w-2xl">{notice.content}</p>
                </div>
                <span className="text-xs font-bold text-slate-500 group-hover:text-school-accent transition-colors shrink-0 hidden sm:inline">
                  Read Circular ➔
                </span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* 🔮 BROAD NOTICE MODAL DRAWER OVERLAY */}
      {selectedNotice && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4" onClick={() => setSelectedNotice(null)}>
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 max-w-lg w-full shadow-2xl space-y-4 animate-fade-in relative" onClick={e => e.stopPropagation()}>
            <button className="absolute top-4 right-4 text-slate-400 hover:text-white border border-slate-800 p-1.5 rounded-full bg-slate-950/45 cursor-pointer" onClick={() => setSelectedNotice(null)}>✕</button>
            <span className="inline-block text-[10px] font-black uppercase tracking-widest bg-slate-950 border border-slate-800 text-school-accent px-3 py-1 rounded">{selectedNotice.category} Notice</span>
            <h3 className="text-xl font-black text-white leading-snug pt-2 border-b border-slate-800 pb-3">{selectedNotice.title}</h3>
            <p className="text-sm text-slate-300 leading-relaxed max-h-[50vh] overflow-y-auto whitespace-pre-line pr-2">{selectedNotice.content}</p>
          </div>
        </div>
      )}

    </div>
  );
}