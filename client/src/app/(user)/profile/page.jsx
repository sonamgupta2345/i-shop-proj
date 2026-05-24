import { getMe } from '@/api/api-call'
import ProfilePage from '@/components/user/ProfilePage'
import React from 'react'

export default async function page() {
    const {user} = await getMe();

  
   return (
      <div>
         <ProfilePage user={user} />
      </div>
   )
}
 // const data = await getMe();

   // const user = data?.user || null;
