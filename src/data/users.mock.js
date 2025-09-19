// Users mock data
export const USERS = [
  { id: 'U-00001', name: 'Super Admin', email: 'superadmin@sidonpay.com', role: 'super_admin' },
  { id: 'U-00002', name: 'Admin User', email: 'admin@sidonpay.com', role: 'admin' },
  { id: 'U-00003', name: 'Data Analyst', email: 'analyst@sidonpay.com', role: 'analyst' },
  { id: 'U-00004', name: 'Support Agent', email: 'support@sidonpay.com', role: 'support' },
];

export const getUserByEmail = (email) => USERS.find(u => u.email === email);
export const getUserById = (id) => USERS.find(u => u.id === id);
