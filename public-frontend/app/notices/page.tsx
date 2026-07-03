'use client';
import { useEffect, useState } from 'react';
import api from '../../utils/api';

interface Notice {
  _id: string;
  title: string;
  content: string;
  date: string;
  category: string;
}

export default function NoticeBoardPage() {
  const [notices, setNotices] = useState<Notice[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState('All');

  useEffect(() => {
    const fetchNotices = async () => {
      try {
        const res = await api.get('/notices');
        setNotices(res.data);
      } catch (err) {
        console.error('Error fetching circulars:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchNotices();
  }, []);

  const categories = ['All', 'General', 'Academic', 'Admission', 'Exam'];

  const filteredNotices = activeFilter === 'All' 
    ? notices 
    : notices.filter(n => n.category === activeFilter);

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto space-y-8">
        
        {/* Page Title */}
        <div className="text-center space-y-2">
          <h1 className="text-4xl font-extrabold text-blue-950 tracking-tight">Notice Board & Circulars</h1>
          <div className="h-1 w-20 bg-amber-500 mx-auto rounded-full"></div>
          <p className="text-slate-500 text-sm">Stay updated with official academic mandates, announcements, and school events.</p>
        </div>

        {/* Categories Filtering Tab Row */}
        <div className="flex flex-wrap justify-center gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveFilter(cat)}
              className={`px-5 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all shadow-sm cursor-pointer ${
                activeFilter === cat 
                  ? 'bg-blue-950 text-white' 
                  : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Content Section */}
        {loading ? (
          <div className="space-y-4 animate-pulse">
            {[1, 2, 3].map(i => <div key={i} className="h-32 bg-slate-200 rounded-xl"></div>)}
          </div>
        ) : filteredNotices.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-xl shadow border border-slate-100 text-slate-400 italic">
            No active announcements found under this category.
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6">
            {filteredNotices.map((notice) => (
              <div key={notice._id} className="bg-white p-6 rounded-xl shadow-md border-l-8 border-amber-500 hover:shadow-lg transition-all flex flex-col md:flex-row justify-between md:items-center gap-4">
                <div className="space-y-2 flex-grow">
                  <div className="flex items-center gap-3">
                    <span className="text-[10px] font-bold uppercase tracking-widest bg-blue-50 text-blue-900 px-2.5 py-1 rounded border border-blue-100">
                      {notice.category}
                    </span>
                    <span className="text-xs text-slate-400 font-medium">
                      📅 {new Date(notice.date).toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' })}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 tracking-tight">{notice.title}</h3>
                  <p className="text-sm text-slate-600 leading-relaxed font-light">{notice.content}</p>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
}