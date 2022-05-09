import { useEffect } from 'react';
import { useRouter } from 'next/router';
import localforage from "localforage";
//custom components
import Loader from '../components/layout/loader';

export default function Home() {
  const router = useRouter();

  useEffect(()=>{
    const visited = localforage.getItem("visited");
    if(!visited){
      localforage.setItem("visited", true);
      router.push("/landing");
    }else if(visited){
      router.push("/profile");
    }
  },[])
  
  return (
    <main>
      <Loader />
    </main>
  )
}
