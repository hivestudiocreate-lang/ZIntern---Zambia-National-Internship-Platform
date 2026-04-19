/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { 
  UserRole, 
  StudentProfile, 
  Internship 
} from './types';
import { MOCK_UNIVERSITIES, MOCK_USERS } from './services/mockData';
import { 
  LayoutDashboard, 
  Briefcase, 
  User as UserIcon, 
  LogOut, 
  Search, 
  PlusCircle, 
  CheckCircle, 
  XCircle, 
  Clock, 
  Building2, 
  GraduationCap,
  Filter,
  ChevronRight,
  Bell,
  Menu,
  X,
  Globe,
  Zap,
  Shield,
  Headphones,
  ArrowDown,
  Star,
  Check
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

// --- Sub-components (could be moved to separate files later) ---

const SupportModal: React.FC<{ 
  isOpen: boolean; 
  onClose: () => void; 
  type: 'CONTACT' | 'PRIVACY' 
}> = ({ isOpen, onClose, type }) => (
  <AnimatePresence>
    {isOpen && (
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
        <motion.div 
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }} 
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-secondary/80 backdrop-blur-sm"
        ></motion.div>
        <motion.div 
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
          className="bg-white w-full max-w-lg rounded-[2.5rem] overflow-hidden relative z-10 p-10 shadow-2xl"
        >
          <button onClick={onClose} className="absolute top-6 right-6 p-2 bg-slate-50 rounded-full text-slate-400 hover:text-secondary transition-colors">
            <X className="w-5 h-5" />
          </button>
          
          {type === 'CONTACT' ? (
            <div className="space-y-6">
              <div className="w-16 h-16 rounded-2xl zicta-gradient flex items-center justify-center shadow-lg">
                <Bell className="w-8 h-8 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-black text-secondary">Get in Touch</h2>
                <p className="text-slate-500">We're here to support your internship journey.</p>
              </div>
              <div className="space-y-4">
                <div className="flex items-center space-x-4 p-4 bg-slate-50 rounded-2xl border border-slate-100">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
                    <UserIcon className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-400 uppercase">Support Email</p>
                    <p className="text-slate-700 font-semibold">support@zintern.zm</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4 p-4 bg-slate-50 rounded-2xl border border-slate-100">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
                    <Building2 className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-400 uppercase">Office Location</p>
                    <p className="text-slate-700 font-semibold">ZICTA Head Office, Lusaka, Zambia</p>
                  </div>
                </div>
              </div>
              <button onClick={onClose} className="w-full py-4 zicta-gradient text-white font-bold rounded-2xl shadow-lg shadow-primary/20">
                Done
              </button>
            </div>
          ) : (
            <div className="space-y-6">
              <div className="w-16 h-16 rounded-2xl bg-slate-100 flex items-center justify-center shadow-sm">
                <Shield className="w-8 h-8 text-slate-400" />
              </div>
              <div>
                <h2 className="text-2xl font-black text-secondary">Privacy Policy</h2>
                <p className="text-slate-500">Your data security is our priority.</p>
              </div>
              <div className="max-h-60 overflow-y-auto pr-2 text-sm text-slate-600 space-y-4 leading-relaxed font-medium">
                <p><strong>1. Data Collection:</strong> We collect academic records, CVs, and contact information specifically for internship matching purposes.</p>
                <p><strong>2. Usage:</strong> Your profile is only visible to registered companies when you apply for their opportunities.</p>
                <p><strong>3. Protection:</strong> All data is stored securely in compliance with Zambian digital safety standards.</p>
                <p><strong>4. Consent:</strong> By using ZIntern, you agree to share your academic information with prospective employers and your university administration.</p>
              </div>
              <button onClick={onClose} className="w-full py-4 bg-slate-900 text-white font-bold rounded-2xl">
                I Understand
              </button>
            </div>
          )}
        </motion.div>
      </div>
    )}
  </AnimatePresence>
);

const BackgroundEffect = () => (
  <div className="fixed inset-0 -z-10 overflow-hidden bg-white">
    <motion.div
      animate={{
        scale: [1, 1.2, 1],
        rotate: [0, 90, 0],
        x: [0, 100, 0],
        y: [0, 50, 0],
      }}
      transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      className="absolute -top-[10%] -left-[10%] w-[50%] h-[50%] bg-primary/10 rounded-full blur-[100px]"
    />
    <motion.div
      animate={{
        scale: [1, 1.3, 1],
        rotate: [0, -120, 0],
        x: [0, -80, 0],
        y: [0, 100, 0],
      }}
      transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
      className="absolute top-[30%] -right-[10%] w-[60%] h-[60%] bg-secondary/5 rounded-full blur-[120px]"
    />
    <motion.div
      animate={{
        scale: [1, 1.5, 1],
        x: [0, 50, 0],
        y: [0, -100, 0],
      }}
      transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
      className="absolute -bottom-[10%] left-[20%] w-[45%] h-[45%] bg-accent/5 rounded-full blur-[100px]"
    />
  </div>
);

