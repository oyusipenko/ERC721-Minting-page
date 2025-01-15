"use client";

import { useEffect, useState } from "react";
import { useAccount, useConnect, useDisconnect } from "wagmi";

export default function Profile() {
  const account = useAccount();
  const { connectors, connect, error } = useConnect();
  const { disconnect } = useDisconnect();

  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  if (!isHydrated) {
    return null;
  }

  return (
    <div className="p-4 max-w-lg mx-auto space-y-8">
      <div className="space-y-2">
        <h2 className="text-2xl font-bold">Account</h2>
        <div className="bg-gray-800 p-4 rounded-md">
          <p className="prose-lg">status: {account.status}</p>
          <p className="prose-lg">
            addresses: {JSON.stringify(account.addresses)}
          </p>
          <p className="prose-lg">chainId: {account.chainId}</p>
        </div>

        {account.status === "connected" && (
          <button
            type="button"
            onClick={() => disconnect()}
            className="px-4 py-2 bg-red-600 rounded hover:bg-red-500 transition-colors"
          >
            Disconnect
          </button>
        )}
      </div>

      {account.status !== "connected" && (
        <div className="space-y-2">
          <h2 className="text-2xl font-bold">Connect</h2>

          {connectors.length > 0 ? (
            <div className="space-x-2">
              {connectors.map((connector) => (
                <button
                  key={connector.id}
                  onClick={() => connect({ connector })}
                  type="button"
                  className="px-4 py-2 bg-blue-600 rounded hover:bg-blue-500 transition-colors"
                >
                  {connector.name}
                </button>
              ))}
            </div>
          ) : (
            <p>
              Don&apos;t have a wallet?{" "}
              <a
                href="/faq"
                className="text-blue-400 underline hover:text-blue-300"
              >
                Read our FAQ
              </a>
            </p>
          )}
          {error && <div className="text-red-400">{error.message}</div>}
        </div>
      )}
    </div>
  );
}
