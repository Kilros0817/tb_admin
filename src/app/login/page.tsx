'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Shield, Users, Activity, Settings, Sun, Moon, Loader2 } from 'lucide-react';
import { WALLET_ADAPTERS } from "@web3auth/base";
import { useTBContext } from '@/context/Context';
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAccount } from 'wagmi';

export default function Login() {
  const router = useRouter();
  const { web3Auth } = useTBContext();
  const [theme, setTheme] = useState('dark');
  const [email, setEmail] = useState<string>("");
  const { isConnected, isConnecting } = useAccount();

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    if (web3Auth?.connected || !web3Auth) return;
    e.preventDefault();

    try {
      await web3Auth.connectTo(WALLET_ADAPTERS.AUTH, {
        loginProvider: "email_passwordless",
        extraLoginOptions: {
          login_hint: email.trim(),
        },
      });

    } catch (e) {
      toast.error("Please enter your email address");
    }
  };

  useEffect(() => {
    console.log(web3Auth)
    if (web3Auth?.connected && isConnected) {
      router.push("/admin");
    }
  }, [web3Auth, isConnected])

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center p-4 transition-colors duration-200">
      <div className="max-w-md w-full bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 text-center border border-gray-200 dark:border-gray-700 transition-colors duration-200">
        <div className="mb-6">
          <div className="w-16 h-16 bg-blue-600 dark:bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-4 transition-colors duration-200">
            <Shield className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2 transition-colors duration-200">Admin Portal</h1>
          <p className="text-gray-600 dark:text-gray-300 transition-colors duration-200">Secure access to system administration</p>
        </div>

        <div className="space-y-4 mb-8">
          <div className="flex items-center justify-center space-x-6 text-sm text-gray-500 dark:text-gray-400 transition-colors duration-200">
            <div className="flex items-center space-x-2">
              <Users className="w-4 h-4" />
              <span>User Management</span>
            </div>
            <div className="flex items-center space-x-2">
              <Activity className="w-4 h-4" />
              <span>Activity Logs</span>
            </div>
          </div>
          <div className="flex items-center justify-center space-x-6 text-sm text-gray-500 dark:text-gray-400 transition-colors duration-200">
            <div className="flex items-center space-x-2">
              <Shield className="w-4 h-4" />
              <span>Permissions</span>
            </div>
            <div className="flex items-center space-x-2">
              <Settings className="w-4 h-4" />
              <span>System Settings</span>
            </div>
          </div>
        </div>
        <form onSubmit={handleLogin}>
          <div className="mb-6">
            <input
              type="email"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
              value={email}
              placeholder="name@example.com"
              className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              disabled={isConnecting}
            />
          </div>
          <button
            type="submit"
            disabled={!email || !web3Auth}
            className="w-full bg-blue-600 dark:bg-blue-500 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 dark:hover:bg-blue-600 transition-all duration-200 shadow-lg hover:shadow-xl  disabled:cursor-not-allowed dark:hover:disabled:bg-gray-400 dark:disabled:bg-gray-400"
          >
            {isConnecting ? (
              <Loader2 className="w-6 h-6 animate-spin mx-auto" />
            ) : (
              "Access Admin Dashboard"
            )}
          </button>
        </form>

        <p className="text-xs text-gray-400 dark:text-gray-500 mt-6 transition-colors duration-200">
          Authorized personnel only
        </p>
      </div>
    </div>
  );
}