import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const LandingPage: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  if (user) { navigate('/home'); return null; }

  return (
    <div className="min-h-screen bg-[#141414] text-white">
      {/* Hero */}
      <div
        className="relative min-h-screen flex flex-col"
        style={{ background: 'linear-gradient(to bottom, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0.4) 50%, rgba(20,20,20,1) 100%), url(https://assets.nflxext.com/ffe/siteui/vlv3/fc2aad82-5571-432b-b669-5a29e5a42879/6aec8a75-7831-4ac7-8de5-9b01cff43ab0/RS-en-20240205-popsignuptwoweeks-perspective_alpha_website_large.jpg) center/cover no-repeat' }}
      >
        {/* Navbar */}
        <nav className="flex items-center justify-between px-6 md:px-16 py-4">
          <div className="text-[#E50914] font-extrabold text-3xl tracking-tight">NETFLUX</div>
          <div className="flex items-center gap-3">
            <select className="bg-transparent border border-gray-500 text-white text-sm px-3 py-1.5 rounded">
              <option value="en">English</option>
              <option value="id">Bahasa Indonesia</option>
            </select>
            <Link to="/login" className="bg-[#E50914] text-white text-sm font-medium px-5 py-2 rounded hover:bg-red-700 transition-colors">
              Sign In
            </Link>
          </div>
        </nav>

        {/* Hero Content */}
        <div className="flex-1 flex flex-col items-center justify-center text-center px-4 pb-32">
          <h1 className="text-4xl md:text-6xl font-black mb-4 leading-tight">
            Unlimited movies, TV<br />shows, and more
          </h1>
          <p className="text-xl md:text-2xl text-gray-200 mb-2">Watch anywhere. Cancel anytime.</p>
          <p className="text-lg text-gray-300 mb-8">Ready to watch? Create an account to get started.</p>
          <div className="flex flex-col sm:flex-row gap-3 w-full max-w-xl">
            <input
              type="email"
              placeholder="Email address"
              className="flex-1 bg-black/60 border border-gray-500 text-white px-4 py-4 rounded text-sm focus:outline-none focus:border-white placeholder-gray-400"
            />
            <Link
              to="/register"
              className="bg-[#E50914] hover:bg-red-700 text-white font-bold px-8 py-4 rounded text-lg transition-colors whitespace-nowrap flex items-center gap-2 justify-center"
            >
              Get Started
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>
      </div>

      {/* Features */}
      <div className="bg-[#141414]">
        {[
          {
            title: 'Enjoy on your TV.',
            desc: 'Watch on Smart TVs, Playstation, Xbox, Chromecast, Apple TV, Blu-ray players, and more.',
            img: 'https://assets.nflxext.com/ffe/siteui/vlv3/a72cc5d3-4c13-459e-b44a-b0cc44c64ae5/92e9c8ee-67dc-48a6-8e38-9a554d5c9da0/TR-en-20240205-popsignuptwoweeks-perspective_alpha_website_large.jpg',
            reverse: false,
          },
          {
            title: 'Download your shows to watch offline.',
            desc: 'Save your favorites easily and always have something to watch.',
            img: 'https://assets.nflxext.com/ffe/siteui/vlv3/c03b0b7e-ca00-4770-879f-a544d46de11b/d7b0395e-4039-4bd7-a04b-8494e37bee15/SA-en-20240205-popsignuptwoweeks-perspective_alpha_website_large.jpg',
            reverse: true,
          },
          {
            title: 'Watch everywhere.',
            desc: 'Stream unlimited movies and TV shows on your phone, tablet, laptop, and TV.',
            img: 'https://assets.nflxext.com/ffe/siteui/vlv3/fc2aad82-5571-432b-b669-5a29e5a42879/6aec8a75-7831-4ac7-8de5-9b01cff43ab0/RS-en-20240205-popsignuptwoweeks-perspective_alpha_website_large.jpg',
            reverse: false,
          },
        ].map((feat, i) => (
          <div key={i} className="border-t-8 border-gray-800">
            <div className={`max-w-6xl mx-auto px-6 py-16 flex flex-col md:flex-row items-center gap-12 ${feat.reverse ? 'md:flex-row-reverse' : ''}`}>
              <div className="flex-1">
                <h2 className="text-3xl md:text-4xl font-black mb-4">{feat.title}</h2>
                <p className="text-gray-300 text-xl">{feat.desc}</p>
              </div>
              <div className="flex-1">
                <img src={feat.img} alt={feat.title} className="rounded-lg shadow-2xl w-full" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* FAQ */}
      <div className="border-t-8 border-gray-800 bg-[#141414] py-16 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-black mb-8">Frequently Asked Questions</h2>
          {[
            ['What is Netflux?', 'Netflux is a streaming service that offers a wide variety of award-winning TV shows, movies, anime, documentaries, and more on thousands of internet-connected devices.'],
            ['How much does Netflux cost?', 'Watch Netflux on your smartphone, tablet, Smart TV, laptop, or streaming device, all for one fixed monthly fee.'],
            ['Where can I watch?', 'Watch anywhere, anytime. Sign in with your Netflux account to watch instantly on the web at netflix.com from your personal computer or on any internet-connected device.'],
          ].map(([q, a], i) => (
            <details key={i} className="mb-2 bg-gray-800 hover:bg-gray-700 rounded text-left transition-colors">
              <summary className="px-6 py-5 font-medium text-lg cursor-pointer list-none flex justify-between items-center">
                {q}
                <span className="text-2xl">+</span>
              </summary>
              <div className="px-6 pb-5 text-gray-300">{a}</div>
            </details>
          ))}
          <div className="mt-8">
            <p className="text-lg text-gray-300 mb-4">Ready to watch? Create an account to get started.</p>
            <Link to="/register" className="bg-[#E50914] hover:bg-red-700 text-white font-bold px-8 py-4 rounded text-lg transition-colors inline-flex items-center gap-2">
              Get Started
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
