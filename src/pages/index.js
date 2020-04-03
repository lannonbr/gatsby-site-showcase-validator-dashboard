import React from "react";
import { useStaticQuery, graphql } from "gatsby";
import ErrorIcon from "../components/errorIcon";
import WarningIcon from "../components/warningIcon";
import "../styles/index.css";

export default () => {
  const data = useStaticQuery(graphql`
    {
      allEntriesJson {
        nodes {
          id
          time
          type
          name
          url
          reason
          source_url
        }
      }
    }
  `);

  return (
    <div
      style={{
        maxWidth: 800,
        width: "100%",
        margin: "0 auto"
      }}
    >
      <h1>Gatsby Site Showcase Validator Dashboard</h1>
      <p>
        {data.allEntriesJson.nodes.length} pages were caught by Gatsby's{" "}
        <a href="https://github.com/gatsbyjs/gatsby/tree/master/.github/actions/gatsby-site-showcase-validator">
          Site Showcase Validator
        </a>
        .
      </p>
      <div>
        {data.allEntriesJson.nodes.map(entry => (
          <div
            key={entry.id}
            style={{
              backgroundColor: entry.type === "Notice" ? "#FED7D7" : "#FAF089",
              margin: "20px 0",
              padding: 10,
              borderRadius: 4,
              boxShadow:
                "0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)"
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center"
              }}
            >
              {entry.type === "Notice" ? (
                <ErrorIcon color="#9B2C2C" />
              ) : (
                <WarningIcon color="#975A16" />
              )}
              <span style={{ marginLeft: 10 }}>{entry.name}</span>
            </div>
            <p
              style={{
                marginBottom: 0
              }}
            >
              Reason: {entry.reason}
            </p>
            {entry.source_url && (
              <p>
                Source URL: <a href={entry.source_url}>{entry.source_url}</a>
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
