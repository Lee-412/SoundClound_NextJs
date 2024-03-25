import AppFooter from '@/components/Footer/app.footer';
import AppHeader from '@/components/Header/app.header';
import ThemeRegistry from '@/components/theme-registry/theme.registry';
import { Container } from '@mui/material';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <ThemeRegistry>
          <AppHeader />
          <Container>
            {children}
          </Container>
          <AppFooter />
        </ThemeRegistry>
      </body>
    </html >
  )
}
