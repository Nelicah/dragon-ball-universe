import "../styles/tailwind.css";
import { Star, Users, BookOpen, Menu, X } from "lucide-react";
import { useState, useEffect } from "react";
import Characters from "./pages/Characters";
import StorySection from "./pages/StorySection";
import HomeSection from "./layout/HomeSection";
import Footer from "./layout/Footer";

function App() {
  const [activeSection, setActiveSection] = useState("home");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [characters, setCharacters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [minKi, setMinKi] = useState(0);
  const [maxKi, setMaxKi] = useState(1e25);

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

  // eslint-disable-next-line no-unused-vars
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

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  // FUNCIONES para calcular el valor de ki y pasar las palabras a números

  function parseKiString(kiString) {
    if (!kiString) return 0;

    const text = kiString.toLowerCase().trim();

    const multipliers = {
      septillion: 1e24,
      quintillion: 1e18,
      quadrillion: 1e15,
      trillion: 1e12,
      billion: 1e9,
    };

    // Buscar sufijo y extraer número antes del sufijo
    for (const [key, value] of Object.entries(multipliers)) {
      if (text.includes(key)) {
        // Extraer el número antes del sufijo (ej: "5.5 billion")
        const match = text.match(/([\d,.]+)\s*/);
        if (match) {
          // Reemplazar comas y convertir a float
          const numberPart = parseFloat(match[1].replace(/,/g, ""));
          return isNaN(numberPart) ? 0 : numberPart * value;
        }
        return 0;
      }
    }

    // Si no tiene sufijo, intentar parsear directamente como número

    const num = parseFloat(text.replace(/[^0-9.]/g, ""));
    return isNaN(num) ? 0 : num;
  }

  const filteredByName = characters.filter((char) =>
    char.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredByKi = filteredByName.filter((char) => {
    const kiValue = parseKiString(char.ki);
    return kiValue >= minKi && kiValue <= maxKi;
  });

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
        <HomeSection
          setActiveSection={setActiveSection}
          activeSection={activeSection}
        />
        {/* Characters Section */}
        <Characters
          handleSearchChange={handleSearchChange}
          searchTerm={searchTerm}
          characters={filteredByKi}
          minKi={minKi}
          maxKi={maxKi}
          setMinKi={setMinKi}
          setMaxKi={setMaxKi}
          activeSection={activeSection}
          summaryUpToTheFirstPoint={summaryUpToTheFirstPoint}
          loading={loading}
          error={error}
        />
        {/* Story Section */}
        <StorySection activeSection={activeSection} />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default App;
