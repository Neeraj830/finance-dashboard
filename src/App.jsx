import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Layout } from './components/shared/Layout';
import { ApiStatusBanner } from './components/shared/ApiStatusBanner';
import { DashboardPage } from './pages/DashboardPage';
import { TransactionsPage } from './pages/TransactionsPage';
import { InsightsPage } from './pages/InsightsPage';
import { useBootstrap } from './hooks/useBootstrap';
import { useDarkClass } from './hooks/useDarkClass';

export default function App() {
  useBootstrap();
  useDarkClass();

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route
            path="/"
            element={
              <>
                <ApiStatusBanner />
                <DashboardPage />
              </>
            }
          />
          <Route
            path="/transactions"
            element={
              <>
                <ApiStatusBanner />
                <TransactionsPage />
              </>
            }
          />
          <Route
            path="/insights"
            element={
              <>
                <ApiStatusBanner />
                <InsightsPage />
              </>
            }
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
