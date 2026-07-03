import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300 border-t-4 border-amber-500">
      <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-3 gap-8">
        
        {/* About Section */}
        <div>
          <h3 className="text-white text-lg font-bold mb-4 tracking-wider uppercase">Yehbon Public School</h3>
          <p className="text-sm text-slate-400 leading-relaxed">
            Nurturing young intellects, unlocking latent secondary abilities, and architecting elite educational paths for tomorrow's structural industry leaders since 2010.
          </p>
        </div>

        {/* Informative Link Collections */}
        <div>
          <h3 className="text-white text-lg font-bold mb-4 tracking-wider uppercase">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li><Link href="/admissions" className="hover:text-amber-400 transition-colors">Admissions Portal</Link></li>
            <li><Link href="/notices" className="hover:text-amber-400 transition-colors">Latest Notices & Bulletins</Link></li>
            <li><Link href="/gallery" className="hover:text-amber-400 transition-colors">Campus Photo Gallery</Link></li>
          </ul>
        </div>

        {/* Static Address Details */}
        <div>
          <h3 className="text-white text-lg font-bold mb-4 tracking-wider uppercase">Contact Information</h3>
          <ul className="space-y-2 text-sm text-slate-400">
            <li>📍 Plot No. 12, Knowledge Park, Noida, UP</li>
            <li>📞 +91 98765 43210</li>
            <li>✉️ info@yehbonpublicschool.edu</li>
          </ul>
        </div>

      </div>

      {/* Underbar Copyright Bar */}
      <div className="bg-slate-950 py-4 text-center text-xs text-slate-500 border-t border-slate-800">
        &copy; {new Date().getFullYear()} Yehbon Public School. All Rights Reserved. Designed securely via modern MERN architecture.
      </div>
    </footer>
  );
}