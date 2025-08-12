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

  //función para limitar la descripción de los personajes
  function summaryUpToLimit(text, maxLength = 150) {
    if (!text) return "";
    if (text.length <= maxLength) return text;

    let truncated = text.slice(0, maxLength);

    // Evitar cortar palabra a la mitad
    const lastSpace = truncated.lastIndexOf(" ");
    if (lastSpace > 0) {
      truncated = truncated.slice(0, lastSpace);
    }

    return truncated + "...";
  }

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  // FUNCIÓN para parsear Ki
  function parseKiString(kiString) {
    if (!kiString) return 0;

    const text = kiString.toLowerCase().trim();

    // Si es "0" o similar, retornar 0
    if (text === "0" || text === "unknown" || text === "desconocido") {
      return 0;
    }

    // Multipliers para palabras en inglés
    const multipliers = {
      septillion: 1e24,
      sextillion: 1e21,
      quintillion: 1e18,
      quadrillion: 1e15,
      trillion: 1e12,
      billion: 1e9,
      million: 1e6,
      thousand: 1e3,
    };

    // 1. PRIMERO: Buscar si tiene palabras multiplicadoras
    for (const [word, value] of Object.entries(multipliers)) {
      if (text.includes(word)) {
        // Extraer el número antes de la palabra
        const regex = new RegExp(`([\\d.,]+)\\s*${word}`, "i");
        const match = text.match(regex);
        if (match) {
          // Convertir el número (manejando tanto comas como puntos)
          let numberPart = match[1].replace(/,/g, ""); // Remover comas si las hay
          numberPart = parseFloat(numberPart);
          return isNaN(numberPart) ? 0 : numberPart * value;
        }
      }
    }

    // 2. SEGUNDO: Si no tiene palabras, parsear como número con puntos como separadores
    // La API usa formato "60.000.000" donde los puntos son separadores de miles

    // Contar cuántos puntos hay
    const dotCount = (text.match(/\./g) || []).length;

    if (dotCount > 1) {
      // Múltiples puntos = separadores de miles (formato europeo)
      // "60.000.000" -> "60000000"
      const cleanedText = text.replace(/\./g, "");
      const finalNumber = parseFloat(cleanedText);
      return isNaN(finalNumber) ? 0 : finalNumber;
    } else if (dotCount === 1) {
      // Un solo punto: podría ser decimal o separador de miles
      const parts = text.split(".");

      if (parts[1] && parts[1].length === 3) {
        // Si después del punto hay exactamente 3 dígitos, es separador de miles
        // "530.000" -> "530000"
        const cleanedText = text.replace(/\./g, "");
        const finalNumber = parseFloat(cleanedText);
        return isNaN(finalNumber) ? 0 : finalNumber;
      } else {
        // Sino, tratarlo como decimal
        const finalNumber = parseFloat(text);
        return isNaN(finalNumber) ? 0 : finalNumber;
      }
    } else {
      // Sin puntos, número directo
      const finalNumber = parseFloat(text.replace(/[^\d]/g, ""));
      return isNaN(finalNumber) ? 0 : finalNumber;
    }
  }

  // Función para testear el parser con ejemplos reales de la API
  function testParser() {
    const testCases = [
      "60.000.000", // 60,000,000
      "54.000.000", // 54,000,000
      "2.000.000", // 2,000,000
      "250.000.000", // 250,000,000
      "45.000.000", // 45,000,000
      "530.000", // 530,000
      "20.000", // 20,000
      "18.000", // 18,000
      "9.000", // 9,000
      "90 Septillion", // 90e24
      "19.84 Septillion", // 19.84e24
      "500.000.000", // 500,000,000
      "52.71 Septillion", // 52.71e24
      "5 Billion", // 5e9
      "40 septillion", // 40e24
      "0", // 0
    ];

    console.log("Pruebas del parser:");
    testCases.forEach((test) => {
      const result = parseKiString(test);
      console.log(`"${test}" -> ${result.toLocaleString()}`);
    });
  }

  // Ejecutar las pruebas
  testParser();

  // función auxiliar para mostrar valores de forma más legible
  function formatKiForDisplay(kiValue) {
    if (kiValue >= 1e24) return `${(kiValue / 1e24).toFixed(2)} Septillion`;
    if (kiValue >= 1e21) return `${(kiValue / 1e21).toFixed(2)} Sextillion`;
    if (kiValue >= 1e18) return `${(kiValue / 1e18).toFixed(2)} Quintillion`;
    if (kiValue >= 1e15) return `${(kiValue / 1e15).toFixed(2)} Quadrillion`;
    if (kiValue >= 1e12) return `${(kiValue / 1e12).toFixed(2)} Trillion`;
    if (kiValue >= 1e9) return `${(kiValue / 1e9).toFixed(2)} Billion`;
    if (kiValue >= 1e6) return `${(kiValue / 1e6).toFixed(2)} Million`;
    if (kiValue >= 1e3) return `${(kiValue / 1e3).toFixed(2)} Thousand`;
    return kiValue.toLocaleString();
  }
  // FIN FUNCIÓN para parsear Ki

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
          summaryUpToLimit={summaryUpToLimit}
          loading={loading}
          error={error}
          formatKiForDisplay={formatKiForDisplay}
          parseKiString={parseKiString}
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
