'use client'

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import LoadingScreen from "./components/loading/LoadingScreen";

export default function Home() {
  const router = useRouter()
  useEffect(() => {
    router.push('/auth')
  }, [])
  return (
    <main>
      <LoadingScreen />
    </main>
  );
}
