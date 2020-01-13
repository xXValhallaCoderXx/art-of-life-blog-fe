import React from "react";
import { useQuery } from "@apollo/react-hooks";

interface IProps {
  children: any;
  query: any;
  variables?: any;
}

const Query = ({ children, query, variables }: IProps) => {
  const { data, loading, error } = useQuery(query, {
    variables
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {JSON.stringify(error)}</p>;
  return children({ data });
};

export default Query;
