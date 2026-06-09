import Header from './header';
import Footer from './footer';

export default function Layout({ children, darkMode, setDarkMode }) {
  return (
    <div className="relative">
      <Header darkMode={darkMode} setDarkMode={setDarkMode} />
      <main className="pt-16">
        {children}
      </main>
      <Footer />
    </div>
  );
}