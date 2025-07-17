'use client';

import { useEffect } from 'react';
import { LogOut } from 'lucide-react';
import { useAccount, useDisconnect } from 'wagmi';
import { useRouter } from 'next/navigation';

export default function SignOut() {

  const router = useRouter();
  const { isConnected } = useAccount();
  const { disconnect } = useDisconnect();

  const handleLogout = () => {
    disconnect();
    setInterval(() => {
      window.location.href = "/";
    }, 1000);
  };

  useEffect(() => {
    if (!isConnected) router.replace("/")
  }, [isConnected])

  return (
    <button
      onClick={handleLogout}
      className="flex items-center space-x-2 px-3 py-2 rounded-lg bg-red-100 hover:bg-red-200 dark:bg-red-900 dark:hover:bg-red-800 text-red-700 dark:text-red-300 transition-colors"
      title="Logout"
    >
      <LogOut className="w-4 h-4" />
      <span className="text-sm font-medium">Logout</span>
    </button>
  );
}