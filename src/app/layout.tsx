import GlobalContextProvider from "@/context";
import "./globals.css";
import { get as getArticles } from "@/api/articles";
import { Inter } from "next/font/google";
import { getCategoriesFromArticles } from "@/utils";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Human App",
  description: "Generated by create next app",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const articles = await getArticles();
  const categories = getCategoriesFromArticles(articles);

  return (
    <html lang="en">
      <body className={inter.className} style={{ background: '#eee' }}>
        <GlobalContextProvider value={{ articles, categories }}>
          {children}
        </GlobalContextProvider>
      </body>
    </html>
  );
}
