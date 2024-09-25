'use client'

import { Header } from "@/components/Header";
import { Journal } from "@/components/Journal";
import { Login } from "@/components/Login";
import { proxy } from "@/lib/proxy";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useLoading } from "./loadingContext";
import { LoadingOverlay } from "@/components/Loading";

export default function Home() {
  const router = useRouter()
  const [isUnauthorized, setIsUnauthorized] = useState(false);

  useEffect(() => {
    const checkSession = async () => {
      try{
        const response = await proxy.get('/sms/years')
        setIsUnauthorized(true)
      }catch (err: any) {
        setIsUnauthorized(false);
      }
    }
    checkSession()
  },[])

  if (isUnauthorized){
    return (
      <div className="bg-neutral-900 h-min-screen">
        <Header/>
        <Journal/>
      </div>
    );
  }



  return (
    <Login />
  );
}
