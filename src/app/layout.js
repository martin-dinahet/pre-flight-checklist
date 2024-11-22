import "./globals.css";

export const metadata = {
  title: "Pre-flight checklist",
  description: "",
};

const RootLayout = ({ children }) => {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
};

export default RootLayout;
