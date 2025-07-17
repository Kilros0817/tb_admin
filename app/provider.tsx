"use client"
import "./globals.css";
import React, { useEffect, useState } from "react";

import { createConfig, WagmiProvider, fallback, http, Config } from "wagmi";

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import Web3AuthConnectorInstance from "@/utils/Web3AuthConnectorInstance";

import { ToastContainer } from "react-toastify";

import { TBContext } from "@/context/Context";
import { baseSepolia } from "viem/chains";
import { Web3AuthInstance } from "@/types";

const queryClient = new QueryClient();

interface TBProviderProps {
  children: React.ReactNode;
}

const TBProvider: React.FC<TBProviderProps> = ({ children }: any) => {
  const [config, setConfig] = useState<Config | null>(null);

  const [web3Auth, setWeb3Auth] = useState<Web3AuthInstance | null>(null);

  const [theme, setTheme] = useState<string>('dark');

  useEffect(() => {
    const init = async () => {
      try {
        const { connector, web3AuthInstance } = Web3AuthConnectorInstance([baseSepolia]);

        setWeb3Auth(web3AuthInstance);
        const conf = createConfig({
          chains: [baseSepolia],
          cacheTime: 3_600_000,
          transports: {
            [baseSepolia.id]: fallback([
              http('https://base-sepolia.g.alchemy.com/v2/U6YPO8eU2p26wRrvGyI2OlC1BS4ipA5o'),
              http('https://base-sepolia.g.alchemy.com/v2/vE7q6lsie-jRPZjFzbayQibbzicwO4uN'),
              http('https://base-sepolia.g.alchemy.com/v2/-DFmaAk_5jzgxCw7iYJ_VPr6VJq0RRFz'),
            ]),
          },
          connectors: [
            connector,
          ],
        });

        setConfig(conf);
      } catch (error) {
        console.error('Failed to initialize Web3Auth:', error);
      }
    };

    init();

  }, []); // Empty dependency array to ensure this runs only once

  return (
    <div className="min-h-screen bg-[#1a1d21]">
      {config && (
        <WagmiProvider config={config}>
          <QueryClientProvider client={queryClient}>
            <div className="flex flex-col">
              <TBContext.Provider
                value={{
                  web3Auth,
                  theme,
                  setTheme
                }}
              >
                {children}
              </TBContext.Provider>
              {/* <Footer /> */}
            </div>
          </QueryClientProvider>
        </WagmiProvider>
      )}
      <ToastContainer
        position="top-right"
        autoClose={10000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </div>
  );
};

export default TBProvider;

