
import React, { useState } from 'react';
import DashboardLayout from '../components/DashboardLayout';

export default function Settings() {
  const [activeSection, setActiveSection] = useState('Personal information');
  const [formData, setFormData] = useState({
    email: '',
    phone: '',
    country: '',
    language: '',
    about: ''
  });

  const settingsSections = [
    { id: 'appearance', label: 'Appearance', color: 'bg-red-500' },
    { id: 'personal', label: 'Personal information', color: 'bg-blue-500' },
    { id: 'security', label: 'Security', color: 'bg-red-500' },
    { id: 'billing', label: 'Billing information', color: 'bg-cyan-500' },
    { id: 'messages', label: 'Messages', color: 'bg-blue-500' },
    { id: 'data', label: 'Data export', color: 'bg-blue-500' }
  ];

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <DashboardLayout>
      <div className="flex">
        {/* Settings Sidebar */}
        <div className="w-80 pr-8">
          <h1 className="text-3xl font-bold mb-8">Settings</h1>
          
          <div className="space-y-2">
            {settingsSections.map((section) => (
              <button
                key={section.id}
                onClick={() => setActiveSection(section.label)}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                  activeSection === section.label
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-400 hover:text-white hover:bg-gray-800'
                }`}
              >
                <div className={`w-3 h-3 rounded-full ${section.color}`}></div>
                <span>{section.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Settings Content */}
        <div className="flex-1 max-w-2xl">
          <h2 className="text-2xl font-bold mb-2">Personal information</h2>
          <p className="text-gray-400 mb-8">
            This information will be displayed publicly so be careful what you share.
          </p>

          <div className="space-y-8">
            {/* Profile Section */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Profile</h3>
              <div className="bg-gray-800 rounded-lg p-6 space-y-6">
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg"></div>
                  <div>
                    <button className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-700 mr-3">
                      Change
                    </button>
                    <button className="text-gray-400 text-sm hover:text-white">
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* About Section */}
            <div>
              <h3 className="text-lg font-semibold mb-4">About</h3>
              <div className="bg-gray-800 rounded-lg p-6">
                <textarea
                  placeholder="Brief description for your profile. URLs are hyperlinked."
                  className="w-full bg-gray-700 border border-gray-600 rounded-lg p-4 text-white placeholder-gray-400 resize-none h-24 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={formData.about}
                  onChange={(e) => handleInputChange('about', e.target.value)}
                />
              </div>
            </div>

            {/* Personal Information Section */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Personal Information</h3>
              <p className="text-gray-400 mb-4">
                This information will be displayed publicly so be careful what you share.
              </p>
              
              <div className="bg-gray-800 rounded-lg p-6 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-gray-300 text-sm font-medium mb-2">
                      Email address
                    </label>
                    <input
                      type="email"
                      className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="your.email@example.com"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                    />
                  </div>
                  
                  <div>
                    <label className="block text-gray-300 text-sm font-medium mb-2">
                      Phone number
                    </label>
                    <input
                      type="tel"
                      className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="+1 (555) 123-4567"
                      value={formData.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-gray-300 text-sm font-medium mb-2">
                      Country
                    </label>
                    <select
                      className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                      value={formData.country}
                      onChange={(e) => handleInputChange('country', e.target.value)}
                    >
                      <option value="">Select a country</option>
                      <option value="US">United States</option>
                      <option value="UK">United Kingdom</option>
                      <option value="CA">Canada</option>
                      <option value="AU">Australia</option>
                      <option value="DE">Germany</option>
                      <option value="FR">France</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-gray-300 text-sm font-medium mb-2">
                      Language
                    </label>
                    <select
                      className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                      value={formData.language}
                      onChange={(e) => handleInputChange('language', e.target.value)}
                    >
                      <option value="">Select a language</option>
                      <option value="en">English</option>
                      <option value="es">Spanish</option>
                      <option value="fr">French</option>
                      <option value="de">German</option>
                      <option value="ja">Japanese</option>
                      <option value="zh">Chinese</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-end space-x-4 pt-6">
              <button className="px-6 py-2 text-gray-400 hover:text-white transition-colors">
                Cancel
              </button>
              <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                Save
              </button>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
