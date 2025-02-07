"use client";

import React from "react";
import Navbar from "../../navbar";

// const MESSAGE_SUBSCRIPTION = gql`
//   subscription OnMessageReceived {
//     onMessageReceived
//   }
// `;

const Page: React.FC = () => {
  return (
    <div className="flex flex-col">
      <Navbar />
      <div className="p-5">
        <h1 className="mb-5">Subscribed Posts</h1>
        <div>
          Navigate to{" "}
          <a
            className="text-blue-400 underline"
            href="http://localhost:5287/graphql"
          >
            this link
          </a>{" "}
          to view subscriptions
        </div>
      </div>
    </div>
  );
  //   const { loading, error, data } = useSubscription(MESSAGE_SUBSCRIPTION);

  //   if (error) return <p>Error {error.message}</p>;

  //   return (
  //     <div className="flex flex-col">
  //       <Navbar />
  //       <div className="p-5">
  //         <h1 className="mb-5">Subscribed Posts</h1>
  //         {loading && <p>Loading...</p>}
  //         {data && (
  //           <div className="flex flex-col">
  //             <div className="mb-2 border-b border-dashed w-96">
  //               <h3 className="">{data.onMessageReceived}</h3>
  //             </div>
  //           </div>
  //         )}
  //       </div>
  //     </div>
  //   );
};

export default Page;
