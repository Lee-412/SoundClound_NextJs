
import AppFooter from '@/components/Footer/app.footer';
import AppHeader from '@/components/Header/app.header';
import ThemeRegistry from '@/components/theme-registry/theme.registry';
import NextAuthWrapper from '@/lib/next.auth.wrapper';
import { Container } from '@mui/material';
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <ThemeRegistry>
          <NextAuthWrapper>
            <AppHeader />
            {children}
          </NextAuthWrapper>

          <AppFooter />
        </ThemeRegistry>
      </body>
    </html >
  )
}
