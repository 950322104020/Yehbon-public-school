'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import api from '../utils/api';

interface Notice {
  _id: string;
  title: string;
  content: string;
  category: string;
}

interface EventItem {
  _id: string;
  title: string;
  description: string;
  eventDate: string;
  location: string;
}

interface GalleryItem {
  _id: string;
  imageUrl: string;
  caption: string;
}

export default function HomePage() {
  const [notices, setNotices] = useState<Notice[]>([]);
  const [gallery, setGallery] = useState<GalleryItem[]>([]);
  const [events, setEvents] = useState<EventItem[]>([]);
  const [loading, setLoading] = useState(true);

  const [currentSlide, setCurrentSlide] = useState(0);
  const [selectedImage, setSelectedImage] = useState<GalleryItem | null>(null);
  const [selectedNotice, setSelectedNotice] = useState<Notice | null>(null);
  const [selectedEvent, setSelectedEvent] = useState<EventItem | null>(null);
  
  const sliderImages = [
    "https://i.postimg.cc/3rgxdLsQ/Yehbon.jpg",
    "https://i.postimg.cc/PfzWCMZZ/yhbn.jpg", 
    "https://i.postimg.cc/pTkdHyhR/yhbn1.jpgg"
    
  ];

  useEffect(() => {
    const fetchHomepageData = async () => {
      try {
        const [noticeRes, galleryRes, eventRes] = await Promise.all([
          api.get('/notices'),
          api.get('/gallery'),
          api.get('/events').catch(() => ({ data: [] }))
        ]);
        setNotices(noticeRes.data.slice(0, 3));
        setGallery(galleryRes.data.slice(0, 4));
        setEvents(eventRes.data.slice(0, 3));
      } catch (err) {
        console.error("Error loading school details:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchHomepageData();

    const slideInterval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % sliderImages.length);
    }, 4500);

    return () => clearInterval(slideInterval);
  }, []);

  return (
    <div className="space-y-24 pb-24 w-full overflow-x-hidden bg-layout-bg text-text-main font-sans">
      
      {/* 1. 🎞️ ARCHITECTURAL HERO BANNER */}
      <section className="relative h-[85vh] w-full flex items-center justify-center bg-black text-white overflow-hidden">
        {sliderImages.map((image, index) => (
          <div
            key={index}
            style={{ backgroundImage: `url('${image}')` }}
            className={`absolute inset-0 bg-cover bg-center bg-no-repeat transition-all duration-1000 ${
              index === currentSlide ? 'opacity-40 scale-105' : 'opacity-0 scale-100'
            }`}
          />
        ))}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-emerald-950/20 to-layout-bg" />

        <div className="relative z-10 max-w-4xl mx-auto text-center px-6 space-y-6">
          <span className="inline-block bg-school-accent text-slate-950 px-5 py-1.5 rounded-full text-xs font-bold tracking-widest uppercase shadow">
            Registration Open Session 2026-2027
          </span>
          <h1 className="text-4xl sm:text-6xl font-light tracking-tight leading-none text-white drop-shadow-lg">
            Shaping Thinkers,<br />
            <span className="font-bold text-school-accent">Creating Leaders, Defining Tomorrows</span>
          </h1>
          <p className="text-base sm:text-lg text-slate-200 max-w-xl mx-auto font-light leading-relaxed">
            Welcome to Yehbon Public School. We pair holistic academic tracks with modern structural labs to unlock creative potential.
          </p>
          <div className="pt-4 flex flex-wrap justify-center gap-4">
            <Link href="/admissions" className="bg-school-primary hover:bg-school-primary-hover text-white font-bold px-8 py-3.5 rounded-full shadow-lg transition-transform hover:scale-105 duration-200">
              Enroll Your Child
            </Link>
            <Link href="/notices" className="bg-white/10 hover:bg-white/20 text-white border border-white/30 font-medium px-8 py-3.5 rounded-full backdrop-blur-sm transition-all">
              View Bulletins
            </Link>
          </div>
        </div>
      </section>

      {/* 2. ⚡ RUNNING LIVE TICKER BANNER */}
      <div className="w-full bg-school-primary-dark text-white py-4 px-4 flex items-center shadow-lg -mt-20 z-20 relative border-y border-emerald-800">
        <span className="bg-school-accent text-slate-950 text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-sm shrink-0 mr-4">ANNOUNCEMENTS:</span>
        <div className="w-full overflow-hidden relative">
          <div className="whitespace-nowrap animate-marquee inline-block text-xs font-medium tracking-wide">
            ✨ Admission registration pathways are active! Submit online inquiry forms. 📢 Updates: Review notice sheets for revised dynamic campus calendar schedules.
          </div>
        </div>
      </div>

      {/* 3. "WHY CHOOSE US" CARDS SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-2 mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-school-primary">Why Choose Our Institution?</h2>
          <div className="h-1 w-16 bg-school-accent mx-auto rounded-full"></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { img: "🔬", title: "Modern STEM Labs", desc: "Hands-on learning workflows utilizing smart robotics configurations, electronic micro-controllers, and advanced chemistry setups." },
            { img: "🏅", title: "Elite Athletics", desc: "Expansive physical education grounds, curated football turfs, and expert track coaches focusing on individual discipline." },
            { img: "🌍", title: "Holistic Curriculum", desc: "Blending high-grade global classroom curricula with community values, creative arts, and logical problem solving." }
          ].map((item, idx) => (
            <div key={idx} className="bg-card-bg p-8 rounded-3xl shadow-sm border border-emerald-900/5 space-y-4 hover:shadow-md transition-all duration-300 group">
              <div className="text-3xl bg-layout-bg w-14 h-14 flex items-center justify-center rounded-2xl group-hover:scale-105 transition-transform duration-300">{item.img}</div>
              <h3 className="text-lg font-bold text-school-primary">{item.title}</h3>
              <p className="text-text-muted text-sm leading-relaxed font-light">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 4. 🏫 LEADERSHIP STATEMENT */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="bg-white rounded-[2rem] p-8 md:p-12 shadow-sm border border-emerald-900/5 grid grid-cols-1 md:grid-cols-12 gap-12 items-center">
          <div className="md:col-span-4 flex justify-center">
            <div className="relative max-w-xs w-full">
              <div className="absolute inset-0 bg-school-primary/5 rounded-[2rem] transform translate-x-3 translate-y-3"></div>
              <img 
                src="https://i.postimg.cc/cJN38KFf/Terry-sir.jpg" 
                alt="Principal" 
                className="relative z-10 rounded-[2rem] object-cover aspect-[4/5] border border-slate-100 w-full" 
              />
            </div>
          </div>
          <div className="md:col-span-8 space-y-5">
            <span className="text-xs font-bold tracking-widest text-school-primary uppercase">From the Administrator's Desk</span>
            <h2 className="text-3xl font-bold tracking-tight text-school-primary">Message From Our Principal</h2>
            <p className="text-text-main leading-relaxed font-light italic text-base border-l-2 border-school-accent pl-4">
              "At Yehbon Public School, we believe that text documents alone do not forge leaders. True education happens when curiosity is backed by high-tier equipment, and character development is prioritized right alongside standard evaluations."
            </p>
            <div className="pt-2">
              <h4 className="font-bold text-school-primary text-lg">Mr.Terry Mize</h4>
              <p className="text-xs font-medium text-text-muted uppercase tracking-widest mt-0.5">Principal & Academic Chair, MA in English Literature</p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. 📢 DUAL BULLETIN BOARD SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 gap-12">
        
        {/* Bulletins Feed */}
        <div className="space-y-6">
          <div className="flex justify-between items-baseline border-b pb-3 border-emerald-900/10">
            <h3 className="text-xl font-bold text-school-primary tracking-tight">Recent Announcements</h3>
            <Link href="/notices" className="text-xs font-bold text-school-primary hover:underline uppercase tracking-wider">All Bulletins &rarr;</Link>
          </div>
          {loading ? (
            <div className="space-y-4 animate-pulse">{[1, 2].map(i => <div key={i} className="h-24 bg-slate-200 rounded-2xl"></div>)}</div>
          ) : (
            <div className="space-y-4">
              {notices.map((notice) => (
                <div 
                  key={notice._id} 
                  onClick={() => setSelectedNotice(notice)}
                  className="p-5 bg-card-bg rounded-2xl border border-emerald-900/5 shadow-xs hover:border-school-primary/30 transition-all cursor-pointer group"
                >
                  <div className="flex justify-between items-center">
                    <span className="text-[9px] font-bold uppercase tracking-wider bg-layout-bg text-school-primary px-2 py-0.5 rounded">{notice.category}</span>
                    <span className="text-[10px] text-text-muted group-hover:text-school-primary font-bold">Read Details ➔</span>
                  </div>
                  <h4 className="font-bold text-text-main text-sm mt-3 group-hover:text-school-primary transition-colors line-clamp-1">{notice.title}</h4>
                  <p className="text-xs text-text-muted mt-1.5 line-clamp-2 leading-relaxed font-light">{notice.content}</p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Events Feed */}
        <div className="space-y-6">
          <div className="flex justify-between items-baseline border-b pb-3 border-emerald-900/10">
            <h3 className="text-xl font-bold text-school-primary tracking-tight">Upcoming Campus Events</h3>
            <Link href="/events" className="text-xs font-bold text-school-primary hover:underline uppercase tracking-wider"> Roster &rarr;</Link>
          </div>
          {loading ? (
            <div className="space-y-4 animate-pulse">{[1, 2].map(i => <div key={i} className="h-24 bg-slate-200 rounded-2xl"></div>)}</div>
          ) : (
            <div className="space-y-4">
              {events.map((ev) => (
                <div 
                  key={ev._id} 
                  onClick={() => setSelectedEvent(ev)}
                  className="p-5 bg-card-bg rounded-2xl border border-emerald-900/5 shadow-xs hover:border-school-primary/30 transition-all cursor-pointer group"
                >
                  <div className="flex items-center justify-between text-xs text-school-primary font-mono font-bold">
                    <div>📅 <span className="ml-1 text-text-muted font-sans font-light">{new Date(ev.eventDate).toLocaleDateString()}</span></div>
                    <span className="text-[10px] text-text-muted group-hover:text-school-primary font-bold">Venue Details ➔</span>
                  </div>
                  <h4 className="font-bold text-text-main text-sm mt-3 group-hover:text-school-primary transition-colors line-clamp-1">{ev.title}</h4>
                  <p className="text-xs text-text-muted mt-1 line-clamp-2 font-light">{ev.description}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* 6. 🖼️ FULL WIDTH HORIZONTAL PREVIEW GALLERY */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="flex justify-between items-baseline border-b pb-3 border-emerald-900/10">
          <h3 className="text-xl font-bold text-school-primary tracking-tight">Campus Showcase Gallery</h3>
          <Link href="/gallery" className="text-xs font-bold text-school-primary hover:underline uppercase tracking-wider">Full View &rarr;</Link>
        </div>
        {loading ? (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 animate-pulse">{[1, 2, 3, 4].map(i => <div key={i} className="h-36 bg-slate-200 rounded-2xl"></div>)}</div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {gallery.slice(0, 4).map((img) => (
              <div 
                key={img._id} 
                onClick={() => setSelectedImage(img)} 
                className="relative group rounded-2xl overflow-hidden aspect-video shadow-xs border border-emerald-900/5 cursor-zoom-in"
              >
                <img src={img.imageUrl} alt={img.caption} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute inset-0 bg-school-primary/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <span className="text-[10px] font-bold text-white uppercase bg-school-primary/80 px-3 py-1.5 rounded-full border border-white/20">Expand</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* ==================== 🔮 DETAILED VIEW DIALOG WINDOWS ==================== */}

      {/* I. BROAD NOTICE MODAL */}
      {selectedNotice && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-4" onClick={() => setSelectedNotice(null)}>
          <div className="bg-white border border-slate-100 rounded-3xl p-6 max-w-lg w-full shadow-2xl space-y-4 relative text-text-main" onClick={e => e.stopPropagation()}>
            <button className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 px-2 py-1 rounded-full bg-slate-100 cursor-pointer" onClick={() => setSelectedNotice(null)}>✕</button>
            <span className="inline-block text-[10px] font-bold uppercase tracking-wider bg-layout-bg border border-emerald-900/5 text-school-primary px-3 py-1 rounded-full">{selectedNotice.category} Circular</span>
            <h3 className="text-xl font-bold text-school-primary leading-snug pt-2 border-b border-slate-100 pb-3">{selectedNotice.title}</h3>
            <p className="text-sm text-text-muted leading-relaxed max-h-[50vh] overflow-y-auto whitespace-pre-line pr-2 font-light">{selectedNotice.content}</p>
          </div>
        </div>
      )}

      {/* II. BROAD EVENT MODAL */}
      {selectedEvent && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-4" onClick={() => setSelectedEvent(null)}>
          <div className="bg-white border border-slate-100 rounded-3xl p-6 max-w-lg w-full shadow-2xl space-y-4 relative text-text-main" onClick={e => e.stopPropagation()}>
            <button className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 px-2 py-1 rounded-full bg-slate-100 cursor-pointer" onClick={() => setSelectedEvent(null)}>✕</button>
            <div className="text-xs text-school-primary font-bold uppercase tracking-wider">🎯 Event Blueprint Parameters</div>
            <h3 className="text-xl font-bold text-school-primary leading-snug pt-2 border-b border-slate-100 pb-3">{selectedEvent.title}</h3>
            <div className="grid grid-cols-2 gap-4 bg-layout-bg p-3 rounded-2xl border border-emerald-900/5 text-xs text-text-muted">
              <div>📅 TIMELINE SCHEDULE:<div className="text-school-primary font-bold mt-1">✓ {new Date(selectedEvent.eventDate).toLocaleDateString(undefined, {dateStyle: 'long'})}</div></div>
              <div>📍 TARGET VENUE:<div className="text-school-primary font-bold mt-1">📍 {selectedEvent.location}</div></div>
            </div>
            <p className="text-sm text-text-muted leading-relaxed max-h-[40vh] overflow-y-auto whitespace-pre-line pt-2 font-light">{selectedEvent.description}</p>
          </div>
        </div>
      )}

      {/* III. IMAGE LIGHTBOX OVERLAY */}
      {selectedImage && (
        <div className="fixed inset-0 z-50 bg-slate-950/95 backdrop-blur-xs flex flex-col items-center justify-center p-4" onClick={() => setSelectedImage(null)}>
          <button className="absolute top-6 right-6 text-white p-2 bg-white/10 hover:bg-white/20 rounded-full border border-white/10 cursor-pointer text-sm" onClick={() => setSelectedImage(null)}>✕ Close</button>
          <div className="relative max-w-5xl max-h-[75vh] w-full h-full flex items-center justify-center" onClick={e => e.stopPropagation()}>
            <img src={selectedImage.imageUrl} alt={selectedImage.caption} className="max-w-full max-h-full rounded-2xl shadow-2xl object-contain border border-white/5" />
          </div>
          {selectedImage.caption && (
            <div className="mt-4 bg-white/10 border border-white/10 text-white px-6 py-2 rounded-full text-xs font-medium tracking-wide shadow-lg">{selectedImage.caption}</div>
          )}
        </div>
      )}

    </div>
  );
}