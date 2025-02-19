"use client";

import { gql, useQuery } from "@apollo/client";
import { getIntrospectionQuery } from "graphql";
import Navbar from "../navbar";
import { useEffect } from "react";

interface GraphQLType {
  name: string;
  kind: string;
  description?: string;
  fields?: GraphQLField[];
}

interface TypeRef {
  kind: string;
  name?: string;
  ofType?: TypeRef;
}

interface GraphQLField {
  name: string;
  type: TypeRef;
}

const skipSearch = ["Boolean", "String", "Int"];

function getFullTypeName(type: TypeRef): string {
  if (!type) return "";

  let str = "";

  if (type.kind === "NON_NULL") {
    str = `${getFullTypeName(type.ofType!)}!`;
  } else if (type.kind === "LIST") {
    str = `[${getFullTypeName(type.ofType!)}]`;
  } else {
    str = type.name || "";
  }

  return str;
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
    <div className="bg-gray-200 min-h-screen">
      <Navbar />
      <div className="p-8">
        <h1 className="text-2xl font-bold my-6 text-black">
          GraphQL Schema Types
        </h1>
        <div className="space-y-6">
          {data?.__schema.types
            .filter(
              (type) =>
                !type.name.startsWith("__") && !skipSearch.includes(type.name)
            )
            .map((type) => (
              <div key={type.name} className="bg-gray-800 rounded-lg p-6">
                <h2 className="text-xl font-semibold text-white mb-2">
                  {type.name}{" "}
                  <span className="text-gray-400">({type.kind})</span>
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
                          {field.name}: {getFullTypeName(field.type)}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}
