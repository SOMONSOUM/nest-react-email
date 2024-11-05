import React from "react";
import { Html, Head, Body, Container } from "@react-email/components";

const Layout = ({ children }: Readonly<{ children: React.ReactNode }>) => {
  return (
    <Html>
      <Head />
      <Body className="bg-gray-100 p-6">
        <Container className="max-w-xl mx-auto bg-white p-6 shadow-md rounded-lg">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-semibold text-indigo-600">
              Your Company
            </h1>
          </div>
          {children}
          <div className="text-center mt-10 text-gray-500 text-sm">
            <p>
              &copy; {new Date().getFullYear()} Your Company. All rights
              reserved.
            </p>
          </div>
        </Container>
      </Body>
    </Html>
  );
};

export default Layout;
