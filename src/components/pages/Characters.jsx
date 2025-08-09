function Characters({
  characters,
  activeSection,
  summaryUpToTheFirstPoint,
  loading,
  error,
}) {
  if (loading) return <p className="text-center">Cargando personajes...</p>;
  if (error) return <p className="text-center text-red-500">Error: {error}</p>;

  return (
    <>
      {activeSection === "characters" && (
        <div id="characters" className="space-y-8">
          <h2 className="text-4xl font-bold text-center bg-gradient-to-r from-orange-400 to-red-500 bg-clip-text text-transparent  mb-6 leading-relaxed">
            Guerreros legendarios
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {characters.map((character) => (
              <div
                key={character.id}
                className="bg-gradient-to-br from-orange-500/20 to-red-500/20 backdrop-blur-sm rounded-xl p-6 border border-orange-300/20 hover:scale-105 transition-transform duration-300 cursor-pointer"
              >
                <div className="text-center">
                  <img
                    src={character.image}
                    alt={character.name}
                    className="w-full h-48 object-contain rounded-lg mb-4"
                  />
                  <h3 className="text-xl font-bold text-white mb-2">
                    {character.name}
                  </h3>
                  <p className="text-orange-300 font-semibold mb-1">
                    Ki: {character.ki}
                  </p>
                  <p className="text-white/80 text-sm">
                    Raza: {character.race}
                  </p>
                  <p className="text-white/80 text-sm mt-2">
                    {summaryUpToTheFirstPoint(character.description)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
}

export default Characters;
