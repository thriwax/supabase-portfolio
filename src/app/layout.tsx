import { Geist, Geist_Mono, Bebas_Neue } from "next/font/google";
import "./globals.css";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import katana from "./fonts/katana";
import { AudioPlayerProvider } from "./components/AudioPlayerContext/AudioPlayerContext";
import { FloatingAudioPlayer } from "./components/FloatingAudioPlayer/FloatingAudioPlayer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const bebasNeue = Bebas_Neue({
  variable: "--font-bebas-neue",
  subsets: ["latin"],
  weight: "400",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${bebasNeue.variable} ${katana.variable} antialiased`}
      >
        <AudioPlayerProvider>
          <Header />
          <FloatingAudioPlayer /> {/* ← добавлено */}
          <div>{children}</div>
          <Footer />
        </AudioPlayerProvider>
      </body>
    </html>
  );
}

