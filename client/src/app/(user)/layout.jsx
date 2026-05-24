import { getMe } from "@/api/api-call";
import Footer from "@/components/user/Footer";
import Header from "@/components/user/Header";
import ReduxProvider from "@/redux/ReduxProvider";

export default async function UserLayout({ children }) {
  
    const {user} = await getMe();
  
  return (
    <ReduxProvider>
      <Header user={user} />
      <main className="flex-1 max-w-7xl mx-auto w-full">
        {children}
      </main>
      <Footer />
    </ReduxProvider>
  );
}



// const data = await getMe();
  // const user = data?.user;