"use client";

import { gql, useQuery } from "@apollo/client";
import { getIntrospectionQuery } from "graphql";
import Navbar from "../navbar";
import { useEffect } from "react";

interface GraphQLType {
  name: string;
  description?: string;
  fields?: GraphQLField[];
}

interface GraphQLField {
  name: string;
  type: {
    name?: string;
    kind: string;
    ofType?: {
      name?: string;
      kind: string;
    };
  };
}

interface SchemaResponse {
  __schema: {
    types: GraphQLType[];
  };
}

export default function SchemaPage() {
  useEffect(() => console.log(getIntrospectionQuery()), []);
  const { loading, error, data } = useQuery<SchemaResponse>(
    gql`
      ${getIntrospectionQuery()}
    `
  );

  if (loading) {
    return (
      <div className="min-h-screen p-8">
        <div className="text-center">Loading schema...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen p-8">
        <div className="text-red-500">Error: {error.message}</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-8">
      <Navbar />
      <h1 className="text-2xl font-bold my-6">GraphQL Schema Types</h1>
      <div className="space-y-6">
        {data?.__schema.types
          .filter((type) => !type.name.startsWith("__"))
          .map((type) => (
            <div key={type.name} className="bg-gray-800 rounded-lg p-6">
              <h2 className="text-xl font-semibold text-white mb-2">
                {type.name}
              </h2>
              {type.description && (
                <p className="text-gray-300 mb-4">{type.description}</p>
              )}
              {type.fields && (
                <div className="space-y-2">
                  <h3 className="text-lg font-medium text-gray-200 mb-2">
                    Fields
                  </h3>
                  {type.fields.map((field: GraphQLField) => (
                    <div
                      key={field.name}
                      className="bg-gray-700 rounded p-3 text-gray-200"
                    >
                      <span className="font-mono">
                        {field.name}:{" "}
                        {field.type.name || field.type.ofType?.name}
                        {field.type.kind === "LIST" && "[]"}
                        {field.type.kind === "NON_NULL" && "!"}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
      </div>
    </div>
  );
}
