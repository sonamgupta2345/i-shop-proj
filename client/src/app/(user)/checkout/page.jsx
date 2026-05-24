import { getMe } from '@/api/api-call';
import React from 'react';
import CheckoutForm from '@/components/user/CheckoutForm';

export default async function page() {

  const data = await getMe();

  const user = data?.user;

  return (
    <div>
      <CheckoutForm user={user} />
    </div>
  );
}