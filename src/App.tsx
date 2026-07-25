import { BrowserRouter } from 'react-router-dom';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';

export default function App() {
  return (
    <BrowserRouter>
      <Header />

      <main>
        <h1>EVonix Layout Test</h1>
        <p>This is the page content.</p>
      </main>

      <Footer />
    </BrowserRouter>
  );
}