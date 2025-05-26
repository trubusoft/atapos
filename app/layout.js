export const metadata = {
  title: "Atap's Kitchen",
  description: "Point of Sales",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
