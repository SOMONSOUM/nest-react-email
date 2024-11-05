import * as React from "react";
import { Button, Html } from "@react-email/components";

type WelcomeEmailProps = {
  name: string;
  url: string;
};

const WelcomeEmail: React.FC<WelcomeEmailProps> = ({ name, url }) => {
  return (
    <Html lang="en">
      <h1>Welcome to Our Service! {name}</h1>
      <Button onClick={() => (window.location.href = url)}>Click me</Button>
    </Html>
  );
};
export default WelcomeEmail;
