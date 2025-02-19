"use client";

import React from "react";
import Navbar from "../../navbar";
import { gql, useSubscription } from "@apollo/client";

const MESSAGE_SUBSCRIPTION = gql`
  subscription OnMessageReceived {
    onMessageReceived
  }
`;

const Page: React.FC = () => {
  const { loading, error, data } = useSubscription(MESSAGE_SUBSCRIPTION, {
    onError: (error) => {
      console.error("Subscription error:", error);
    },
    onData: (data) => {
      console.log("Received subscription data:", data);
    },
  });

  if (error) {
    console.error("Subscription error details:", error);
    return (
      <div className="flex flex-col">
        <Navbar />
        <div className="p-5">
          <h1 className="mb-5 text-red-500">Subscription Error</h1>
          <p>Error: {error.message}</p>
          <pre className="mt-2 p-2 bg-gray-100 rounded">
            {JSON.stringify(error, null, 2)}
          </pre>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-200 flex flex-col">
      <Navbar />
      <div className="p-5">
        <h1 className="mb-5">Subscribed Posts</h1>
        {loading && <p>Loading...</p>}
        {data && (
          <div className="flex flex-col">
            <div className="mb-2 border-b border-dashed w-96">
              <h3 className="">{data.onMessageReceived}</h3>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Page;
