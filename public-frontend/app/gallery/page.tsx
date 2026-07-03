'use client';
import { useEffect, useState } from 'react';
import api from '../../utils/api';

interface GalleryItem {
  _id: string;
  imageUrl: string;
  caption: string;
  category: string;
}

export default function GalleryPage() {
  const [images, setImages] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGallery = async () => {
      try {
        const res = await api.get('/gallery');
        setImages(res.data);
      } catch (err) {
        console.error('Error loading gallery assets:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchGallery();
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-12">
        
        {/* Header Title */}
        <div className="text-center space-y-2">
          <h1 className="text-4xl font-extrabold text-blue-950 tracking-tight">Campus Gallery & Life</h1>
          <div className="h-1 w-20 bg-amber-500 mx-auto rounded-full"></div>
          <p className="text-slate-500 text-sm">A visual snapshot of our state-of-the-art facilities, campus events, and student environment.</p>
        </div>

        {/* Dynamic Image Grid */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 animate-pulse">
            {[1, 2, 3, 4].map(i => <div key={i} className="aspect-video sm:aspect-square bg-slate-200 rounded-xl"></div>)}
          </div>
        ) : images.length === 0 ? (
          <div className="text-center py-12 text-slate-400 italic">
            No campus photos uploaded yet.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {images.map((img) => (
              <div key={img._id} className="bg-white rounded-xl overflow-hidden shadow-md group hover:shadow-xl transition-all border border-slate-100">
                <div className="relative overflow-hidden aspect-video bg-slate-100">
                  <img 
                    src={img.imageUrl} 
                    alt={img.caption} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <span className="absolute top-3 left-3 bg-blue-950/80 backdrop-blur text-white text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded shadow-sm">
                    {img.category || 'Campus'}
                  </span>
                </div>
                <div className="p-4 bg-white border-t border-slate-50">
                  <p className="text-sm text-slate-700 font-medium line-clamp-2 leading-relaxed">
                    {img.caption}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
}