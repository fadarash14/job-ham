import Document, {
  Html,
  Head,
  Main,
  NextScript,
  DocumentContext,
} from "next/document";
import { ServerStyleSheet } from "styled-components";

class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const initialProps = await Document.getInitialProps(ctx);
    const sheet = new ServerStyleSheet();
    const originalRenderPage = ctx.renderPage;

    try {
      ctx.renderPage = () =>
        originalRenderPage({
          // eslint-disable-next-line react/display-name
          enhanceApp: (App) => (props) =>
            sheet.collectStyles(<App {...props} />),
        });

      const initialProps = await Document.getInitialProps(ctx);
      return {
        ...initialProps,
        styles: (
          <>
            {initialProps.styles}
            {sheet.getStyleElement()}
          </>
        ),
      };
    } catch {
      return { ...initialProps };
    } finally {
      sheet.seal();
    }
  }

  render() {
    return (
      <Html lang="fa" dir="rtl">
        <Head>
          <meta name="application-name" content="استخدام" />
          <meta name="apple-mobile-web-app-capable" content="yes" />
          <meta
            name="apple-mobile-web-app-status-bar-style"
            content="default"
          />
          <meta name="apple-mobile-web-app-title" content="استخدام" />
          <meta name="format-detection" content="telephone=no" />
          <meta name="mobile-web-app-capable" content="yes" />
          <meta name="msapplication-config" content="/browserconfig.xml" />
          <meta name="msapplication-TileColor" content="#2B5797" />
          <meta name="msapplication-tap-highlight" content="no" />
          <meta name="theme-color" content="#000000" />

          <link rel="apple-touch-icon" href="/pwa/touch-icon-iphone.png" />
          <link rel="apple-touch-icon" sizes="152x152" href="" />
          <link rel="apple-touch-icon" sizes="180x180" href="" />
          <link
            rel="apple-touch-icon"
            sizes="167x167"
            href="/pwa/touch-icon-ipad-retina.png"
          />
          <link
            rel="apple-touch-icon"
            sizes="144x144"
            href="/pwa/apple-touch-icon-144x144.png"
          />
          <link
            rel="apple-touch-icon"
            sizes="114x144"
            href="/pwa/apple-touch-icon-114x114.png"
          />

          <link
            rel="icon"
            type="image/png"
            sizes="32x32"
            href="/pwa/favicon-32x32.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="16x16"
            href="/pwa/favicon-16x16.png"
          />
          <link rel="manifest" href="/manifest.json" />
          <link
            rel="mask-icon"
            href="/pwa/safari-pinned-tab.svg"
            color="#5bbad5"
          />
          <link rel="shortcut icon" href="/icons/logo-fav.svg" />
          <link
            rel="preload"
            href="https://fonts.googleapis.com/css?family=Open+Sans:300&display=swap"
            as="style"
          />
          <link rel="stylesheet" href="/fonts/font.css" />

          <meta
            name="google-site-verification"
            content="NP-zsDm4RP_tyfxKiqwv9wNQaX7leZU7cMlws_1PMME"
          />

          {/*for Map*/}
          <link
            rel="stylesheet"
            href="https://unpkg.com/leaflet@1.0.1/dist/leaflet.css"
          />
          <link
            rel="stylesheet"
            href="https://unpkg.com/leaflet@1.6.0/dist/leaflet.css"
            integrity="sha512-xwE/Az9zrjBIphAcBb3F6JVqxf46+CDLwfLMHloNu6KEQCAWi6HcDUbeOfBIptF7tcCzusKFjFw2yuvEpDL9wQ=="
            crossOrigin=""
          />
          {/*Make sure you put this AFTER Leaflet's CSS*/}
          {/* eslint-disable-next-line @next/next/no-sync-scripts */}
          <script
            src="https://unpkg.com/leaflet@1.6.0/dist/leaflet.js"
            integrity="sha512-gZwIG9x3wUXg2hdXF6+rVkLF/0Vi9U8D2Ntg4Ga5I5BZpVkVxlJWbSQtXPSiUTtC0TjtGOmxa1AJPuV0CPthew=="
            crossOrigin=""
          />
        </Head>

        <body className={"scroll-d-none"} dir="rtl">
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