const SidebarLink: React.FC<{ 
  icon: React.ReactNode; 
  label: string; 
  active: boolean; 
  onClick: () => void 
}> = ({ icon, label, active, onClick }) => (
  <button
    onClick={onClick}
    className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 ${
      active 
        ? 'bg-primary text-white shadow-lg shadow-primary/20' 
        : 'text-slate-600 hover:bg-slate-100 hover:text-primary'
    }`}
  >
    {icon}
    <span className="font-medium">{label}</span>
  </button>
);

const Navbar: React.FC<{ onToggleMenu: () => void }> = ({ onToggleMenu }) => {
  const { user, logout, notifications } = useApp();
  const [showNotifications, setShowNotifications] = useState(false);
  
  return (
    <header className="h-16 border-b border-slate-200 bg-white/80 backdrop-blur-sm sticky top-0 z-40 px-4 flex items-center justify-between">
      <div className="flex items-center space-x-4">
        <button onClick={onToggleMenu} className="lg:hidden text-slate-600 hover:text-primary transition-colors">
          <Menu className="w-6 h-6" />
        </button>
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 rounded-lg zicta-gradient flex items-center justify-center">
            <Briefcase className="w-5 h-5 text-white" />
          </div>
          <span className="font-bold text-xl tracking-tight text-secondary">ZIntern</span>
        </div>
      </div>

      <div className="flex items-center space-x-4">
        <div className="relative">
          <button 
            onClick={() => setShowNotifications(!showNotifications)}
            className="p-2 text-slate-500 hover:text-primary hover:bg-slate-50 rounded-full transition-all relative"
          >
            <Bell className="w-5 h-5" />
            <span className="absolute top-2 right-2 w-2 h-2 bg-accent rounded-full border-2 border-white"></span>
          </button>
          
          <AnimatePresence>
            {showNotifications && (
              <>
                <div className="fixed inset-0 z-10" onClick={() => setShowNotifications(false)}></div>
                <motion.div 
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  className="absolute right-0 mt-2 w-80 bg-white rounded-2xl shadow-xl border border-slate-100 z-20 overflow-hidden"
                >
                  <div className="p-4 border-b border-slate-50 flex justify-between items-center">
                    <h3 className="font-bold text-secondary">Notifications</h3>
                    <span className="text-[10px] bg-primary/10 text-primary px-2 py-0.5 rounded-full font-bold">New</span>
                  </div>
                  <div className="max-h-96 overflow-y-auto">
                    {notifications.map(n => (
                      <div key={n.id} className="p-4 hover:bg-slate-50 border-b border-slate-50 transition-colors">
                        <p className="text-sm font-bold text-secondary">{n.title}</p>
                        <p className="text-xs text-slate-500 mb-1">{n.message}</p>
                        <p className="text-[10px] text-slate-400">{n.date}</p>
                      </div>
                    ))}
                  </div>
                  <button className="w-full py-3 text-xs font-bold text-primary hover:bg-slate-50 transition-colors">
                    View all notifications
                  </button>
                </motion.div>
              </>
            )}
          </AnimatePresence>
        </div>
        <div className="h-8 w-px bg-slate-200 mx-2"></div>
        <div className="flex items-center space-x-3">
          <div className="text-right hidden sm:block">
            <p className="text-sm font-semibold text-secondary">{user?.name}</p>
            <p className="text-xs text-slate-500 capitalize">{user?.role.toLowerCase().replace('_', ' ')}</p>
          </div>
          <button onClick={logout} className="p-2 text-slate-500 hover:text-red-500 hover:bg-red-50 rounded-full transition-all">
            <LogOut className="w-5 h-5" />
          </button>
        </div>
      </div>
    </header>
  );
};

// --- Dashboards ---

const StudentDashboard: React.FC<{ activeView: string }> = ({ activeView }) => {
  const { internships, applyForInternship, toggleSaveInternship, applications, user, updateProfile } = useApp();
  const [activeTab, setActiveTab] = useState<'FEED' | 'APPLICATIONS' | 'PROFILE'>('FEED');
  const [filter, setFilter] = useState('');
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [showFilters, setShowFilters] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedInternship, setSelectedInternship] = useState<Internship | null>(null);

  const student = user as StudentProfile;
  const categories = ['All', ...new Set(internships.map(i => i.category))];

  const filteredInternships = internships.filter(i => {
    const matchesSearch = i.title.toLowerCase().includes(filter.toLowerCase()) || 
                         i.companyName.toLowerCase().includes(filter.toLowerCase()) ||
                         i.description.toLowerCase().includes(filter.toLowerCase());
    const matchesCategory = activeCategory === 'All' || i.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  const savedInternships = internships.filter(i => student.savedInternshipIds?.includes(i.id));

  // Determine which list to show based on activeView or activeTab
  const currentInternships = activeView === 'SAVED' ? savedInternships : filteredInternships;

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-secondary tracking-tight">
            {activeView === 'SAVED' ? 'Saved Internships' : `Hello, ${user?.name}`}
          </h1>
          <p className="text-slate-500">
            {activeView === 'SAVED' 
              ? 'Keep track of opportunities you are interested in.' 
              : "Find your next big opportunity in Zambia's growing industries."}
          </p>
        </div>
        
        {activeView === 'OVERVIEW' && (
          <div className="flex bg-white p-1 rounded-2xl border border-slate-200 self-start shadow-sm">
            {(['FEED', 'APPLICATIONS', 'PROFILE'] as const).map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-2 rounded-xl text-sm font-bold transition-all ${
                  activeTab === tab 
                    ? 'bg-primary text-white shadow-lg shadow-primary/20' 
                    : 'text-slate-600 hover:text-primary'
                }`}
              >
                {tab === 'FEED' ? 'All Internships' : tab === 'APPLICATIONS' ? 'Applied' : 'My Profile'}
              </button>
            ))}
          </div>
        )}
      </div>

      <AnimatePresence mode="wait">
        {(activeView === 'SAVED' || (activeView === 'OVERVIEW' && activeTab === 'FEED')) && (
          <motion.div
            key="feed"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="space-y-6"
          >
            {activeView !== 'SAVED' && (
              <div className="relative group">
                <div className="flex items-center bg-white border border-slate-200 rounded-[2rem] px-6 py-1 shadow-sm focus-within:ring-4 focus-within:ring-primary/10 transition-all">
                  <Search className="w-5 h-5 text-slate-400 mr-3" />
                  <input 
                    type="text" 
                    placeholder="Search by title, company, or category..." 
                    className="flex-1 bg-transparent border-none focus:ring-0 text-slate-900 placeholder:text-slate-400 py-4 font-medium"
                    value={filter}
                    onChange={(e) => setFilter(e.target.value)}
                  />
                  <button 
                    onClick={() => setShowFilters(!showFilters)}
                    className={`p-3 rounded-2xl transition-all ${showFilters ? 'bg-primary text-white shadow-lg shadow-primary/20' : 'bg-slate-50 text-slate-600 hover:bg-slate-100'}`}
                  >
                    <Filter className="w-5 h-5" />
                  </button>
                </div>

                <AnimatePresence>
                  {showFilters && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      className="absolute right-0 mt-4 w-64 bg-white rounded-3xl shadow-2xl border border-slate-100 p-6 z-20"
                    >
                      <h4 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-4">Filter by Category</h4>
                      <div className="space-y-2">
                        {categories.map(cat => (
                          <button
                            key={cat}
                            onClick={() => { setActiveCategory(cat); setShowFilters(false); }}
                            className={`w-full text-left px-4 py-3 rounded-xl text-sm font-bold transition-all ${
                              activeCategory === cat ? 'bg-primary/5 text-primary border border-primary/10' : 'text-slate-600 hover:bg-slate-50'
                            }`}
                          >
                            {cat}
                          </button>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {currentInternships.map(internship => {
                const isApplied = applications.some(a => a.internshipId === internship.id && a.studentId === user?.id);
                const isSaved = student.savedInternshipIds?.includes(internship.id);
                return (
                  <motion.div
                    key={internship.id}
                    layout
                    whileHover={{ y: -6 }}
                    className="bg-white rounded-[2rem] border border-slate-200 p-8 flex flex-col hover:border-primary/40 hover:shadow-2xl hover:shadow-primary/5 transition-all group relative overflow-hidden"
                  >
                    <div className="absolute top-0 right-0 p-6">
                      <button 
                        onClick={() => toggleSaveInternship(internship.id)}
                        className={`p-2 rounded-xl border transition-all ${
                          isSaved ? 'bg-primary text-white border-primary shadow-lg shadow-primary/20' : 'bg-white text-slate-400 border-slate-100 hover:text-primary hover:border-primary/20'
                        }`}
                      >
                        <CheckCircle className={`w-5 h-5 ${isSaved ? 'fill-current' : ''}`} />
                      </button>
                    </div>
                    
                    <div className="flex items-start mb-6">
                      <img 
                        src={internship.companyLogo} 
                        alt={internship.companyName} 
                        className="w-16 h-16 rounded-2xl object-cover ring-4 ring-slate-50 shadow-sm"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                         <span className="text-[10px] uppercase tracking-widest font-black px-2 py-1 rounded bg-primary/5 text-primary">
                          {internship.category}
                        </span>
                        <span className="text-[10px] uppercase tracking-widest font-black px-2 py-1 rounded bg-slate-50 text-slate-400">
                          {internship.location}
                        </span>
                      </div>
                      <h3 className="text-xl font-black text-secondary group-hover:text-primary transition-colors leading-tight mb-1">{internship.title}</h3>
                      <p className="text-slate-500 font-bold mb-4">{internship.companyName}</p>
                      <p className="text-sm text-slate-600 line-clamp-2 mb-6 leading-relaxed opacity-80">
                        {internship.description}
                      </p>
                    </div>

                    <div className="flex flex-wrap gap-2 mb-8">
                      {internship.requirements.slice(0, 2).map((req, i) => (
                        <span key={i} className="text-[11px] px-3 py-1.5 bg-slate-50 text-slate-600 rounded-xl font-bold border border-slate-100">
                          {req}
                        </span>
                      ))}
                    </div>

                    <div className="flex items-center justify-between pt-6 border-t border-slate-100 mt-auto">
                      <div className="flex items-center text-xs text-slate-400 font-bold">
                        <Clock className="w-3.5 h-3.5 mr-1.5" />
                        {internship.deadline}
                      </div>
                      <div className="flex space-x-2">
                         <button
                          onClick={() => setSelectedInternship(internship)}
                          className="px-4 py-2.5 rounded-xl border border-slate-100 text-xs font-bold text-slate-500 hover:bg-slate-50 transition-all"
                        >
                          Details
                        </button>
                        <button
                          onClick={() => applyForInternship(internship)}
                          disabled={isApplied}
                          className={`px-5 py-2.5 rounded-xl text-xs font-black transition-all ${
                            isApplied 
                              ? 'bg-green-100 text-green-600 cursor-default' 
                              : 'zicta-gradient text-white hover:shadow-lg hover:shadow-primary/30'
                          }`}
                        >
                          {isApplied ? 'Applied' : 'Apply'}
                        </button>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
            {currentInternships.length === 0 && (
              <div className="text-center py-32 bg-white rounded-[3rem] border-2 border-dashed border-slate-100">
                <Search className="w-16 h-16 text-slate-200 mx-auto mb-6" />
                <h3 className="text-xl font-black text-secondary mb-2">No internships found</h3>
                <p className="text-slate-500">Try adjusting your filters or browsing other categories.</p>
              </div>
            )}
          </motion.div>
        )}

        {activeView === 'OVERVIEW' && activeTab === 'APPLICATIONS' && (
          <motion.div
            key="applications"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="space-y-6"
          >
            <div className="grid grid-cols-1 gap-6">
              {applications.filter(a => a.studentId === user?.id).map(app => (
                <div key={app.id} className="bg-white border border-slate-200 rounded-[2rem] p-8 flex items-center justify-between shadow-sm hover:shadow-md transition-all">
                  <div className="flex items-center space-x-6">
                    <div className="w-16 h-16 rounded-2xl border border-slate-100 flex items-center justify-center bg-slate-50">
                      <Briefcase className="w-8 h-8 text-primary shadow-inner" />
                    </div>
                    <div>
                      <h3 className="font-black text-secondary text-xl tracking-tight">{app.internshipTitle}</h3>
                      <p className="text-slate-500 font-bold">{app.companyName}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-12">
                    <div className="text-right hidden sm:block">
                      <p className="text-[10px] text-slate-400 uppercase tracking-widest font-black mb-1">Applied Date</p>
                      <p className="text-sm font-bold text-slate-700">{app.appliedAt}</p>
                    </div>
                    <div className={`px-6 py-2.5 rounded-2xl text-xs font-black uppercase tracking-widest ${
                      app.status === 'PENDING' ? 'bg-orange-50 text-orange-600 border border-orange-100' :
                      app.status === 'ACCEPTED' ? 'bg-green-50 text-green-600 border border-green-100' : 'bg-red-50 text-red-600 border border-red-100'
                    }`}>
                      {app.status}
                    </div>
                  </div>
                </div>
              ))}
              {applications.filter(a => a.studentId === user?.id).length === 0 && (
                <div className="text-center py-20 bg-white rounded-3xl border-2 border-dashed border-slate-200">
                  <Clock className="w-12 h-12 text-slate-300 mx-auto mb-4" />
                  <p className="text-slate-500 font-medium">You haven't applied for any internships yet.</p>
                </div>
              )}
            </div>
          </motion.div>
        )}

        {activeView === 'OVERVIEW' && activeTab === 'PROFILE' && (
          <motion.div
            key="profile"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="max-w-3xl mx-auto"
          >
            <div className="bg-white rounded-[3rem] border border-slate-200 overflow-hidden shadow-sm">
              <div className="h-40 zicta-gradient"></div>
              <div className="px-12 pb-12">
                <div className="relative -mt-20 mb-8">
                  <div className="w-40 h-40 rounded-[2.5rem] border-8 border-white zicta-gradient flex items-center justify-center shadow-2xl overflow-hidden">
                    <UserIcon className="w-20 h-20 text-white" />
                  </div>
                  <div className="absolute bottom-4 left-32">
                    <div className="w-10 h-10 bg-accent rounded-2xl border-4 border-white shadow-lg flex items-center justify-center">
                      <CheckCircle className="w-5 h-5 text-white" />
                    </div>
                  </div>
                </div>
                
                <div className="flex justify-between items-start mb-10">
                  <div>
                    <h2 className="text-3xl font-black text-secondary tracking-tight">{user?.name}</h2>
                    <p className="text-slate-500 font-bold">{(user as StudentProfile).course} — Year {(user as StudentProfile).yearOfStudy}</p>
                  </div>
                  <button 
                    onClick={() => setShowEditModal(true)}
                    className="px-6 py-3 border border-slate-200 rounded-2xl text-sm font-black text-slate-600 hover:bg-slate-50 hover:text-primary hover:border-primary/20 transition-all flex items-center"
                  >
                    Edit Profile
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                  <div className="space-y-6">
                    <div className="space-y-2">
                       <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Contact Information</label>
                       <p className="text-slate-700 font-bold">{user?.email}</p>
                    </div>
                    <div className="space-y-2">
                       <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Institution</label>
                       <p className="text-slate-700 font-bold">{(user as StudentProfile).university}</p>
                    </div>
                  </div>
                  <div className="space-y-6">
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Key Skills</label>
                      <div className="flex flex-wrap gap-2">
                        {(user as StudentProfile).skills?.map((skill, i) => (
                          <span key={i} className="px-4 py-2 bg-slate-50 text-slate-600 rounded-xl text-xs font-black border border-slate-100">
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Internship Details Modal */}
      <AnimatePresence>
        {selectedInternship && (
          <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
             <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              exit={{ opacity: 0 }}
              onClick={() => setSelectedInternship(null)}
              className="absolute inset-0 bg-secondary/80 backdrop-blur-sm"
            ></motion.div>
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white w-full max-w-xl rounded-[2.5rem] overflow-hidden relative z-10 shadow-2xl"
            >
              <div className="p-6 md:p-10 space-y-6 md:space-y-8 max-h-[90vh] overflow-y-auto">
                <div className="flex justify-between items-start">
                  <div className="flex items-center space-x-6">
                    <img src={selectedInternship.companyLogo} className="w-16 h-16 rounded-2xl shadow-sm" />
                    <div>
                      <h2 className="text-2xl font-black text-secondary">{selectedInternship.title}</h2>
                      <p className="text-slate-500 font-bold">{selectedInternship.companyName}</p>
                    </div>
                  </div>
                  <button onClick={() => setSelectedInternship(null)} className="p-2 bg-slate-50 rounded-full text-slate-400 hover:text-secondary"><X className="w-6 h-6" /></button>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                    <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest mb-1">Location</p>
                    <p className="text-xs font-bold text-secondary">{selectedInternship.location}</p>
                  </div>
                  <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                    <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest mb-1">Category</p>
                    <p className="text-xs font-bold text-secondary">{selectedInternship.category}</p>
                  </div>
                  <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                    <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest mb-1">Status</p>
                    <p className="text-xs font-bold text-green-600">{selectedInternship.status}</p>
                  </div>
                  <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                    <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest mb-1">Posted</p>
                    <p className="text-xs font-bold text-secondary">{selectedInternship.postedAt}</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="font-black text-secondary uppercase tracking-widest text-xs">Description</h4>
                  <p className="text-slate-600 leading-relaxed text-sm">{selectedInternship.description}</p>
                </div>

                <div className="space-y-4">
                  <h4 className="font-black text-secondary uppercase tracking-widest text-xs">Primary Requirements</h4>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {selectedInternship.requirements.map((req, i) => (
                      <li key={i} className="flex items-center text-sm text-slate-600 font-medium">
                        <CheckCircle className="w-4 h-4 text-primary mr-3 flex-shrink-0" />
                        {req}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="flex space-x-4 pt-4">
                  <button 
                    onClick={() => { applyForInternship(selectedInternship); setSelectedInternship(null); }}
                    className="flex-1 py-4 zicta-gradient text-white rounded-2xl font-black shadow-xl shadow-primary/20 hover:scale-[1.02] transition-all"
                  >
                    Send Application
                  </button>
                  <button 
                    onClick={() => { toggleSaveInternship(selectedInternship.id); }}
                    className={`flex-1 py-4 border rounded-2xl font-black transition-all ${
                       student.savedInternshipIds?.includes(selectedInternship.id) ? 'bg-slate-900 border-slate-900 text-white' : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    {student.savedInternshipIds?.includes(selectedInternship.id) ? 'Saved' : 'Save for later'}
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Edit Profile Modal */}
      <AnimatePresence>
        {showEditModal && (
          <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              exit={{ opacity: 0 }}
              onClick={() => setShowEditModal(false)}
              className="absolute inset-0 bg-secondary/80 backdrop-blur-sm"
            ></motion.div>
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white w-full max-w-md rounded-[2.5rem] overflow-hidden relative z-10 p-8 md:p-10 shadow-2xl"
            >
              <h2 className="text-xl font-black text-secondary mb-6">Update Profile</h2>
              <form onSubmit={(e) => {
                e.preventDefault();
                const formData = new FormData(e.currentTarget);
                updateProfile({
                  course: formData.get('course') as string,
                  university: formData.get('university') as string,
                  yearOfStudy: parseInt(formData.get('year') as string),
                });
                setShowEditModal(false);
              }} className="space-y-6">
                <div className="space-y-2">
                  <label className="text-xs font-black text-slate-400 uppercase">Course of Study</label>
                  <input name="course" defaultValue={student.course} className="w-full px-5 py-4 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:border-primary font-bold" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-black text-slate-400 uppercase">University</label>
                  <input name="university" defaultValue={student.university} className="w-full px-5 py-4 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:border-primary font-bold" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-black text-slate-400 uppercase">Year of Study</label>
                  <select name="year" defaultValue={student.yearOfStudy} className="w-full px-5 py-4 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:border-primary font-bold">
                    {[1, 2, 3, 4, 5].map(y => <option key={y} value={y}>Year {y}</option>)}
                  </select>
                </div>
                <button className="w-full py-4 zicta-gradient text-white font-black rounded-2xl shadow-xl shadow-primary/20">Save Changes</button>
                <button type="button" onClick={() => setShowEditModal(false)} className="w-full text-sm font-bold text-slate-400">Cancel</button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

const CompanyDashboard: React.FC<{ activeView: string }> = ({ activeView }) => {
  const { internships, postInternship, applications, updateApplicationStatus, user, updateProfile, updateCompany } = useApp();
  const [showPostModal, setShowPostModal] = useState(false);
  const [activeTab, setActiveTab] = useState<'LISTINGS' | 'APPLICANTS'>('LISTINGS');
  const [selectedInternship, setSelectedInternship] = useState<Internship | null>(null);

  const company = user as any; // Role is COMPANY
  const myInternships = internships.filter(i => i.companyId === user?.id);
  const myApplicants = applications.filter(a => internships.find(i => i.id === a.internshipId)?.companyId === user?.id);

  const stats = [
    { label: 'Live Postings', value: myInternships.length, icon: <Briefcase className="w-5 h-5" /> },
    { label: 'Total Applicants', value: myApplicants.length, icon: <UserIcon className="w-5 h-5" /> },
    { label: 'Placed Interns', value: myApplicants.filter(a => a.status === 'ACCEPTED').length, icon: <CheckCircle className="w-5 h-5" /> },
  ];

  if (activeView === 'PROFILE') {
    return (
      <div className="max-w-4xl mx-auto space-y-8">
        <h1 className="text-3xl font-black text-secondary tracking-tight">Company Profile</h1>
        <div className="bg-white rounded-[3rem] border border-slate-200 p-12 shadow-sm">
           <form onSubmit={(e) => {
             e.preventDefault();
             const formData = new FormData(e.currentTarget);
             const name = formData.get('name') as string;
             const logo = formData.get('logo') as string;
             const description = formData.get('description') as string;
             
             updateProfile({ name });
             updateCompany({ name, logo, description });
             
           }} className="space-y-8">
             <div className="flex items-center space-x-8">
               <div className="relative group">
                 <img src={company.logo} className="w-32 h-32 rounded-[2rem] object-cover ring-8 ring-slate-50 shadow-inner" referrerPolicy="no-referrer" />
                 <div className="absolute inset-0 bg-secondary/40 rounded-[2rem] opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center cursor-pointer">
                   <PlusCircle className="w-8 h-8 text-white" />
                 </div>
               </div>
               <div className="space-y-2 flex-1">
                 <label className="text-xs font-black text-slate-400 uppercase tracking-widest">Logo URL</label>
                 <input name="logo" defaultValue={company.logo} className="w-full px-5 py-3 bg-slate-50 border border-slate-100 rounded-2xl font-bold text-sm outline-none focus:border-primary" />
               </div>
             </div>
             
             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-black text-slate-400 uppercase tracking-widest">Company Name</label>
                  <input name="name" defaultValue={company.name} className="w-full px-5 py-4 bg-slate-50 border border-slate-100 rounded-2xl font-bold outline-none focus:border-primary" />
                </div>
                <div className="space-y-2">
                   <label className="text-xs font-black text-slate-400 uppercase tracking-widest">Industry</label>
                   <input defaultValue="Technology & Communications" className="w-full px-5 py-4 bg-slate-50 border border-slate-100 rounded-2xl font-bold outline-none cursor-not-allowed opacity-50" disabled />
                </div>
             </div>

             <div className="space-y-2">
                <label className="text-xs font-black text-slate-400 uppercase tracking-widest">About the Company</label>
                <textarea name="description" rows={4} defaultValue={company.description} className="w-full px-5 py-4 bg-slate-50 border border-slate-100 rounded-2xl font-bold outline-none focus:border-primary resize-none"></textarea>
             </div>

             <button type="submit" className="px-10 py-4 zicta-gradient text-white rounded-2xl font-black shadow-xl shadow-primary/20 hover:scale-[1.02] transition-all">
               Update Profile
             </button>
           </form>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto space-y-10">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-black text-secondary tracking-tight">Employer Dashboard</h1>
          <p className="text-slate-500">Manage your active opportunities and review talented applicants.</p>
        </div>
        <button 
          onClick={() => setShowPostModal(true)}
          className="px-8 py-4 zicta-gradient text-white rounded-2xl font-black shadow-xl shadow-primary/20 flex items-center"
        >
          <PlusCircle className="w-5 h-5 mr-3" /> Post Internship
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {stats.map((stat, i) => (
          <div key={i} className="bg-white p-8 rounded-[2.5rem] border border-slate-200 shadow-sm transition-all hover:shadow-lg">
            <div className="flex items-center space-x-4 mb-4">
              <div className="w-12 h-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center shadow-inner">
                {stat.icon}
              </div>
              <span className="text-xs font-black text-slate-400 uppercase tracking-widest">{stat.label}</span>
            </div>
            <div className="text-4xl font-black text-secondary">{stat.value}</div>
          </div>
        ))}
      </div>

      <div className="space-y-6">
        <div className="flex bg-white p-1.5 rounded-2xl border border-slate-200 self-start w-fit shadow-sm">
          {(['LISTINGS', 'APPLICANTS'] as const).map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-8 py-3 rounded-xl text-sm font-black transition-all ${
                activeTab === tab 
                  ? 'bg-secondary text-white shadow-xl shadow-secondary/20' 
                  : 'text-slate-500 hover:text-secondary'
              }`}
            >
              {tab === 'LISTINGS' ? 'Active Listings' : `Applications (${myApplicants.length})`}
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          {activeTab === 'LISTINGS' && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="grid grid-cols-1 gap-6"
            >
              {myInternships.map(internship => (
                <div key={internship.id} className="bg-white rounded-3xl border border-slate-200 p-8 flex flex-col md:flex-row md:items-center justify-between group hover:border-primary/30 shadow-sm transition-all gap-6">
                  <div className="flex items-center space-x-6">
                    <div className="w-16 h-16 rounded-2xl bg-slate-50 flex items-center justify-center text-primary font-black shadow-inner border border-slate-100">
                       {internship.title.charAt(0)}
                    </div>
                    <div>
                      <h3 className="text-xl font-black text-secondary tracking-tight">{internship.title}</h3>
                      <div className="flex items-center space-x-4 mt-1">
                        <span className="flex items-center text-xs font-bold text-slate-400"><Clock className="w-3 h-3 mr-1.5" /> Deadline: {internship.deadline} </span>
                        <span className="flex items-center text-xs font-bold text-green-500"><UserIcon className="w-3 h-3 mr-1.5" /> {applications.filter(a => a.internshipId === internship.id).length} Applicants</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex space-x-3">
                    <button 
                      onClick={() => setSelectedInternship(internship)}
                      className="px-6 py-3 zicta-gradient text-white rounded-2xl text-xs font-black shadow-lg shadow-primary/10"
                    >
                      View Details
                    </button>
                  </div>
                </div>
              ))}
              {myInternships.length === 0 && (
                <div className="text-center py-20 bg-white rounded-[3rem] border-2 border-dashed border-slate-100">
                  <Briefcase className="w-12 h-12 text-slate-200 mx-auto mb-4" />
                  <p className="text-slate-500 font-bold">You haven't posted any internships yet.</p>
                </div>
              )}
            </motion.div>
          )}

          {activeTab === 'APPLICANTS' && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-4"
            >
              {myApplicants.map(app => (
                <div key={app.id} className="bg-white rounded-[2rem] border border-slate-200 p-8 flex flex-col md:flex-row md:items-center justify-between shadow-sm hover:shadow-md transition-all gap-6">
                  <div className="flex items-center space-x-6">
                    <div className="w-14 h-14 rounded-2xl zicta-gradient flex items-center justify-center text-white text-lg font-black shadow-lg">
                      {app.studentName.charAt(0)}
                    </div>
                    <div>
                      <h3 className="text-lg font-black text-secondary tracking-tight">{app.studentName}</h3>
                      <p className="text-slate-500 font-bold text-sm">Applied for: <span className="text-primary">{app.internshipTitle}</span></p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-6">
                    {app.status === 'PENDING' ? (
                      <div className="flex space-x-2">
                        <button 
                          onClick={() => updateApplicationStatus(app.id, 'ACCEPTED')}
                          className="px-4 py-2 bg-green-50 text-green-600 rounded-xl font-bold flex items-center border border-green-100 hover:bg-green-100 transition-colors"
                        >
                          <CheckCircle className="w-4 h-4 mr-2" /> Accept
                        </button>
                        <button 
                          onClick={() => updateApplicationStatus(app.id, 'REJECTED')}
                          className="px-4 py-2 bg-red-50 text-red-600 rounded-xl font-bold flex items-center border border-red-100 hover:bg-red-100 transition-colors"
                        >
                          <XCircle className="w-4 h-4 mr-2" /> Reject
                        </button>
                      </div>
                    ) : (
                      <div className={`px-5 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest ${
                        app.status === 'ACCEPTED' ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'
                      }`}>
                        {app.status}
                      </div>
                    )}
                    <button className="px-6 py-3 border border-slate-100 rounded-2xl text-xs font-black text-slate-600 hover:bg-slate-50 transition-colors">Review CV</button>
                  </div>
                </div>
              ))}
              {myApplicants.length === 0 && (
                <div className="text-center py-20 bg-white rounded-3xl border-2 border-dashed border-slate-200">
                  <UserIcon className="w-12 h-12 text-slate-200 mx-auto mb-4" />
                  <p className="text-slate-500 font-bold">No applications received yet.</p>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Internship Detail Modal */}
      <AnimatePresence>
        {selectedInternship && (
          <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
             <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              exit={{ opacity: 0 }}
              onClick={() => setSelectedInternship(null)}
              className="absolute inset-0 bg-secondary/80 backdrop-blur-sm"
            ></motion.div>
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white w-full max-w-xl rounded-[2.5rem] overflow-hidden relative z-10 shadow-2xl"
            >
              <div className="p-6 md:p-10 space-y-6 md:space-y-8 max-h-[90vh] overflow-y-auto">
                <div className="flex justify-between items-start">
                  <div className="flex items-center space-x-6">
                    <div className="w-16 h-16 rounded-2xl bg-primary/10 text-primary flex items-center justify-center font-black text-2xl">
                      {selectedInternship.title.charAt(0)}
                    </div>
                    <div>
                      <h2 className="text-2xl font-black text-secondary">{selectedInternship.title}</h2>
                      <p className="text-slate-500 font-bold">Posted by You</p>
                    </div>
                  </div>
                  <button onClick={() => setSelectedInternship(null)} className="p-2 bg-slate-50 rounded-full text-slate-400 hover:text-secondary"><X className="w-6 h-6" /></button>
                </div>

                <div className="space-y-4">
                  <h4 className="font-black text-secondary uppercase tracking-widest text-xs">Job Description</h4>
                  <p className="text-slate-600 leading-relaxed">{selectedInternship.description}</p>
                </div>

                <div className="space-y-4">
                  <h4 className="font-black text-secondary uppercase tracking-widest text-xs">Requirements</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedInternship.requirements.map((req, i) => (
                      <span key={i} className="px-4 py-2 bg-slate-50 text-slate-600 rounded-xl text-sm font-bold border border-slate-100">
                        {req}
                      </span>
                    ))}
                  </div>
                </div>

                <button onClick={() => setSelectedInternship(null)} className="w-full py-4 bg-slate-900 text-white rounded-2xl font-black">
                  Close Details
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Post Modal */}
      <AnimatePresence>
        {showPostModal && (
          <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              exit={{ opacity: 0 }}
              onClick={() => setShowPostModal(false)}
              className="absolute inset-0 bg-secondary/80 backdrop-blur-sm"
            ></motion.div>
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white w-full max-w-md rounded-[2.5rem] overflow-hidden relative z-10 p-8 md:p-10 shadow-2xl"
            >
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-black text-secondary">Post Internship</h2>
                <button onClick={() => setShowPostModal(false)} className="p-2 text-slate-400 hover:text-secondary">
                  <X className="w-5 h-5" />
                </button>
              </div>
              <form onSubmit={(e) => {
                e.preventDefault();
                const formData = new FormData(e.currentTarget);
                postInternship({
                  title: formData.get('title') as string,
                  description: formData.get('description') as string,
                  requirements: (formData.get('requirements') as string).split(','),
                  location: formData.get('location') as string,
                  category: formData.get('category') as string,
                  deadline: '2026-08-30',
                  status: 'OPEN'
                });
                setShowPostModal(false);
              }} className="space-y-4">
                <div className="grid grid-cols-1 gap-4">
                  <input name="title" placeholder="Job Title" className="w-full px-5 py-3.5 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:border-primary font-bold text-sm" required />
                  <div className="grid grid-cols-2 gap-4">
                    <input name="category" placeholder="Category" className="w-full px-5 py-3.5 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:border-primary font-bold text-sm" required />
                    <input name="location" placeholder="Location" className="w-full px-5 py-3.5 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:border-primary font-bold text-sm" required />
                  </div>
                  <textarea name="description" placeholder="Description" className="w-full px-5 py-3.5 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:border-primary font-bold h-28 text-sm resize-none" required></textarea>
                  <input name="requirements" placeholder="Requirements (comma separated)" className="w-full px-5 py-3.5 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:border-primary font-bold text-sm" required />
                </div>
                <button className="w-full py-4 mt-4 zicta-gradient text-white font-black rounded-2xl shadow-xl shadow-primary/20 hover:scale-[1.01] transition-all">Post Opportunity</button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

const UniversityDashboard: React.FC<{ activeView: string }> = ({ activeView }) => {
  const { applications, user, internships } = useApp();
  
  const university = MOCK_UNIVERSITIES.find(u => u.id === (user as any).universityId);
  
  // Filter students from mock data who belong to this university
  const universityStudents = (MOCK_USERS as StudentProfile[]).filter(u => u.role === 'STUDENT' && u.universityId === (user as any).universityId);

  // Derive stats based on actual applications
  const universityApplications = applications.filter(a => universityStudents.some(s => s.id === a.studentId));

  if (activeView === 'PROFILE') {
    return (
      <div className="max-w-4xl mx-auto space-y-8">
        <h1 className="text-3xl font-black text-secondary tracking-tight">University Profile</h1>
        <div className="bg-white rounded-[3rem] border border-slate-200 p-12 shadow-sm">
           <div className="space-y-8">
             <div className="flex items-center space-x-8">
               <div className="w-32 h-32 rounded-[2rem] bg-primary/10 flex items-center justify-center text-primary">
                 <Building2 className="w-16 h-16" />
               </div>
               <div>
                  <h2 className="text-2xl font-black text-secondary">{university?.name}</h2>
                  <p className="text-slate-500 font-bold">{university?.location}</p>
               </div>
             </div>
             
             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-black text-slate-400 uppercase tracking-widest">Admin Name</label>
                  <p className="px-5 py-4 bg-slate-50 border border-slate-100 rounded-2xl font-bold text-secondary">{user?.name}</p>
                </div>
                <div className="space-y-2">
                   <label className="text-xs font-black text-slate-400 uppercase tracking-widest">Admin Email</label>
                   <p className="px-5 py-4 bg-slate-50 border border-slate-100 rounded-2xl font-bold text-secondary">{user?.email}</p>
                </div>
             </div>

             <div className="p-6 bg-primary/5 rounded-3xl border border-primary/10">
                <p className="text-sm text-primary font-bold">This is a verified University Account. Access is restricted to authorized personnel of {university?.name}.</p>
             </div>
           </div>
        </div>
      </div>
    );
  }

  if (activeView === 'PARTNERS') {
     return (
       <div className="max-w-6xl mx-auto space-y-10">
          <div>
            <h1 className="text-3xl font-black text-secondary tracking-tight">Our Partners</h1>
            <p className="text-slate-500 font-bold">Collaborating with Zambia's leading industry players.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {['Zicta', 'Copperbelt Energy', 'Zamtel', 'Airtel', 'Mtn', 'EcoBank'].map((name, i) => (
              <div key={i} className="bg-white p-8 rounded-[2.5rem] border border-slate-200 shadow-sm flex flex-col items-center text-center">
                <div className="w-20 h-20 rounded-3xl bg-slate-50 flex items-center justify-center mb-6 shadow-inner ring-4 ring-slate-50">
                  <Building2 className="w-10 h-10 text-slate-300" />
                </div>
                <h3 className="text-xl font-black text-secondary mb-2">{name}</h3>
                <p className="text-xs text-slate-500 font-bold mb-6 italic">Verified Industry Partner</p>
                <div className="flex space-x-2">
                  <span className="px-3 py-1 bg-green-50 text-green-600 rounded-full text-[10px] font-black uppercase tracking-widest">Active</span>
                </div>
              </div>
            ))}
          </div>
       </div>
     );
  }

  if (activeView === 'OPPORTUNITIES') {
    return (
      <div className="max-w-6xl mx-auto space-y-10">
        <div>
          <h1 className="text-3xl font-black text-secondary tracking-tight">National Opportunities</h1>
          <p className="text-slate-500 font-bold">All active internships available across Zambia.</p>
        </div>
        <div className="grid grid-cols-1 gap-6">
           {internships.map(internship => (
             <div key={internship.id} className="bg-white rounded-3xl border border-slate-200 p-8 flex items-center justify-between shadow-sm">
                <div className="flex items-center space-x-6">
                  <img src={internship.companyLogo} className="w-14 h-14 rounded-2xl shadow-sm" />
                  <div>
                    <h3 className="text-lg font-black text-secondary tracking-tight">{internship.title}</h3>
                    <p className="text-slate-500 font-bold text-sm">{internship.companyName}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-8">
                   <div className="text-right">
                      <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest">Location</p>
                      <p className="text-sm font-bold text-secondary">{internship.location}</p>
                   </div>
                   <div className={`px-5 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest bg-slate-50 text-slate-500 border border-slate-100`}>
                      {internship.category}
                   </div>
                </div>
             </div>
           ))}
        </div>
      </div>
    );
  }

  // OVERVIEW (Default)
  const universityStudentsData = universityStudents.map(s => {
    const studentApps = applications.filter(a => a.studentId === s.id);
    const isPlaced = studentApps.some(a => a.status === 'ACCEPTED');
    return {
      name: s.name,
      course: s.course,
      year: s.yearOfStudy,
      apps: studentApps.length,
      placed: isPlaced
    };
  });

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-black text-secondary tracking-tight">University Oversight</h1>
        <p className="text-slate-500 font-bold">Tracking student progress for {university?.name}.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {[
          { label: 'Total Students', value: universityStudents.length, color: 'text-secondary', icon: <GraduationCap className="w-5 h-5" /> },
          { label: 'Placed Interns', value: universityStudentsData.filter(s => s.placed).length, color: 'text-green-600', icon: <CheckCircle className="w-5 h-5" /> },
          { label: 'Pending Apps', value: universityApplications.filter(a => a.status === 'PENDING').length, color: 'text-orange-500', icon: <Clock className="w-5 h-5" /> },
        ].map((stat, i) => (
          <div key={i} className="bg-white p-8 rounded-[2.5rem] border border-slate-200 shadow-sm">
             <div className="flex items-center space-x-4 mb-4">
                <div className={`w-12 h-12 rounded-2xl bg-slate-50 ${stat.color} flex items-center justify-center shadow-inner`}>
                  {stat.icon}
                </div>
                <span className="text-xs font-black text-slate-400 uppercase tracking-widest">{stat.label}</span>
             </div>
             <p className={`text-4xl font-black ${stat.color}`}>{stat.value}</p>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-[3rem] border border-slate-200 overflow-hidden shadow-sm">
        <div className="p-8 border-b border-slate-50">
           <h3 className="text-xl font-black text-secondary">Student Tracker</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50/50">
                <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Student Information</th>
                <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Course & Year</th>
                <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest text-center">Applications</th>
                <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {universityStudentsData.map((student, i) => (
                <tr key={i} className="hover:bg-slate-50 transition-colors group">
                  <td className="px-8 py-6">
                    <div className="flex items-center space-x-4">
                      <div className="w-10 h-10 rounded-xl zicta-gradient text-white flex items-center justify-center font-black">
                        {student.name.charAt(0)}
                      </div>
                      <span className="font-black text-secondary group-hover:text-primary transition-colors">{student.name}</span>
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <p className="text-sm font-bold text-slate-700">{student.course}</p>
                    <p className="text-xs text-slate-400 font-bold uppercase tracking-widest">Year {student.year}</p>
                  </td>
                  <td className="px-8 py-6 text-center">
                    <span className="inline-block bg-slate-100 px-3 py-1 rounded-xl text-slate-600 font-black text-xs shadow-inner">{student.apps}</span>
                  </td>
                  <td className="px-8 py-6 text-right">
                    <span className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest ${
                      student.placed ? 'bg-green-50 text-green-600 border border-green-100' : 'bg-orange-50 text-orange-600 border border-orange-100'
                    }`}>
                      {student.placed ? 'Placed' : 'Searching'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

// --- Auth & Landing Components ---

const LandingPage = () => {
  const { login } = useApp();
  const [role, setRole] = useState<UserRole>('STUDENT');
  const [email, setEmail] = useState('');
  const [showSupport, setShowSupport] = useState(false);
  const [supportType, setSupportType] = useState<'CONTACT' | 'PRIVACY'>('CONTACT');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    login(email, role);
  };

  const roleOptions: { id: UserRole; label: string; description: string; icon: any }[] = [
    { id: 'STUDENT', label: 'Student', description: 'Unlock your potential', icon: GraduationCap },
    { id: 'COMPANY', label: 'Company', description: 'Hire Zambia\'s best', icon: Building2 },
    { id: 'UNIVERSITY_ADMIN', label: 'University', description: 'Track success', icon: Building2 },
  ];

  const features = [
    { 
      title: "Bridging the Gap", 
      desc: "Connecting academia with industry to ensure every graduate has a path to professional success.",
      icon: <Globe className="w-6 h-6" />
    },
    { 
      title: "Digital Integration", 
      desc: "A centralized system for companies, students, and universities to coexist and collaborate efficiently.",
      icon: <Zap className="w-6 h-6" />
    },
    { 
      title: "Verified Talent", 
      desc: "Direct verification of academic credentials through university partnerships, ensuring quality matches.",
      icon: <Shield className="w-6 h-6" />
    }
  ];

  const steps = [
    { id: '01', title: "Register Profile", desc: "Build your academic resume and showcase your skills." },
    { id: '02', title: "Explore Internships", desc: "Discover verified opportunities from national leaders." },
    { id: '03', title: "Apply with One-Click", desc: "Track your journey from application to placement." }
  ];

  return (
    <div className="relative min-h-screen">
      <BackgroundEffect />
      
      {/* Navigation */}
      <nav className="fixed top-0 inset-x-0 z-50 p-6 flex justify-between items-center max-w-7xl mx-auto">
        <div className="flex items-center space-x-2">
          <div className="w-10 h-10 rounded-xl zicta-gradient flex items-center justify-center shadow-lg">
            <Briefcase className="w-6 h-6 text-white" />
          </div>
          <span className="font-black text-2xl tracking-tight text-secondary">ZIntern</span>
        </div>
        <div className="hidden md:flex items-center space-x-8">
          <button onClick={() => { setSupportType('PRIVACY'); setShowSupport(true); }} className="text-sm font-bold text-slate-500 hover:text-primary transition-colors">Privacy</button>
          <button onClick={() => { setSupportType('CONTACT'); setShowSupport(true); }} className="text-sm font-bold text-slate-500 hover:text-primary transition-colors">Contact</button>
          <a href="#login" className="px-6 py-2.5 bg-secondary text-white rounded-xl text-sm font-black shadow-lg shadow-secondary/20 hover:scale-105 transition-all">Portal Login</a>
        </div>
      </nav>

      <main className="pt-24 pb-20 px-4">
        <div className="max-w-7xl mx-auto">
          {/* Hero Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center min-h-[80vh]">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="inline-flex items-center px-4 py-2 bg-primary/10 rounded-full text-primary mb-6">
                <Star className="w-4 h-4 mr-2" />
                <span className="text-xs font-black uppercase tracking-widest">Powering Zambia's Digital Future</span>
              </div>
              <h1 className="text-5xl md:text-7xl font-black text-secondary leading-[1.1] tracking-tight mb-8">
                Empowering Zambia's <span className="text-primary italic">Youth</span> with Opportunity.
              </h1>
              <p className="text-xl text-slate-500 font-medium leading-relaxed mb-10 max-w-xl">
                ZIntern is the national digital ecosystem connecting students, companies, and universities 
                to foster professional growth and national impact.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <a href="#login" className="px-10 py-5 zicta-gradient text-white rounded-2xl font-black text-lg shadow-2xl shadow-primary/20 hover:scale-105 active:scale-[0.98] transition-all flex items-center justify-center">
                  Get Started <ArrowDown className="ml-3 w-5 h-5 animate-bounce" />
                </a>
                <button 
                  onClick={() => { setSupportType('CONTACT'); setShowSupport(true); }}
                  className="px-10 py-5 bg-white border-2 border-slate-100 text-secondary rounded-2xl font-black text-lg hover:border-primary/20 transition-all flex items-center justify-center shadow-lg shadow-slate-200/50"
                >
                  <Headphones className="mr-3 w-5 h-5 text-primary" /> Support Center
                </button>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.2 }}
              id="login"
              className="relative"
            >
              <div className="absolute -inset-4 bg-white/40 blur-2xl rounded-[3rem] -z-10 animate-pulse"></div>
              <div className="bg-white p-8 md:p-12 rounded-[3.5rem] shadow-[0_32px_80px_-20px_rgba(0,0,0,0.12)] border border-slate-100">
                <div className="text-center mb-10">
                  <h2 className="text-3xl font-black text-secondary">Portal Access</h2>
                  <p className="text-slate-500 font-bold mt-2">Sign in to your dashboard</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-3 gap-3">
                    {roleOptions.map((opt) => (
                      <button
                        key={opt.id}
                        type="button"
                        onClick={() => setRole(opt.id)}
                        className={`flex flex-col items-center justify-center p-4 rounded-3xl border-2 transition-all ${
                          role === opt.id 
                            ? 'border-primary bg-primary/5 shadow-inner' 
                            : 'border-slate-50 hover:border-slate-100 bg-slate-50/50'
                        }`}
                      >
                        <div className={`w-10 h-10 rounded-xl mb-2 flex items-center justify-center ${role === opt.id ? 'bg-primary text-white shadow-lg shadow-primary/20' : 'bg-white text-slate-300'}`}>
                          <opt.icon className="w-5 h-5" />
                        </div>
                        <span className={`text-[10px] font-black uppercase tracking-widest ${role === opt.id ? 'text-primary' : 'text-slate-400'}`}>{opt.label}</span>
                      </button>
                    ))}
                  </div>

                  <div className="space-y-4">
                    <input
                      type="email"
                      placeholder="Enter your email"
                      className="w-full px-6 py-5 bg-slate-50 border border-slate-100 rounded-3xl outline-none focus:border-primary transition-all text-slate-900 font-bold shadow-inner"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                    <button
                      type="submit"
                      className="w-full py-5 zicta-gradient text-white font-black text-lg rounded-3xl shadow-xl shadow-primary/20 hover:scale-[1.02] active:scale-[0.98] transition-all"
                    >
                      Enter Dashboard
                    </button>
                  </div>
                </form>
                <div className="mt-8 pt-8 border-t border-slate-50 text-center">
                  <p className="text-xs text-slate-400 font-bold uppercase tracking-widest leading-loose">
                    Official Partnership: <br/>
                    <span className="text-secondary">ZICTA • Ministry of Technology • UNZA</span>
                  </p>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Impact Section */}
          <div className="mt-32 mb-40">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-black text-secondary mb-4 tracking-tight">Bridging Gaps Across Zambia</h2>
              <p className="text-slate-500 font-medium text-lg max-w-2xl mx-auto">
                We're solving the systemic challenges in internship matching through automated technology and verified partnerships.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {features.map((f, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="bg-white p-10 rounded-[2.5rem] border border-slate-100 shadow-xl shadow-slate-200/50 group hover:-translate-y-2 transition-transform duration-500"
                >
                  <div className="w-14 h-14 rounded-2xl bg-slate-50 text-primary flex items-center justify-center mb-6 group-hover:zicta-gradient group-hover:text-white transition-all duration-500">
                    {f.icon}
                  </div>
                  <h3 className="text-xl font-black text-secondary mb-4">{f.title}</h3>
                  <p className="text-slate-500 font-medium leading-relaxed">{f.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Simple Steps Section */}
          <div className="bg-secondary p-12 md:p-20 rounded-[4rem] text-white relative overflow-hidden mb-40">
            <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 rounded-full blur-[100px] -mr-48 -mt-48"></div>
            <div className="relative z-10">
              <div className="text-center mb-16">
                <h2 className="text-4xl font-black mb-4">How it works for Students</h2>
                <p className="text-white/60 font-medium">Your path to a dream internship in 3 simple steps.</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative">
                <div className="absolute top-1/2 left-0 w-full h-0.5 bg-white/10 hidden md:block -translate-y-1/2"></div>
                {steps.map((s, i) => (
                  <div key={i} className="relative z-10 flex flex-col items-center text-center">
                    <div className="w-16 h-16 rounded-[2rem] bg-primary flex items-center justify-center text-2xl font-black mb-6 shadow-xl shadow-primary/30">
                      {s.id}
                    </div>
                    <h3 className="text-xl font-black mb-2">{s.title}</h3>
                    <p className="text-white/60 font-medium text-sm leading-relaxed">{s.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-100 py-16 px-4">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center space-x-2 opacity-50 grayscale hover:grayscale-0 transition-all">
            <div className="w-8 h-8 rounded-lg zicta-gradient flex items-center justify-center">
              <Briefcase className="w-4 h-4 text-white" />
            </div>
            <span className="font-black text-xl text-secondary">ZIntern</span>
          </div>
          <div className="flex items-center space-x-6 text-sm font-bold text-slate-400">
            <button onClick={() => { setSupportType('CONTACT'); setShowSupport(true); }} className="hover:text-primary transition-colors">Contact Support</button>
            <button onClick={() => { setSupportType('PRIVACY'); setShowSupport(true); }} className="hover:text-primary transition-colors">Privacy Policy</button>
            <span>© 2026 ZIntern Portals</span>
          </div>
          <p className="text-xs text-slate-300 font-bold flex items-center">
            Built for National Progress <Check className="ml-2 w-3 h-3 text-green-500" />
          </p>
        </div>
      </footer>

      <SupportModal 
        isOpen={showSupport} 
        onClose={() => setShowSupport(false)} 
        type={supportType} 
      />
    </div>
  );
};

const Sidebar: React.FC<{ 
  isOpen: boolean; 
  onClose: () => void; 
  activeView: string; 
  onViewChange: (view: string) => void;
  onSupportOpen: (type: 'CONTACT' | 'PRIVACY') => void;
}> = ({ isOpen, onClose, activeView, onViewChange, onSupportOpen }) => {
  const { user } = useApp();

  const links = {
    STUDENT: [
      { id: 'OVERVIEW', label: 'Overview', icon: <LayoutDashboard className="w-5 h-5" /> },
      { id: 'SAVED', label: 'Saved Internships', icon: <CheckCircle className="w-5 h-5" /> },
    ],
    COMPANY: [
      { id: 'OVERVIEW', label: 'Overview', icon: <LayoutDashboard className="w-5 h-5" /> },
      { id: 'PROFILE', label: 'Account Profile', icon: <UserIcon className="w-5 h-5" /> },
    ],
    UNIVERSITY_ADMIN: [
      { id: 'OVERVIEW', label: 'Overview', icon: <LayoutDashboard className="w-5 h-5" /> },
      { id: 'OPPORTUNITIES', label: 'Opportunities', icon: <Briefcase className="w-5 h-5" /> },
      { id: 'PARTNERS', label: 'Our Partners', icon: <Building2 className="w-5 h-5" /> },
      { id: 'PROFILE', label: 'Account Profile', icon: <UserIcon className="w-5 h-5" /> },
    ]
  };

  const activeLinks = user ? links[user.role] : [];

  return (
    <>
      {/* Sidebar Mobile Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-secondary/40 backdrop-blur-sm z-50 lg:hidden"
          />
        )}
      </AnimatePresence>

      <aside className={`fixed inset-y-0 left-0 transform ${isOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 lg:static lg:block w-72 bg-white border-r border-slate-200 z-50 transition-transform duration-300 ease-in-out`}>
        <div className="p-6 h-full flex flex-col">
          <div className="mb-10 space-y-2">
            {activeLinks.map(link => (
              <SidebarLink 
                key={link.id}
                icon={link.icon} 
                label={link.label} 
                active={activeView === link.id} 
                onClick={() => {
                  onViewChange(link.id);
                  onClose();
                }} 
              />
            ))}
          </div>

          <div className="mt-auto p-6 rounded-3xl bg-slate-50 border border-slate-100 relative overflow-hidden group">
            <div className="absolute -right-4 -bottom-4 w-24 h-24 bg-primary/10 rounded-full group-hover:scale-150 transition-transform duration-500"></div>
            <p className="text-secondary font-bold relative z-10 mb-1">Support Center</p>
            <p className="text-xs text-slate-500 relative z-10 mb-4">Need help with our platform?</p>
            <div className="flex flex-col space-y-2 relative z-10">
              <button 
                onClick={() => { onSupportOpen('CONTACT'); }}
                className="text-xs font-bold text-primary text-left hover:underline"
              >
                Contact us
              </button>
              <button 
                onClick={() => { onSupportOpen('PRIVACY'); }}
                className="text-xs font-bold text-slate-400 text-left hover:underline"
              >
                Privacy Policy
              </button>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};

const DashboardContent = () => {
  const { user } = useApp();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeView, setActiveView] = useState('OVERVIEW');
  const [showSupportModal, setShowSupportModal] = useState(false);
  const [supportType, setSupportType] = useState<'CONTACT' | 'PRIVACY'>('CONTACT');

  if (!user) return <LandingPage />;

  const renderDashboard = () => {
    switch (user.role) {
      case 'STUDENT': return <StudentDashboard activeView={activeView} />;
      case 'COMPANY': return <CompanyDashboard activeView={activeView} />;
      case 'UNIVERSITY_ADMIN': return <UniversityDashboard activeView={activeView} />;
      default: return null;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar onToggleMenu={() => setIsSidebarOpen(true)} />
      
      <div className="flex">
        <Sidebar 
          isOpen={isSidebarOpen} 
          onClose={() => setIsSidebarOpen(false)} 
          activeView={activeView}
          onViewChange={(view) => setActiveView(view)}
          onSupportOpen={(type) => { setSupportType(type); setShowSupportModal(true); }}
        />

        {/* Content Area */}
        <main className="flex-1 p-4 md:p-8 lg:px-12 lg:py-10 overflow-x-hidden min-h-[calc(100vh-64px)]">
          <div className="max-w-7xl mx-auto w-full">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeView}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                {renderDashboard()}
              </motion.div>
            </AnimatePresence>
          </div>
        </main>
      </div>

      <SupportModal 
        isOpen={showSupportModal} 
        onClose={() => setShowSupportModal(false)} 
        type={supportType} 
      />
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <DashboardContent />
    </AppProvider>
  );
}
