import "../styles/tailwind.css";
import { Star, Zap, Users, BookOpen, Menu, X } from "lucide-react";
import { useState, useEffect } from "react";
import Characters from "./pages/Characters";

function App() {
  const [activeSection, setActiveSection] = useState("home");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [characters, setCharacters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const el = document.getElementById("characters");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  }, [activeSection]);

  const fetchAllCharacters = async () => {
    try {
      setLoading(true);
      setError(null);
      const allCharacters = [];
      let currentPage = 1;
      let totalPages = 1;

      // Primera llamada para obtener totalPages y primeros personajes
      const firstResponse = await fetch(
        `https://dragonball-api.com/api/characters?page=${currentPage}`
      );
      if (!firstResponse.ok) {
        throw new Error(
          `Error al obtener datos: ${firstResponse.status} ${firstResponse.statusText}`
        );
      }
      const firstData = await firstResponse.json();
      allCharacters.push(...firstData.items);
      totalPages = firstData.meta.totalPages || 1;

      // Carga el resto de páginas (si hay)
      while (currentPage < totalPages) {
        currentPage++;
        const response = await fetch(
          `https://dragonball-api.com/api/characters?page=${currentPage}`
        );
        if (!response.ok) {
          throw new Error(
            `Error al obtener página ${currentPage}: ${response.status} ${response.statusText}`
          );
        }
        const data = await response.json();
        allCharacters.push(...data.items);
      }

      setCharacters(allCharacters);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllCharacters();
  }, []);

  const NavButton = ({ section, icon: Icon, label, isActive }) => (
    <button
      onClick={() => {
        setActiveSection(section);
        setMobileMenuOpen(false);
      }}
      className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-300 ${
        isActive
          ? "bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-lg transform scale-105"
          : "text-orange-100 hover:bg-orange-500/20 hover:text-white"
      }`}
    >
      <Icon size={20} />
      <span className="font-semibold">{label}</span>
    </button>
  );

  function summaryUpToTheFirstPoint(text) {
    if (!text) return "";
    const index = text.indexOf(".");
    return index !== -1 ? text.slice(0, index + 1) : text;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-orange-900">
      {/* Header */}
      <header className="bg-gradient-to-r from-orange-600 to-red-600 shadow-2xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center shadow-lg">
                <Star className="text-white" size={24} fill="currentColor" />
              </div>
              <h1 className="text-2xl font-bold text-white">
                Dragon Ball Universe
              </h1>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex space-x-4">
              <NavButton
                section="home"
                icon={Star}
                label="Inicio"
                isActive={activeSection === "home"}
              />
              <NavButton
                section="characters"
                icon={Users}
                label="Personajes"
                isActive={activeSection === "characters"}
              />
              <NavButton
                section="story"
                icon={BookOpen}
                label="Historia"
                isActive={activeSection === "story"}
              />
            </nav>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg bg-orange-500/20 text-white"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {/* Mobile Navigation */}
          {mobileMenuOpen && (
            <nav className="md:hidden pb-4 space-y-2">
              <NavButton
                section="home"
                icon={Star}
                label="Inicio"
                isActive={activeSection === "home"}
              />
              <NavButton
                section="characters"
                icon={Users}
                label="Personajes"
                isActive={activeSection === "characters"}
              />
              <NavButton
                section="story"
                icon={BookOpen}
                label="Historia"
                isActive={activeSection === "story"}
              />
            </nav>
          )}
        </div>
      </header>
      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Home Section */}
        {activeSection === "home" && (
          <div className="space-y-8">
            <div className="text-center">
              <h2 className="text-5xl font-bold leading-[1.3] bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent mb-4">
                ¡Bienvenido al Universo Dragon Ball!
              </h2>
              <p className="text-xl text-white/90 max-w-3xl mx-auto">
                Explora el increíble mundo de Dragon Ball, conoce a tus
                personajes favoritos y descubre las legendarias Esferas del
                Dragón.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              <div
                onClick={() => setActiveSection("characters")}
                className="bg-gradient-to-br from-orange-500/20 to-red-500/20 backdrop-blur-sm rounded-xl p-6 border border-orange-300/20 cursor-pointer"
              >
                <Users className="text-orange-400 mb-4" size={32} />
                <h3 className="text-xl font-bold text-white mb-2">
                  Personajes Épicos
                </h3>
                <p className="text-white/80">
                  Conoce a los guerreros más poderosos del universo
                </p>
              </div>

              <div
                onClick={() => setActiveSection("story")}
                className="bg-gradient-to-br from-yellow-500/20 to-orange-500/20 backdrop-blur-sm rounded-xl p-6 border border-yellow-300/20 cursor-pointer"
              >
                <BookOpen className="text-yellow-400 mb-4" size={32} />
                <h3 className="text-xl font-bold text-white mb-2">
                  Historia Épica
                </h3>
                <p className="text-white/80">
                  Revive las aventuras más emocionantes
                </p>
              </div>
            </div>
          </div>
        )}
        {/* Characters Section */}
        <Characters
          characters={characters}
          activeSection={activeSection}
          summaryUpToTheFirstPoint={summaryUpToTheFirstPoint}
          loading={loading}
          error={error}
        />
        {/* Story Section */}
        {activeSection === "story" && (
          <div id="story" className="space-y-8 max-w-4xl mx-auto">
            <h2 className="text-4xl font-bold text-center bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
              La Historia de Dragon Ball
            </h2>

            <div className="space-y-6">
              <div className="bg-gradient-to-br from-blue-500/20 to-purple-500/20 backdrop-blur-sm rounded-xl p-6 border border-blue-300/20">
                <h3 className="text-2xl font-bold text-white mb-4">
                  🥋 Dragon Ball
                </h3>
                <p className="text-white/90 leading-relaxed">
                  La aventura comienza con un joven Goku que vive solo en las
                  montañas. Su encuentro con Bulma lo lleva a embarcarse en una
                  búsqueda épica de las siete Esferas del Dragón, objetos
                  mágicos que pueden conceder cualquier deseo.
                </p>
              </div>

              <div className="bg-gradient-to-br from-orange-500/20 to-red-500/20 backdrop-blur-sm rounded-xl p-6 border border-orange-300/20">
                <h3 className="text-2xl font-bold text-white mb-4">
                  ⚡ Dragon Ball Z
                </h3>
                <p className="text-white/90 leading-relaxed">
                  Goku descubre sus orígenes como Saiyajin mientras la Tierra
                  enfrenta amenazas cada vez más poderosas. Desde la llegada de
                  Raditz hasta la batalla final contra Majin Buu, los guerreros
                  Z trascienden sus límites una y otra vez.
                </p>
              </div>

              <div className="bg-gradient-to-br from-purple-500/20 to-pink-500/20 backdrop-blur-sm rounded-xl p-6 border border-purple-300/20">
                <h3 className="text-2xl font-bold text-white mb-4">
                  🌟 Dragon Ball Super
                </h3>
                <p className="text-white/90 leading-relaxed">
                  Las aventuras continúan con nuevos niveles de poder como el
                  Ultra Instinto y enfrentamientos con dioses de la destrucción.
                  El multiverso se abre ante nuestros héroes en batallas que
                  determinan el destino de universos enteros.
                </p>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-gradient-to-r from-gray-900 to-black py-8 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-white/70">
            © 2025 Dragon Ball Universe. Una aplicación web creada con ❤️ para
            fans de Dragon Ball
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;
