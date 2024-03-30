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
          {/* <div style={{ height: "100px" }}></div> */}
          <Container
          // style={{ paddingTop: "50px" }}
          >
            {children}
          </Container>
          <AppFooter />
        </ThemeRegistry>
      </body>
    </html >
  )
}
