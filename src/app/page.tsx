import { Header } from "@/components/Header";
import { Journal } from "@/components/Journal";
import { Login } from "@/components/Login";
import { proxy } from "@/lib/proxy";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Home() {
  const router = useRouter()
  const [isUnauthorized, setIsUnauthorized] = useState(false);

  useEffect(() => {
    const checkSession = async () => {
      try{
        const response = await proxy.get('/sms/years')
      }catch (err: any) {
        if (axios.isAxiosError(err)) {
          if (err.response?.status === 401) {
            setIsUnauthorized(true);
          }
        }
      }
    }
    checkSession()
  },[])

  if (isUnauthorized) {
    return <Login />;
  }

  return (
    <div>
      <Header/>
      <Journal/>
    </div>
  );
}
