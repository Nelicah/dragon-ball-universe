import { Users, BookOpen } from "lucide-react";

function HomeSection({ setActiveSection, activeSection }) {
  return (
    <>
      {activeSection === "home" && (
        <div className="space-y-8">
          <div className="text-center">
            <h2 className="text-5xl font-bold leading-[1.3] bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent mb-4">
              ¡Bienvenido al Universo Dragon Ball!
            </h2>
            <p className="text-xl text-white/90 max-w-3xl mx-auto">
              Explora el increíble mundo de Dragon Ball, conoce a tus personajes
              favoritos y descubre las legendarias Esferas del Dragón.
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
    </>
  );
}

export default HomeSection;
