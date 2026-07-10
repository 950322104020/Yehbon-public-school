import { useState, useEffect } from 'react';
import api from '../utils/api';

export default function Dashboard({ logout }) {
  const [activeTab, setActiveTab] = useState('notices');
  const [notices, setNotices] = useState([]);
  const [gallery, setGallery] = useState([]);
  const [inquiries, setInquiries] = useState([]);
  const [events, setEvents] = useState([]);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const [eventForm, setEventForm] = useState({ title: '', description: '', eventDate: '', location: '' });
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
        api.get('/api/events')
      ]);
      setNotices(nRes.data);
      setGallery(gRes.data);
      setInquiries(iRes.data);
      setEvents(eRes.data);
    } catch (err) {
      console.error("Error updating dashboard data sets:", err);
    }
  };

  const addNotice = async (e) => {
    e.preventDefault();
    try {
      await api.post('/api/notices', noticeForm);
      setNoticeForm({ title: '', content: '', category: 'General' });
      fetchData();
    } catch (err) {
      console.error('Failed to publish notice:', err);
      alert('Unable to publish notice. Please try again.');
    }
  };

  const addGallery = async (e) => {
    e.preventDefault();
    try {
      await api.post('/api/gallery', galleryForm);
      setGalleryForm({ imageUrl: '', caption: '', category: 'Campus' });
      fetchData();
    } catch (err) {
      console.error('Failed to add gallery image:', err);
      alert('Unable to add gallery image. Please try again.');
    }
  };

  const addEvent = async (e) => {
    e.preventDefault();
    try {
      await api.post('/api/events', eventForm);
      setEventForm({ title: '', description: '', eventDate: '', location: '' });
      fetchData();
    } catch (err) {
      console.error('Failed to create event:', err);
      alert('Unable to create event. Please try again.');
    }
  };

  const deleteItem = async (route, id) => {
    if (!confirm('Confirm deletion process?')) return;
    try {
      await api.delete(`/api/${route}/${id}`);
      fetchData();
    } catch (err) {
      console.error(`Failed to delete ${route} item:`, err);
      alert('Unable to delete item. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 flex flex-col md:flex-row font-sans">
      
      {/* 📱 PORTABLE RESPONSIVE TOP HEADER BAR */}
      <header className="w-full md:hidden bg-slate-950 px-5 py-4 flex justify-between items-center border-b border-slate-800 shadow-md sticky top-0 z-50">
        <div>
          <h1 className="text-base font-black tracking-tight text-white uppercase">Yehbon Admin</h1>
          <p className="text-[9px] text-amber-500 font-bold uppercase tracking-widest">Live Controller</p>
        </div>
        <div className="flex items-center space-x-3">
          <button onClick={logout} className="bg-slate-800 text-[10px] font-bold px-3 py-1.5 rounded text-white border border-slate-700">Log Out</button>
          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 text-slate-400 hover:text-white focus:outline-none"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isMobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </header>

      {/* 🖥️ SIDEBAR NAVIGATION (Hidden automatically on phones unless toggled open) */}
      <aside className={`
        ${isMobileMenuOpen ? 'block' : 'hidden'}
        md:block w-full md:w-64 bg-slate-950 border-r border-slate-800 p-4 space-y-2 flex-shrink-0
        fixed md:sticky top-[61px] md:top-0 h-[calc(100vh-61px)] md:h-screen z-40 transition-all overflow-y-auto
      `}>
        <div className="p-2 mb-4 hidden md:block border-b border-slate-800/60 pb-4">
          <h1 className="text-sm font-black tracking-wider text-white uppercase">Yehbon Admin Panel</h1>
          <p className="text-[9px] text-amber-500 font-bold uppercase tracking-widest mt-0.5">Control Terminal</p>
        </div>

        <nav className="space-y-1.5">
          {[
            { id: 'notices', label: 'Manage Notices', icon: '📢' },
            { id: 'gallery', label: 'Manage Gallery', icon: '🖼️' },
            { id: 'inquiries', label: 'Admission Leads', icon: '📥' },
            { id: 'events', label: 'Manage Events', icon: '📅' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => {
                setActiveTab(tab.id);
                setIsMobileMenuOpen(false); // Clean closing drawer on select toggle
              }}
              className={`w-full text-left px-4 py-3 rounded-lg text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                activeTab === tab.id ? 'bg-amber-500 text-slate-950' : 'text-slate-400 hover:bg-slate-800 hover:text-white'
              }`}
            >
              {tab.icon} {tab.label}
            </button>
          ))}
        </nav>

        <div className="pt-6 hidden md:block">
          <button onClick={logout} className="w-full bg-slate-900 hover:bg-rose-600/20 hover:text-rose-400 hover:border-rose-500/40 text-xs font-bold py-2.5 rounded-lg border border-slate-800 transition-all text-slate-400">
            Exit Console
          </button>
        </div>
      </aside>

      {/* 📦 PRIMARY DATA STAGE AREA CONTAINER */}
      <main className="flex-1 p-4 sm:p-6 md:p-8 overflow-x-hidden overflow-y-auto box-border w-full max-w-full">
        
        {/* A. NOTICE BULLETIN HUB */}
        {activeTab === 'notices' && (
          <div className="space-y-6 max-w-full">
            <form onSubmit={addNotice} className="bg-slate-950 p-4 sm:p-6 rounded-xl border border-slate-800 space-y-4 max-w-xl w-full">
              <h3 className="text-xs font-bold uppercase tracking-wider text-amber-500">Publish New Bulletin Notice</h3>
              <input type="text" placeholder="Notice Title" required value={noticeForm.title} onChange={e => setNoticeForm({...noticeForm, title: e.target.value})} className="w-full px-4 py-2 bg-slate-900 border border-slate-700 text-slate-200 rounded-lg text-sm focus:outline-none" />
              <textarea placeholder="Notice Body Content" required rows={3} value={noticeForm.content} onChange={e => setNoticeForm({...noticeForm, content: e.target.value})} className="w-full px-4 py-2 bg-slate-900 border border-slate-700 text-slate-200 rounded-lg text-sm focus:outline-none resize-none" />
              <select value={noticeForm.category} onChange={e => setNoticeForm({...noticeForm, category: e.target.value})} className="w-full px-4 py-2 bg-slate-900 border border-slate-700 text-slate-200 rounded-lg text-sm cursor-pointer focus:outline-none">
                {['General', 'Academic', 'Admission', 'Exam'].map(cat => <option key={cat} value={cat}>{cat}</option>)}
              </select>
              <button type="submit" className="w-full sm:w-auto bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold px-5 py-2.5 text-xs uppercase tracking-wider rounded-md cursor-pointer transition-colors">Publish Notice</button>
            </form>

            <div className="w-full overflow-x-auto rounded-xl border border-slate-800 bg-slate-950 shadow">
              <table className="min-w-full text-left text-sm whitespace-nowrap md:whitespace-normal">
                <thead className="bg-slate-800 text-[10px] font-bold uppercase tracking-widest text-slate-400 border-b border-slate-700">
                  <tr><th className="p-4">Title</th><th className="p-4">Category</th><th className="p-4 text-right">Actions</th></tr>
                </thead>
                <tbody className="divide-y divide-slate-800">
                  {notices.map(notice => (
                    <tr key={notice._id} className="hover:bg-slate-900/40">
                      <td className="p-4 font-semibold text-white max-w-xs truncate md:max-w-none md:whitespace-normal">{notice.title}</td>
                      <td className="p-4 text-xs text-slate-400 font-mono"><span className="bg-slate-900 px-2 py-1 rounded border border-slate-800">{notice.category}</span></td>
                      <td className="p-4 text-right"><button onClick={() => deleteItem('notices', notice._id)} className="bg-rose-500/10 hover:bg-rose-600 border border-rose-500/20 px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-rose-400 hover:text-white rounded transition-colors cursor-pointer">Delete</button></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* B. SHOWCASE PORTFOLIO ENGINE */}
        {activeTab === 'gallery' && (
          <div className="space-y-6">
            <form onSubmit={addGallery} className="bg-slate-950 p-4 sm:p-6 rounded-xl border border-slate-800 space-y-4 max-w-xl w-full">
              <h3 className="text-xs font-bold uppercase tracking-wider text-amber-500">Add New Campus Showcase Image</h3>
              <input type="url" placeholder="Direct Image link URL (.jpg or .png)" required value={galleryForm.imageUrl} onChange={e => setGalleryForm({...galleryForm, imageUrl: e.target.value})} className="w-full px-4 py-2 bg-slate-900 border border-slate-700 text-slate-200 rounded-lg text-sm focus:outline-none" />
              <input type="text" placeholder="Image Caption Description" required value={galleryForm.caption} onChange={e => setGalleryForm({...galleryForm, caption: e.target.value})} className="w-full px-4 py-2 bg-slate-900 border border-slate-700 text-slate-200 rounded-lg text-sm focus:outline-none" />
              <button type="submit" className="w-full sm:w-auto bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold px-5 py-2.5 text-xs uppercase tracking-wider rounded-md cursor-pointer transition-colors">Save to Gallery</button>
            </form>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {gallery.map(img => (
                <div key={img._id} className="bg-slate-950 border border-slate-800 rounded-xl overflow-hidden shadow relative group">
                  <img src={img.imageUrl} alt={img.caption} className="w-full aspect-video object-cover" />
                  <div className="p-3.5 bg-slate-950 flex justify-between items-center border-t border-slate-800">
                    <p className="text-xs text-slate-400 truncate max-w-[70%]">{img.caption}</p>
                    <button onClick={() => deleteItem('gallery', img._id)} className="text-[10px] font-bold text-rose-400 hover:text-rose-500 uppercase tracking-wider cursor-pointer transition-colors">Remove</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* C. INQUIRIES VIEWBOARD ENGINE */}
        {activeTab === 'inquiries' && (
          <div className="w-full overflow-x-auto rounded-xl border border-slate-800 bg-slate-950 shadow">
            <table className="min-w-full text-left text-sm whitespace-nowrap">
              <thead className="bg-slate-800 text-[10px] font-bold uppercase tracking-widest text-slate-400 border-b border-slate-700">
                <tr><th className="p-4">Student</th><th className="p-4">Parent</th><th className="p-4">Contact Details</th><th className="p-4">Grade</th><th className="p-4">Message</th></tr>
              </thead>
              <tbody className="divide-y divide-slate-800 text-slate-300">
                {inquiries.map(inq => (
                  <tr key={inq._id} className="hover:bg-slate-900/40">
                    <td className="p-4 font-bold text-white">{inq.studentName}</td>
                    <td className="p-4 font-semibold text-slate-400">{inq.parentName}</td>
                    <td className="p-4 text-xs font-mono space-y-1">
                      <div className="flex items-center">✉️ <span className="ml-1 select-all">{inq.email}</span></div>
                      <div className="flex items-center">📞 <span className="ml-1 select-all">{inq.phone}</span></div>
                    </td>
                    <td className="p-4"><span className="bg-blue-900/40 border border-blue-700/30 text-blue-400 text-[10px] font-bold px-2 py-0.5 rounded">{inq.gradeApplied}</span></td>
                    <td className="p-4 text-xs text-slate-400 max-w-xs truncate whitespace-normal">{inq.message || '—'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        
        {/* D. EVENT PLANNING SCHEDULER */}
        {activeTab === 'events' && (
          <div className="space-y-6">
            <form onSubmit={addEvent} className="bg-slate-950 p-4 sm:p-6 rounded-xl border border-slate-800 space-y-4 max-w-xl w-full">
              <h3 className="text-xs font-bold uppercase tracking-wider text-amber-500">Schedule New School Event</h3>
              <input type="text" placeholder="Event Title" required value={eventForm.title} onChange={e => setEventForm({...eventForm, title: e.target.value})} className="w-full px-4 py-2 bg-slate-900 border border-slate-700 text-slate-200 rounded-lg text-sm focus:outline-none" />
              <textarea placeholder="Event Details & Objectives" required rows={3} value={eventForm.description} onChange={e => setEventForm({...eventForm, description: e.target.value})} className="w-full px-4 py-2 bg-slate-900 border border-slate-700 text-slate-200 rounded-lg text-sm focus:outline-none resize-none" />
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <input type="date" required value={eventForm.eventDate} onChange={e => setEventForm({...eventForm, eventDate: e.target.value})} className="w-full px-4 py-2 bg-slate-900 border border-slate-700 text-slate-200 rounded-lg text-sm focus:outline-none" />
                <input type="text" placeholder="Venue/Location" required value={eventForm.location} onChange={e => setEventForm({...eventForm, location: e.target.value})} className="w-full px-4 py-2 bg-slate-900 border border-slate-700 text-slate-200 rounded-lg text-sm focus:outline-none" />
              </div>
              <button type="submit" className="w-full sm:w-auto bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold px-5 py-2.5 text-xs uppercase tracking-wider rounded-md cursor-pointer transition-colors">Create Event</button>
            </form>

            <div className="w-full overflow-x-auto rounded-xl border border-slate-800 bg-slate-950 shadow">
              <table className="min-w-full text-left text-sm whitespace-nowrap md:whitespace-normal">
                <thead className="bg-slate-800 text-[10px] font-bold uppercase tracking-widest text-slate-400 border-b border-slate-700">
                  <tr><th className="p-4">Event Details</th><th className="p-4">Date & Venue</th><th className="p-4 text-right">Actions</th></tr>
                </thead>
                <tbody className="divide-y divide-slate-800">
                  {events.map(ev => (
                    <tr key={ev._id} className="hover:bg-slate-900/40">
                      <td className="p-4 max-w-xs md:max-w-none"><div className="font-bold text-white whitespace-normal">{ev.title}</div><div className="text-xs text-slate-400 mt-1 whitespace-normal">{ev.description}</div></td>
                      <td className="p-4 text-xs font-mono space-y-1"><div>📅 {new Date(ev.eventDate).toLocaleDateString()}</div><div>📍 {ev.location}</div></td>
                      <td className="p-4 text-right"><button onClick={() => deleteItem('events', ev._id)} className="bg-rose-500/10 hover:bg-rose-600 border border-rose-500/20 px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-rose-400 hover:text-white rounded transition-colors cursor-pointer">Delete</button></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

      </main>
    </div>
  );
}