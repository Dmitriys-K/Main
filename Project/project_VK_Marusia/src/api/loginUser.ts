

// export const loginUser = async (email: string, password: string): Promise<void> => {
//   const res = await fetch('/api/auth/login', {
//     method: 'POST',
//     headers: { 'Content-Type': 'application/json' },
//     body: JSON.stringify({ email, password }),
//   });
//   if (!res.ok) {
//     throw new Error('Ошибка входа');
//   }

  
//   const data = await res.json();
//   return data;


// };



const rawBase = import.meta.env.VITE_API_BASE as string | undefined;
const API_BASE = rawBase ? rawBase.replace(/\/+$/,'') : '/api';

export const loginUser = async (email: string, password: string): Promise<void> => {
  const res = await fetch(`${API_BASE}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
    credentials: 'include',
  });
  if (!res.ok) {
    throw new Error('Ошибка входа');
  }

  const data = await res.json();
  return data;
};
// ...existing code...