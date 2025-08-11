function Characters({
  characters,
  activeSection,
  summaryUpToTheFirstPoint,
  loading,
  error,
  searchTerm,
  handleSearchChange,
  minKi,
  maxKi,
  setMinKi,
  setMaxKi,
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

          <form onSubmit={(ev) => ev.preventDefault()}>
            {/* Input para buscar por nombre */}
            <input
              placeholder="Buscar personaje..."
              className="block mx-auto w-full max-w-md px-4 py-2 rounded-xl bg-gradient-to-r from-orange-500/20 to-red-500/20 border border-orange-300/30 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-orange-400 shadow-lg backdrop-blur-sm transition-all duration-300"
              type="text"
              value={searchTerm}
              onInput={handleSearchChange}
            />

            {/* Inputs para filtrar por Ki */}
            <div className="my-4">
              <label className="block text-white mb-2">
                Ki máximo: {Math.round(maxKi).toLocaleString()}
              </label>
              <input
                type="range"
                min={0}
                max={25} // vamos a usar el exponente para facilitar el rango (de 10^0 a 10^25)
                step={1}
                value={Math.log10(maxKi)}
                onChange={(e) => setMaxKi(10 ** Number(e.target.value))}
                className="w-full"
              />
            </div>

            <div className="my-4">
              <label className="block text-white mb-2">
                Ki mínimo: {Math.round(minKi).toLocaleString()}
              </label>
              <input
                type="range"
                min={0}
                max={25}
                step={1}
                value={minKi === 0 ? 0 : Math.log10(minKi)}
                onChange={(e) => {
                  const val = Number(e.target.value);
                  setMinKi(val === 0 ? 0 : 10 ** val);
                }}
                className="w-full"
              />
            </div>
          </form>

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
