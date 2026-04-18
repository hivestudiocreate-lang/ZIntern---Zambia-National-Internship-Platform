import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, StudentProfile, Internship, Application, Company, University, UserRole } from '../types';
import { MOCK_USERS, MOCK_INTERNSHIPS, MOCK_APPLICATIONS, MOCK_COMPANIES, MOCK_UNIVERSITIES } from '../services/mockData';

interface AppContextType {
  user: User | StudentProfile | null;
  internships: Internship[];
  applications: Application[];
  companies: Company[];
  universities: University[];
  login: (email: string, role: UserRole) => void;
  logout: () => void;
  applyForInternship: (internship: Internship) => void;
  postInternship: (internship: Omit<Internship, 'id' | 'postedAt' | 'companyName' | 'companyLogo'>) => void;
  updateApplicationStatus: (applicationId: string, status: 'ACCEPTED' | 'REJECTED') => void;
  updateProfile: (profile: Partial<StudentProfile>) => void;
  updateCompany: (company: Partial<Company>) => void;
  toggleSaveInternship: (internshipId: string) => void;
  notifications: Array<{ id: string; title: string; message: string; date: string }>;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | StudentProfile | null>(null);
  const [internships, setInternships] = useState<Internship[]>([]);
  const [applications, setApplications] = useState<Application[]>([]);
  const [companies, setCompanies] = useState<Company[]>(MOCK_COMPANIES);
  const [universities] = useState<University[]>(MOCK_UNIVERSITIES);
  const [notifications] = useState([
    { id: '1', title: 'New Internship', message: 'ZICTA posted a new Cybersecurity internship.', date: '2h ago' },
    { id: '2', title: 'Application Update', message: 'Your application at Airtel was reviewed.', date: '1d ago' },
  ]);

  // Initialize data from localStorage or mock data
  useEffect(() => {
    const storedUser = localStorage.getItem('zintern_user');
    const storedInternships = localStorage.getItem('zintern_internships');
    const storedApplications = localStorage.getItem('zintern_applications');

    if (storedUser) setUser(JSON.parse(storedUser));
    
    setInternships(storedInternships ? JSON.parse(storedInternships) : MOCK_INTERNSHIPS);
    setApplications(storedApplications ? JSON.parse(storedApplications) : MOCK_APPLICATIONS);
  }, []);

  // Save to localStorage whenever state changes
  useEffect(() => {
    if (user) localStorage.setItem('zintern_user', JSON.stringify(user));
    else localStorage.removeItem('zintern_user');
    
    if (internships.length > 0) localStorage.setItem('zintern_internships', JSON.stringify(internships));
    if (applications.length > 0) localStorage.setItem('zintern_applications', JSON.stringify(applications));
  }, [user, internships, applications]);

  const login = (email: string, role: UserRole) => {
    const foundUser = MOCK_USERS.find(u => u.email === email && u.role === role);
    if (foundUser) {
      setUser(foundUser);
    } else {
      // Create a dummy user if not found in mock for demo purposes
      const newUser: User = {
        id: Math.random().toString(36).substr(2, 9),
        email,
        name: email.split('@')[0].charAt(0).toUpperCase() + email.split('@')[0].slice(1),
        role,
      };
      if (role === 'STUDENT') {
        const student: StudentProfile = {
          ...newUser,
          university: 'University of Zambia (UNZA)',
          course: 'Business Administration',
          yearOfStudy: 4,
          skills: ['Marketing', 'Communication'],
          universityId: 'u1',
          savedInternshipIds: []
        };
        setUser(student);
      } else if (role === 'COMPANY') {
        setUser({ ...newUser, companyId: 'c1' });
      } else {
        setUser({ ...newUser, universityId: 'u1' });
      }
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('zintern_user');
  };

  const applyForInternship = (internship: Internship) => {
    if (!user || user.role !== 'STUDENT') return;

    const newApplication: Application = {
      id: Math.random().toString(36).substr(2, 9),
      internshipId: internship.id,
      studentId: user.id,
      studentName: user.name,
      internshipTitle: internship.title,
      companyName: internship.companyName,
      status: 'PENDING',
      appliedAt: new Date().toISOString().split('T')[0],
    };

    setApplications([...applications, newApplication]);
  };

  const postInternship = (data: Omit<Internship, 'id' | 'postedAt' | 'companyName' | 'companyLogo'>) => {
    if (!user || user.role !== 'COMPANY' || !user.companyId) return;

    const company = companies.find(c => c.id === user.companyId);
    if (!company) return;

    const newInternship: Internship = {
      ...data,
      id: Math.random().toString(36).substr(2, 9),
      companyId: company.id,
      companyName: company.name,
      companyLogo: company.logo,
      postedAt: new Date().toISOString().split('T')[0],
      status: 'OPEN',
    };

    setInternships([newInternship, ...internships]);
  };

  const updateApplicationStatus = (applicationId: string, status: 'ACCEPTED' | 'REJECTED') => {
    setApplications(apps => apps.map(app => 
      app.id === applicationId ? { ...app, status } : app
    ));
  };

  const updateProfile = (profileData: Partial<StudentProfile>) => {
    if (user) {
      setUser(prev => prev ? ({ ...prev, ...profileData } as any) : null);
    }
  };

  const updateCompany = (companyData: Partial<Company>) => {
    if (user && user.role === 'COMPANY' && user.companyId) {
      setCompanies(prev => prev.map(c => c.id === user.companyId ? { ...c, ...companyData } : c));
      // Also update internships company data
      if (companyData.logo || companyData.name) {
        setInternships(prev => prev.map(i => i.companyId === user.companyId ? { 
          ...i, 
          companyName: companyData.name || i.companyName,
          companyLogo: companyData.logo || i.companyLogo 
        } : i));
      }
    }
  };

  const toggleSaveInternship = (internshipId: string) => {
    if (user && user.role === 'STUDENT') {
      const student = user as StudentProfile;
      const isSaved = student.savedInternshipIds?.includes(internshipId);
      const newSavedIds = isSaved 
        ? student.savedInternshipIds.filter(id => id !== internshipId)
        : [...(student.savedInternshipIds || []), internshipId];
      
      setUser({ ...student, savedInternshipIds: newSavedIds });
    }
  };

  return (
    <AppContext.Provider value={{ 
      user, 
      internships, 
      applications, 
      companies, 
      universities,
      notifications,
      login, 
      logout,
      applyForInternship,
      postInternship,
      updateApplicationStatus,
      updateProfile,
      updateCompany,
      toggleSaveInternship
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
