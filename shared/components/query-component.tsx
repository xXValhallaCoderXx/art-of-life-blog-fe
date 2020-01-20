import React from "react";
import { useQuery } from "@apollo/react-hooks";
import {Typography} from "@material-ui/core";

interface IProps {
  children: any;
  query: any;
  variables?: any;
}

const Query = ({ children, query, variables }: IProps) => {
  const { data, loading, error } = useQuery(query, {
    variables
  });

  if (loading)
    return (
      <div
        style={{
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center"
        }}
      >
        <Typography variant="h2" color="primary">
          Loading...
        </Typography>
      </div>
    );
  if (error) return <p>Error: {JSON.stringify(error)}</p>;
  return children({ data });
};

export default Query;
