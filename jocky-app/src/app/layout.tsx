import NavbarPage from "@/components/navbar";
import '@/css/globals.css';
import FooterPage from "@/components/footer";

export default function AppLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <NavbarPage />
        {children}
        <FooterPage />
      </body>
    </html>
  )
}
