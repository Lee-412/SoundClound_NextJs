
import AppFooter from '@/components/Footer/app.footer';
import AppHeader from '@/components/Header/app.header';
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    < >
      <AppHeader />

      {children}
      <AppFooter />
    </>
  )
}
