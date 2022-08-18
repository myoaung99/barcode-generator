import React from "react";
import { Container } from "@mui/material";

function Layout({ children }) {
  return (
    <div>
      <main>
        <Container
          maxWidth="xl"
          style={{
            height: "100vh",
            width: "100%",
            backgroundColor: "#ebebeb",
            paddingTop: "20px",
          }}
        >
          {children}
        </Container>
      </main>
    </div>
  );
}

export default Layout;
