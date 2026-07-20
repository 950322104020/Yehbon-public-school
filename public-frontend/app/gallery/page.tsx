'use client';
import { useEffect, useState } from 'react';
import api from '../../utils/api';

interface GalleryItem {
  _id: string;
  imageUrl: string;
  caption: string;
  category?: string;
}

export default function GalleryPage() {
  const [gallery, setGallery] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);
  
  // 🔍 LIGHTBOX MODAL STATE
  const [selectedImage, setSelectedImage] = useState<GalleryItem | null>(null);

  useEffect(() => {
    const fetchGalleryData = async () => {
      try {
        const res = await api.get('/gallery');
        setGallery(res.data);
      } catch (err) {
        console.error("Error loading gallery assets:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchGalleryData();
  }, []);

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 py-12 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-7xl mx-auto space-y-12">
        
        {/* Page Main Header Title Banner */}
        <div className="text-center space-y-3">
          <h1 className="text-4xl font-black tracking-tight text-white uppercase">Campus Showcase Gallery</h1>
          <p className="text-xs font-semibold text-school-accent uppercase tracking-widest">A visual glimpse into student life and infrastructure</p>
          <div className="h-1 w-20 bg-school-accent mx-auto rounded-full mt-2"></div>
        </div>

        {/* Dynamic Photo Catalog Grid */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 animate-pulse">
            {[1, 2, 3, 4, 5, 6].map(i => (
              <div key={i} className="h-48 bg-slate-800 rounded-xl"></div>
            ))}
          </div>
        ) : gallery.length === 0 ? (
          <div className="text-center py-20 bg-slate-950 rounded-2xl border border-slate-800">
            <p className="text-sm text-slate-400 italic">No images published in the campus showcase registry yet.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {gallery.map((img) => (
              <div 
                key={img._id} 
                onClick={() => setSelectedImage(img)}
                className="bg-slate-950 rounded-xl overflow-hidden shadow-lg border border-slate-800/80 cursor-zoom-in group hover:border-school-accent/40 transition-all duration-300"
              >
                <div className="relative aspect-video overflow-hidden">
                  <img 
                    src={img.imageUrl} 
                    alt={img.caption} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 ease-out"
                  />
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity duration-300">
                    <span className="text-[10px] font-bold text-white uppercase tracking-wider bg-slate-900/80 px-3 py-1.5 rounded-full border border-slate-700">
                      🔍 Expand Image
                    </span>
                  </div>
                </div>
                {img.caption && (
                  <div className="p-4 border-t border-slate-900/60 bg-slate-950">
                    <p className="text-xs font-medium text-slate-300 truncate tracking-wide">{img.caption}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* 🔮 FULL-SCREEN LIGHTBOX OVERLAY DIALOG */}
      {selectedImage && (
        <div 
          className="fixed inset-0 z-50 bg-slate-950/90 backdrop-blur-md flex flex-col items-center justify-center p-4 sm:p-6 transition-all duration-300"
          onClick={() => setSelectedImage(null)}
        >
          {/* Close Icon Wrapper Button */}
          <button 
            className="absolute top-6 right-6 text-slate-400 hover:text-white transition-colors p-2 bg-slate-900/60 rounded-full border border-slate-800 cursor-pointer"
            onClick={() => setSelectedImage(null)}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          
          {/* Main Visual Frame Layer */}
          <div 
            className="relative max-w-5xl max-h-[78vh] w-full h-full flex items-center justify-center"
            onClick={(e) => e.stopPropagation()} 
          >
            <img 
              src={selectedImage.imageUrl} 
              alt={selectedImage.caption} 
              className="max-w-full max-h-full rounded-2xl shadow-2xl object-contain border border-slate-800"
            />
          </div>

          {/* Bottom Descriptive Caption Plate */}
          {selectedImage.caption && (
            <div className="mt-5 bg-slate-900 border border-slate-800 px-6 py-2.5 rounded-full shadow-xl text-center max-w-xl">
              <p className="text-xs text-slate-200 font-bold tracking-wide uppercase">{selectedImage.caption}</p>
            </div>
          )}
        </div>
      )}

    </div>
  );
}