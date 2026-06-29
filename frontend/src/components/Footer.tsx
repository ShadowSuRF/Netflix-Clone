import React from 'react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => (
  <footer className="bg-[#141414] text-gray-400 px-4 md:px-16 py-12 mt-8">
    <div className="max-w-4xl">
      <p className="mb-6 text-sm">Questions? Call 1-800-NETFLUX</p>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-xs mb-8">
        {[
          ['FAQ', 'Investor Relations', 'Privacy', 'Speed Test'],
          ['Help Center', 'Jobs', 'Cookie Preferences', ''],
          ['Account', 'Ways to Watch', 'Corporate Information', ''],
          ['Media Center', 'Terms of Use', 'Contact Us', ''],
        ].map((col, i) => (
          <ul key={i} className="space-y-3">
            {col.filter(Boolean).map((item) => (
              <li key={item}>
                <Link to="#" className="hover:underline hover:text-white transition-colors">{item}</Link>
              </li>
            ))}
          </ul>
        ))}
      </div>
      <div className="flex items-center gap-4 mb-4">
        <select className="bg-[#141414] border border-gray-600 text-gray-400 text-sm px-3 py-2 rounded">
          <option value="en">English</option>
          <option value="id">Bahasa Indonesia</option>
        </select>
      </div>
      <p className="text-xs text-gray-600">© 2024 Netflux Clone. Educational project only. Not affiliated with Netflix.</p>
    </div>
  </footer>
);

export default Footer;
