import { Route, Routes } from 'react-router-dom';
import Footer from './components/layout/Footer';
import Header from './components/layout/Header';
import CartPage from './pages/CartPage';
import ComparePage from './pages/ComparePage';
import HomePage from './pages/HomePage';
import HotDealsPage from './pages/HotDealsPage';
import LoginPage from './pages/LoginPage';
import NotFoundPage from './pages/NotFoundPage';
import RegisterPage from './pages/RegisterPage';
import VehicleDetailsPage from './pages/VehicleDetailsPage';
import VehiclesPage from './pages/VehiclesPage';
import SupportPage from './pages/SupportPage';
import ChatbotWidget from './components/chatbot/ChatbotWidget';

export default function App() {
  return (
    <div className="flex min-h-screen flex-col bg-slate-50 font-sans text-slate-900">
      <Header />

      <main className="flex flex-grow flex-col">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/vehicles" element={<VehiclesPage />} />
          <Route
            path="/vehicles/:id"
            element={<VehicleDetailsPage />}
          />
          <Route path="/hot-deals" element={<HotDealsPage />} />
          <Route path="/compare" element={<ComparePage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/support" element={<SupportPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>

      <ChatbotWidget />

      <Footer />
    </div>
  );
}