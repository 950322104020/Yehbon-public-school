import { useState, useEffect } from 'react';
import api from '../utils/api';

export default function Dashboard({ logout }) {
  const [activeTab, setActiveTab] = useState('notices');
  const [notices, setNotices] = useState([]);
  const [gallery, setGallery] = useState([]);
  const [inquiries, setInquiries] = useState([]);
  const [events, setEvents] = useState([]);
const [eventForm, setEventForm] = useState({ title: '', description: '', eventDate: '', location: '' });

  // Form states
  const [noticeForm, setNoticeForm] = useState({ title: '', content: '', category: 'General' });
  const [galleryForm, setGalleryForm] = useState({ imageUrl: '', caption: '', category: 'Campus' });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [nRes, gRes, iRes, eRes] = await Promise.all([
        api.get('/api/notices'),
        api.get('/api/gallery'),
        api.get('/api/inquiries'),
        api.get('/api/events') // New API request pass
      ]);
      setNotices(nRes.data);
      setGallery(gRes.data);
      setInquiries(iRes.data);
      setEvents(eRes.data); // Save events state data
    } catch (err) {
      console.error("Error updating dashboard data sets:", err);
    }
  };

  // Mutators: Create items [cite: 8]
  const addNotice = async (e) => {
    e.preventDefault();
    await api.post('/api/notices', noticeForm);
    setNoticeForm({ title: '', content: '', category: 'General' });
    fetchData();
  };

  const addGallery = async (e) => {
    e.preventDefault();
    await api.post('/api/gallery', galleryForm);
    setGalleryForm({ imageUrl: '', caption: '', category: 'Campus' });
    fetchData();
  };

  // Mutators: Delete items [cite: 8]
  const deleteItem = async (route, id) => {
    if (confirm("Confirm deletion process?")) {
      await api.delete(`/api/${route}/${id}`);
      fetchData();
    }
  };

  const addEvent = async (e) => {
    e.preventDefault();
    await api.post('/api/events', eventForm);
    setEventForm({ title: '', description: '', eventDate: '', location: '' });
    fetchData();
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 flex flex-col">
      {/* Top Header Controls */}
      <header className="bg-slate-950 px-6 py-4 flex justify-between items-center border-b border-slate-800 shadow">
        <div>
          <h1 className="text-xl font-black tracking-tight text-white uppercase">Yehbon Administrative Console</h1>
          <p className="text-[10px] text-amber-500 font-bold uppercase tracking-widest mt-0.5">Live Data Controller</p>
        </div>
        <button onClick={logout} className="bg-slate-800 hover:bg-rose-600 text-xs font-bold px-4 py-2 rounded-md transition-colors border border-slate-700 cursor-pointer text-white">Log Out</button>
      </header>

      {/* Primary Sidebar Layout Core Split */}
      <div className="flex flex-1">
        {/* Navigation Sidebar */}
        <aside className="w-64 bg-slate-950 border-r border-slate-800 p-4 space-y-2">
          {['notices', 'gallery', 'inquiries', 'events'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`w-full text-left px-4 py-3 rounded-lg text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                activeTab === tab ? 'bg-amber-500 text-slate-950' : 'text-slate-400 hover:bg-slate-800 hover:text-white'
              }`}
            >
              {tab === 'notices' && '📢 Manage Notices'}
              {tab === 'gallery' && '🖼️ Manage Gallery'}
              {tab === 'inquiries' && '📥 Admission Leads'}
              {tab === 'events' && '📅 Manage Events'}
            </button>
          ))}
        </aside>

        {/* Dynamic Display Stage Content Panels */}
        <main className="flex-1 p-8 overflow-y-auto">
          
          {/* A. NOTICE MANAGEMENT FORMS AND MAPS [cite: 8] */}
          {activeTab === 'notices' && (
            <div className="space-y-8">
              <form onSubmit={addNotice} className="bg-slate-950 p-6 rounded-xl border border-slate-800 space-y-4 max-w-xl">
                <h3 className="text-sm font-bold uppercase tracking-wider text-amber-500">Publish New Bulletin Notice</h3>
                <input type="text" placeholder="Notice Title" required value={noticeForm.title} onChange={e => setNoticeForm({...noticeForm, title: e.target.value})} className="w-full px-4 py-2 bg-slate-900 border border-slate-700 text-slate-200 rounded-lg text-sm focus:outline-none" />
                <textarea placeholder="Notice Body Content Content" required rows={3} value={noticeForm.content} onChange={e => setNoticeForm({...noticeForm, content: e.target.value})} className="w-full px-4 py-2 bg-slate-900 border border-slate-700 text-slate-200 rounded-lg text-sm focus:outline-none resize-none" />
                <select value={noticeForm.category} onChange={e => setNoticeForm({...noticeForm, category: e.target.value})} className="w-full px-4 py-2 bg-slate-900 border border-slate-700 text-slate-200 rounded-lg text-sm cursor-pointer focus:outline-none">
                  {['General', 'Academic', 'Admission', 'Exam'].map(cat => <option key={cat} value={cat}>{cat}</option>)}
                </select>
                <button type="submit" className="bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold px-4 py-2 text-xs uppercase tracking-wider rounded-md cursor-pointer">Publish Notice</button>
              </form>
              <div className="bg-slate-950 rounded-xl border border-slate-800 overflow-hidden shadow">
                <table className="w-full text-left text-sm">
                  <thead className="bg-slate-800 text-[10px] font-bold uppercase tracking-widest text-slate-400 border-b border-slate-700">
                    <tr><th className="p-4">Title</th><th className="p-4">Category</th><th className="p-4 text-right">Actions</th></tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800">
                    {notices.map(notice => (
                      <tr key={notice._id} className="hover:bg-slate-900/40">
                        <td className="p-4 font-semibold text-white">{notice.title}</td>
                        <td className="p-4 text-xs text-slate-400 font-mono">{notice.category}</td>
                        <td className="p-4 text-right"><button onClick={() => deleteItem('notices', notice._id)} className="bg-rose-500/10 hover:bg-rose-600 border border-rose-500/20 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-rose-400 hover:text-white rounded transition-colors cursor-pointer">Delete</button></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* B. GALLERY FILE MANAGEMENT PANEL [cite: 8] */}
          {activeTab === 'gallery' && (
            <div className="space-y-8">
              <form onSubmit={addGallery} className="bg-slate-950 p-6 rounded-xl border border-slate-800 space-y-4 max-w-xl">
                <h3 className="text-sm font-bold uppercase tracking-wider text-amber-500">Add New Campus Showcase Image</h3>
                <input type="url" placeholder="Unsplash Image URL" required value={galleryForm.imageUrl} onChange={e => setGalleryForm({...galleryForm, imageUrl: e.target.value})} className="w-full px-4 py-2 bg-slate-900 border border-slate-700 text-slate-200 rounded-lg text-sm focus:outline-none" />
                <input type="text" placeholder="Image Caption Description" required value={galleryForm.caption} onChange={e => setGalleryForm({...galleryForm, caption: e.target.value})} className="w-full px-4 py-2 bg-slate-900 border border-slate-700 text-slate-200 rounded-lg text-sm focus:outline-none" />
                <button type="submit" className="bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold px-4 py-2 text-xs uppercase tracking-wider rounded-md cursor-pointer">Save to Gallery</button>
              </form>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {gallery.map(img => (
                  <div key={img._id} className="bg-slate-950 border border-slate-800 rounded-xl overflow-hidden shadow relative group">
                    <img src={img.imageUrl} alt={img.caption} className="w-full aspect-video object-cover" />
                    <div className="p-3 bg-slate-950 flex justify-between items-center border-t border-slate-800">
                      <p className="text-xs text-slate-400 truncate max-w-[70%]">{img.caption}</p>
                      <button onClick={() => deleteItem('gallery', img._id)} className="text-[10px] font-bold text-rose-400 hover:underline uppercase tracking-wider cursor-pointer">Remove</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* C. INQUIRIES VIEWBOARD TABLE PANEL [cite: 9] */}
          {activeTab === 'inquiries' && (
            <div className="bg-slate-950 rounded-xl border border-slate-800 overflow-hidden shadow">
              <table className="w-full text-left text-sm">
                <thead className="bg-slate-800 text-[10px] font-bold uppercase tracking-widest text-slate-400 border-b border-slate-700">
                  <tr><th className="p-4">Student</th><th className="p-4">Parent</th><th className="p-4">Contact Details</th><th className="p-4">Grade</th><th className="p-4">Message</th></tr>
                </thead>
                <tbody className="divide-y divide-slate-800 text-slate-300">
                  {inquiries.map(inq => (
                    <tr key={inq._id} className="hover:bg-slate-900/40">
                      <td className="p-4 font-bold text-white">{inq.studentName}</td>
                      <td className="p-4 font-semibold text-slate-400">{inq.parentName}</td>
                      <td className="p-4 text-xs font-mono space-y-0.5"><div>✉️ {inq.email}</div><div>📞 {inq.phone}</div></td>
                      <td className="p-4"><span className="bg-blue-900/40 border border-blue-700/30 text-blue-400 text-[10px] font-bold px-2 py-0.5 rounded">{inq.gradeApplied}</span></td>
                      <td className="p-4 text-xs text-slate-400 max-w-xs truncate">{inq.message || '—'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
          
{activeTab === 'events' && (
  <div className="space-y-8">
    <form onSubmit={addEvent} className="bg-slate-950 p-6 rounded-xl border border-slate-800 space-y-4 max-w-xl">
      <h3 className="text-sm font-bold uppercase tracking-wider text-amber-500">Schedule New School Event</h3>
      <input type="text" placeholder="Event Title" required value={eventForm.title} onChange={e => setEventForm({...eventForm, title: e.target.value})} className="w-full px-4 py-2 bg-slate-900 border border-slate-700 text-slate-200 rounded-lg text-sm focus:outline-none" />
      <textarea placeholder="Event Details & Objectives" required rows={3} value={eventForm.description} onChange={e => setEventForm({...eventForm, description: e.target.value})} className="w-full px-4 py-2 bg-slate-900 border border-slate-700 text-slate-200 rounded-lg text-sm focus:outline-none resize-none" />
      <div className="grid grid-cols-2 gap-4">
        <input type="date" required value={eventForm.eventDate} onChange={e => setEventForm({...eventForm, eventDate: e.target.value})} className="px-4 py-2 bg-slate-900 border border-slate-700 text-slate-200 rounded-lg text-sm focus:outline-none" />
        <input type="text" placeholder="Venue/Location" required value={eventForm.location} onChange={e => setEventForm({...eventForm, location: e.target.value})} className="px-4 py-2 bg-slate-900 border border-slate-700 text-slate-200 rounded-lg text-sm focus:outline-none" />
      </div>
      <button type="submit" className="bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold px-4 py-2 text-xs uppercase tracking-wider rounded-md cursor-pointer">Create Event</button>
    </form>

    <div className="bg-slate-950 rounded-xl border border-slate-800 overflow-hidden shadow">
      <table className="w-full text-left text-sm">
        <thead className="bg-slate-800 text-[10px] font-bold uppercase tracking-widest text-slate-400 border-b border-slate-700">
          <tr><th className="p-4">Event Details</th><th className="p-4">Date & Venue</th><th className="p-4 text-right">Actions</th></tr>
        </thead>
        <tbody className="divide-y divide-slate-800">
          {events.map(ev => (
            <tr key={ev._id} className="hover:bg-slate-900/40">
              <td className="p-4"><div className="font-bold text-white">{ev.title}</div><div className="text-xs text-slate-400 mt-0.5">{ev.description}</div></td>
              <td className="p-4 text-xs font-mono space-y-0.5"><div>📅 {new Date(ev.eventDate).toLocaleDateString()}</div><div>📍 {ev.location}</div></td>
              <td className="p-4 text-right"><button onClick={() => deleteItem('events', ev._id)} className="bg-rose-500/10 hover:bg-rose-600 border border-rose-500/20 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-rose-400 hover:text-white rounded transition-colors cursor-pointer">Delete</button></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
)}

        </main>
      </div>
    </div>
  );
}