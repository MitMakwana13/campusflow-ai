export type UserRole = 'superadmin' | 'registrar' | 'faculty' | 'student';

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: UserRole;
  avatarUrl?: string;
}
