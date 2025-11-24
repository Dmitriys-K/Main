// import { getUserProfile } from "./getUserProfile";

export const loginUser = async (email: string, password: string): Promise<void> => {
  const res = await fetch('/api/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });
  if (!res.ok) {
    throw new Error('Ошибка входа');
  }

  
  const data = await res.json();
  return data;

//   if(data) {
  
//     const userProfile = await getUserProfile();
//     console.log('User Profile after login:', userProfile);
//   }
};