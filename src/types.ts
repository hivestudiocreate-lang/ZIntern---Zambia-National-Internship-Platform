/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type UserRole = 'STUDENT' | 'COMPANY' | 'UNIVERSITY_ADMIN';

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  avatar?: string;
  universityId?: string; // For students and university admins
  companyId?: string; // For company users
}

export interface StudentProfile extends User {
  university: string;
  course: string;
  yearOfStudy: number;
  cvUrl?: string;
  skills: string[];
  savedInternshipIds: string[];
}

export interface Company {
  id: string;
  name: string;
  description: string;
  logo: string;
  website: string;
  location: string;
}

export interface Internship {
  id: string;
  companyId: string;
  companyName: string;
  companyLogo: string;
  title: string;
  description: string;
  requirements: string[];
  location: string;
  category: string;
  deadline: string;
  postedAt: string;
  status: 'OPEN' | 'CLOSED';
}

export interface Application {
  id: string;
  internshipId: string;
  studentId: string;
  studentName: string;
  internshipTitle: string;
  companyName: string;
  status: 'PENDING' | 'ACCEPTED' | 'REJECTED';
  appliedAt: string;
}

export interface University {
  id: string;
  name: string;
  location: string;
}
