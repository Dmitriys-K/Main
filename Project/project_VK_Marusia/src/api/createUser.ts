import { User } from '../schemas/user';

export const createUser = async (user: User): Promise<{success: boolean}> => {
  const res = await fetch('/api/user', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(user),
  });

  if (!res.ok) {
    const errText = await res.text();
    throw new Error(`Create user failed: ${res.status} ${errText}`);
  }

  return await res.json();
};