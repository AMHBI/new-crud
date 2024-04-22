import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";

import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import { ThemeProvider } from "@mui/material";
import { theme } from "./configs/theme/muiTheme.js";
import { CacheProvider } from "@emotion/react";
import cacheRtl from "./configs/cache/rtlCache.js";

const ApiClient = new ApolloClient({
  uri: import.meta.env.VITE_GQL_BASE_URL,
  cache: new InMemoryCache(),
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <ApolloProvider client={ApiClient}>
    <ThemeProvider theme={theme}>
      <CacheProvider value={cacheRtl}>
        <App />
      </CacheProvider>
    </ThemeProvider>
  </ApolloProvider>
);
