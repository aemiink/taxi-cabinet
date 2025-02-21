import './App.css';
import Home from './components/Home';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import { LanguageProvider } from './context/LanguageContext';
import ReservationPage from './components/Reservation';
import AdminPanel from './components/AdminPanel';

function App() {
  return (
    <LanguageProvider>
      <Navbar />
      <Home />
      {/*<ReservationPage/>
      <AdminPanel/>*/}
      <Footer />
    </LanguageProvider>
  );
}

export default App;
