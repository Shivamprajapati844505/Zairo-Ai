import { Inter } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { AppContextProvider } from "./../context/AppContext";
import { Toster} from "react-hot-toast" 


const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata = {
  title: "Zairo-Ai",
  description: "Ai project",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY}>
      <AppContextProvider>
        <html lang="en">
          <body className={`${inter.className} antialiased`}>
            <Toaster toastOpetions = {
              {
                success: {style:{background:"black", color:"white"}},
                error: {style:{background:"black", color:"white"}}
                }
                }/>
            {children}
          </body>
        </html>
      </AppContextProvider>
    </ClerkProvider>
  );
}
