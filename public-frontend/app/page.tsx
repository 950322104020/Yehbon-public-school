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

interface GalleryItem {
  _id: string;
  imageUrl: string;
  caption: string;
}

export default function HomePage() {
  const [notices, setNotices] = useState<Notice[]>([]);
  const [gallery, setGallery] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHomepageData = async () => {
      try {
        const [noticeRes, galleryRes] = await Promise.all([
          api.get('/notices'),
          api.get('/gallery')
        ]);
        setNotices(noticeRes.data.slice(0, 3));
        setGallery(galleryRes.data.slice(0, 4));
      } catch (err) {
        console.error("Error loading school homepage details:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchHomepageData();
  }, []);

  return (
    <div className="space-y-20 pb-20 w-full overflow-x-hidden bg-slate-50 text-slate-800">
      
      {/* 1. HERO SECTION */}
      <section className="relative h-[85vh] w-full flex items-center justify-center bg-slate-900 text-white overflow-hidden">
        <div className="absolute inset-0 z-0 bg-[url('https://i.postimg.cc/3rgxdLsQ/Yehbon.jpg')] bg-cover bg-center opacity-40"></div>
        <div className="relative z-10 max-w-5xl mx-auto text-center px-4 space-y-6">
          <span className="bg-amber-500 text-slate-900 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest shadow">
            Admissions Open 2026-2027
          </span>
          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight leading-tight">
            Nurturing Minds,<br /><span className="text-amber-400">Architecting Futures</span>
          </h1>
          <p className="text-lg sm:text-xl text-slate-200 max-w-2xl mx-auto font-light leading-relaxed">
            Welcome to Yehbon Public School. We pair holistic academic tracks with modern structural labs to unlock hidden creative potentials.
          </p>
          <div className="pt-4 flex flex-wrap justify-center gap-4">
            <Link href="/admissions" className="bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold px-8 py-3.5 rounded-md shadow-lg transition-all transform hover:-translate-y-0.5">
              Enroll Your Child
            </Link>
            <Link href="/notices" className="bg-white/10 hover:bg-white/20 backdrop-blur text-white border border-white/30 font-semibold px-8 py-3.5 rounded-md transition-all">
              View Notice Board
            </Link>
          </div>
        </div>
      </section>

      {/* 2. "WHY CHOOSE US" SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-3 mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-blue-950 tracking-tight">Why Choose Yehbon?</h2>
          <div className="h-1.5 w-24 bg-amber-500 mx-auto rounded-full"></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-8 rounded-xl shadow-md border-t-4 border-blue-950 space-y-4 hover:shadow-xl transition-all">
            <div className="text-3xl">🔬</div>
            <h3 className="text-xl font-bold text-slate-900">Modern STEM Labs</h3>
            <p className="text-slate-600 text-sm leading-relaxed">Hands-on learning workflows utilizing smart robotics configurations, electronic micro-controllers, and advanced chemistry setups.</p>
          </div>
          <div className="bg-white p-8 rounded-xl shadow-md border-t-4 border-amber-500 space-y-4 hover:shadow-xl transition-all">
            <div className="text-3xl">🏅</div>
            <h3 className="text-xl font-bold text-slate-900">Elite Athletics</h3>
            <p className="text-slate-600 text-sm leading-relaxed">Expansive physical education grounds, curated football turfs, and expert track coaches focusing on individual discipline.</p>
          </div>
          <div className="bg-white p-8 rounded-xl shadow-md border-t-4 border-blue-950 space-y-4 hover:shadow-xl transition-all">
            <div className="text-3xl">🌍</div>
            <h3 className="text-xl font-bold text-slate-900">Holistic Curriculum</h3>
            <p className="text-slate-600 text-sm leading-relaxed">Blending high-grade global classroom curricula with community values, creative arts, and logical problem solving.</p>
          </div>
        </div>
      </section>

      {/* 3. ABOUT US: MISSION & VISION SECTION */}
      <section className="bg-slate-100 py-16 border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center space-y-2">
            <span className="text-xs font-bold tracking-widest text-amber-600 uppercase">Our Foundation</span>
            <h2 className="text-3xl font-extrabold text-blue-950 tracking-tight">Mission & Vision</h2>
            <div className="h-1.5 w-16 bg-amber-500 mx-auto rounded-full"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto w-full">
            <div className="bg-white p-8 rounded-2xl shadow-sm border-b-4 border-blue-950 flex flex-col justify-between">
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <span className="text-2xl">🎯</span>
                  <h3 className="text-xl font-bold text-slate-900 tracking-tight">Our Mission</h3>
                </div>
                <p className="text-slate-600 text-sm leading-relaxed font-light">
                  To provide an accessible, technologically comprehensive learning framework that encourages critical evaluation, innovative experimentation, and moral fortitude. We ensure knowledge seamlessly translates into practical metrics.
                </p>
              </div>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-sm border-b-4 border-amber-500 flex flex-col justify-between">
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <span className="text-2xl">👁️‍🗨️</span>
                  <h3 className="text-xl font-bold text-slate-900 tracking-tight">Our Vision</h3>
                </div>
                <p className="text-slate-600 text-sm leading-relaxed font-light">
                  To position Yehbon Public School as a top-tier global benchmark for academic excellence. We visualize a future where our alumni lead technological, cultural, and corporate domains while retaining deep empathy.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. PRINCIPAL'S MESSAGE */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-center">
          <div className="md:col-span-4 flex justify-center">
            <div className="relative group max-w-xs">
              <div className="absolute inset-0 bg-amber-500 rounded-2xl transform rotate-3 group-hover:rotate-6 transition-transform shadow-md"></div>
              <img 
                src="https://i.postimg.cc/cJN38KFf/Terry-sir.jpg" 
                alt="Principal" 
                className="relative z-10 rounded-2xl object-cover shadow-md aspect-[4/5]" 
              />
            </div>
          </div>
          <div className="md:col-span-8 space-y-6">
            <span className="text-xs font-bold tracking-widest text-amber-600 uppercase">Leadership Statement</span>
            <h2 className="text-3xl font-bold text-blue-950 tracking-tight">Message From Our Principal</h2>
            <p className="text-slate-600 leading-relaxed font-light italic text-lg">
              "At Yehbon Public School, we believe that text documents alone do not forge leaders. True education happens when curiosity is backed by high-tier equipment, and character development is prioritized right alongside standard evaluations."
            </p>
            <div>
              <h4 className="font-bold text-slate-900 text-lg">MR.Terry Mize</h4>
              <p className="text-xs font-semibold text-amber-600 uppercase tracking-widest">Principal & Academic Chair,MA in English Literature</p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. DYNAMIC INFORMATION SHOWCASE */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-3 gap-12">
        
        {/* Notices Column */}
        <div className="lg:col-span-1 space-y-6">
          <div className="flex justify-between items-baseline border-b pb-3 border-slate-200">
            <h3 className="text-xl font-bold text-slate-900">Recent Bulletins</h3>
            <Link href="/notices" className="text-xs font-bold text-blue-900 hover:text-amber-500 uppercase tracking-wider transition-colors">See All &rarr;</Link>
          </div>
          {loading ? (
            <div className="space-y-4 animate-pulse">
              {[1, 2].map(i => <div key={i} className="h-20 bg-slate-200 rounded-lg"></div>)}
            </div>
          ) : notices.length === 0 ? (
            <p className="text-sm text-slate-400 italic">No notices found.</p>
          ) : (
            <div className="space-y-4">
              {notices.map((notice) => (
                <div key={notice._id} className="p-4 bg-white rounded-lg shadow-sm border-l-4 border-amber-500 hover:shadow transition-all">
                  <span className="text-[10px] font-bold uppercase tracking-widest bg-slate-100 text-slate-600 px-2 py-0.5 rounded">
                    {notice.category}
                  </span>
                  <h4 className="font-bold text-slate-800 text-sm mt-2 line-clamp-1">{notice.title}</h4>
                  <p className="text-xs text-slate-500 mt-1 line-clamp-2">{notice.content}</p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Gallery Preview Column */}
        <div className="lg:col-span-2 space-y-6">
          <div className="flex justify-between items-baseline border-b pb-3 border-slate-200">
            <h3 className="text-xl font-bold text-slate-900">Campus Preview</h3>
            <Link href="/gallery" className="text-xs font-bold text-blue-900 hover:text-amber-500 uppercase tracking-wider transition-colors">View Gallery &rarr;</Link>
          </div>
          {loading ? (
            <div className="grid grid-cols-2 gap-4 animate-pulse">
              {[1, 2, 3, 4].map(i => <div key={i} className="h-28 bg-slate-200 rounded-lg"></div>)}
            </div>
          ) : gallery.length === 0 ? (
            <p className="text-sm text-slate-400 italic">No gallery images found.</p>
          ) : (
            <div className="grid grid-cols-2 gap-4">
              {gallery.map((img) => (
                <div key={img._id} className="relative group rounded-xl overflow-hidden aspect-video shadow-sm">
                  <img src={img.imageUrl} alt={img.caption} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                </div>
              ))}
            </div>
          )}
        </div>

      </section>

    </div>
  );
}