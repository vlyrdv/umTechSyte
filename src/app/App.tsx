import { NavigationProvider, useNavigation } from "./navigation";
import { Layout } from "../components/layout/Layout";
import { AboutPage } from "../pages/AboutPage";
import { ContactsPage } from "../pages/ContactsPage";
import { HomePage } from "../pages/HomePage";
import { PortfolioPage } from "../pages/PortfolioPage";
import { SolutionsPage } from "../pages/SolutionsPage";

const routes = {
  "/": HomePage,
  "/solutions": SolutionsPage,
  "/portfolio": PortfolioPage,
  "/about": AboutPage,
  "/contacts": ContactsPage
};

function AppContent() {
  const { path } = useNavigation();
  const Page = routes[path as keyof typeof routes] ?? HomePage;

  return (
    <Layout>
      <Page />
    </Layout>
  );
}

export default function App() {
  return (
    <NavigationProvider>
      <AppContent />
    </NavigationProvider>
  );
}
