import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { useAuth } from '../context/AuthContext';
import { userAPI } from '../services/api';

const AVATARS = [
  'https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png',
  'https://i.pravatar.cc/150?img=1',
  'https://i.pravatar.cc/150?img=2',
  'https://i.pravatar.cc/150?img=3',
  'https://i.pravatar.cc/150?img=4',
  'https://i.pravatar.cc/150?img=5',
];

const ProfilePage: React.FC = () => {
  const { user, updateUser, logout } = useAuth();
  const navigate = useNavigate();
  const [name, setName] = useState(user?.name || '');
  const [selectedAvatar, setSelectedAvatar] = useState(user?.avatar || AVATARS[0]);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [profileMsg, setProfileMsg] = useState('');
  const [passwordMsg, setPasswordMsg] = useState('');
  const [profileError, setProfileError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [saving, setSaving] = useState(false);
  const [changingPw, setChangingPw] = useState(false);
  const [pickingAvatar, setPickingAvatar] = useState(false);

  const handleProfileSave = async () => {
    setSaving(true); setProfileMsg(''); setProfileError('');
    try {
      const { data } = await userAPI.updateProfile({ name, avatar: selectedAvatar });
      updateUser({ name: data.user.name, avatar: data.user.avatar });
      setProfileMsg('Profile updated successfully!');
      setTimeout(() => setProfileMsg(''), 3000);
    } catch (err: any) {
      setProfileError(err.response?.data?.message || 'Failed to update profile');
    } finally { setSaving(false); }
  };

  const handlePasswordChange = async () => {
    if (!currentPassword || !newPassword) { setPasswordError('Please fill in both fields.'); return; }
    if (newPassword.length < 6) { setPasswordError('New password must be at least 6 characters.'); return; }
    setChangingPw(true); setPasswordMsg(''); setPasswordError('');
    try {
      await userAPI.changePassword({ currentPassword, newPassword });
      setPasswordMsg('Password changed successfully!');
      setCurrentPassword(''); setNewPassword('');
      setTimeout(() => setPasswordMsg(''), 3000);
    } catch (err: any) {
      setPasswordError(err.response?.data?.message || 'Failed to change password');
    } finally { setChangingPw(false); }
  };

  return (
    <div className="min-h-screen bg-[#141414] text-white">
      <Navbar />
      <div className="pt-24 px-4 max-w-3xl mx-auto">
        <div className="flex items-center gap-3 mb-8">
          <button onClick={() => navigate(-1)} className="text-gray-400 hover:text-white transition-colors">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <h1 className="text-3xl font-bold">Account</h1>
        </div>

        {/* Profile section */}
        <div className="bg-gray-900 rounded-lg p-6 mb-6">
          <h2 className="text-xl font-semibold mb-6 border-b border-gray-700 pb-4">Profile</h2>
          <div className="flex items-start gap-6 flex-col md:flex-row">
            {/* Avatar picker */}
            <div className="flex flex-col items-center gap-3">
              <img src={selectedAvatar} alt="avatar" className="w-24 h-24 rounded-lg object-cover" />
              <button onClick={() => setPickingAvatar(!pickingAvatar)} className="text-sm text-gray-400 hover:text-white underline transition-colors">
                Change
              </button>
              {pickingAvatar && (
                <div className="grid grid-cols-3 gap-2">
                  {AVATARS.map((av) => (
                    <img
                      key={av} src={av} alt="avatar option"
                      onClick={() => { setSelectedAvatar(av); setPickingAvatar(false); }}
                      className={`w-16 h-16 rounded-lg cursor-pointer object-cover transition-all ${selectedAvatar === av ? 'ring-4 ring-[#E50914]' : 'ring-2 ring-gray-600 hover:ring-white'}`}
                    />
                  ))}
                </div>
              )}
            </div>
            <div className="flex-1 space-y-4 w-full">
              <div>
                <label className="text-sm text-gray-400 block mb-1">Name</label>
                <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="w-full bg-gray-800 border border-gray-700 text-white px-4 py-3 rounded focus:outline-none focus:border-white" />
              </div>
              <div>
                <label className="text-sm text-gray-400 block mb-1">Email</label>
                <input type="email" value={user?.email || ''} disabled className="w-full bg-gray-800/50 border border-gray-700 text-gray-500 px-4 py-3 rounded cursor-not-allowed" />
              </div>
              {profileMsg && <p className="text-green-400 text-sm">{profileMsg}</p>}
              {profileError && <p className="text-red-400 text-sm">{profileError}</p>}
              <button onClick={handleProfileSave} disabled={saving} className="bg-white text-black font-bold px-6 py-2 rounded hover:bg-gray-200 transition-colors disabled:opacity-60">
                {saving ? 'Saving...' : 'Save Changes'}
              </button>
            </div>
          </div>
        </div>

        {/* Password section */}
        <div className="bg-gray-900 rounded-lg p-6 mb-6">
          <h2 className="text-xl font-semibold mb-6 border-b border-gray-700 pb-4">Change Password</h2>
          <div className="space-y-4 max-w-md">
            <div>
              <label className="text-sm text-gray-400 block mb-1">Current Password</label>
              <input type="password" value={currentPassword} onChange={(e) => setCurrentPassword(e.target.value)} className="w-full bg-gray-800 border border-gray-700 text-white px-4 py-3 rounded focus:outline-none focus:border-white" />
            </div>
            <div>
              <label className="text-sm text-gray-400 block mb-1">New Password</label>
              <input type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} className="w-full bg-gray-800 border border-gray-700 text-white px-4 py-3 rounded focus:outline-none focus:border-white" />
            </div>
            {passwordMsg && <p className="text-green-400 text-sm">{passwordMsg}</p>}
            {passwordError && <p className="text-red-400 text-sm">{passwordError}</p>}
            <button onClick={handlePasswordChange} disabled={changingPw} className="bg-white text-black font-bold px-6 py-2 rounded hover:bg-gray-200 transition-colors disabled:opacity-60">
              {changingPw ? 'Updating...' : 'Update Password'}
            </button>
          </div>
        </div>

        {/* Sign out */}
        <div className="bg-gray-900 rounded-lg p-6 mb-12">
          <h2 className="text-xl font-semibold mb-4 border-b border-gray-700 pb-4">Sign Out</h2>
          <p className="text-gray-400 text-sm mb-4">Sign out of your Netflux account on this device.</p>
          <button onClick={() => { logout(); navigate('/'); }} className="border border-gray-500 text-gray-300 hover:border-white hover:text-white font-medium px-6 py-2 rounded transition-colors">
            Sign Out
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
