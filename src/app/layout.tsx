
import AppFooter from '@/components/Footer/app.footer';
import AppHeader from '@/components/Header/app.header';
import ThemeRegistry from '@/components/theme-registry/theme.registry';
import NextAuthWrapper from '@/lib/next.auth.wrapper';
import { Container } from '@mui/material';
import { SessionProvider } from "next-auth/react"
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <ThemeRegistry>
          <NextAuthWrapper>
            <AppHeader />
            <Container>
              {children}
            </Container>
            <AppFooter />
          </NextAuthWrapper>

        </ThemeRegistry>
      </body>
    </html >
  )
}
