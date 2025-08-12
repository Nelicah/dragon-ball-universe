function Characters({
  characters,
  activeSection,
  summaryUpToLimit,
  loading,
  error,
  searchTerm,
  handleSearchChange,
  minKi,
  maxKi,
  setMinKi,
  setMaxKi,
  formatKiForDisplay,
  parseKiString,
}) {
  if (loading) return <p className="text-center">Cargando personajes...</p>;
  if (error) return <p className="text-center text-red-500">Error: {error}</p>;

  return (
    <>
      {activeSection === "characters" && (
        <div id="characters" className="space-y-8">
          <h2 className="text-4xl font-bold text-center bg-gradient-to-r from-orange-400 to-red-500 bg-clip-text text-transparent mb-6 leading-relaxed">
            Guerreros legendarios
          </h2>

          <form onSubmit={(ev) => ev.preventDefault()}>
            {/* Input para buscar por nombre */}
            <input
              placeholder="Buscar personaje..."
              className="block mx-auto w-full max-w-md px-4 py-2 rounded-xl bg-gradient-to-r from-orange-500/20 to-red-500/20 border border-orange-300/30 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-orange-400 shadow-lg backdrop-blur-sm transition-all duration-300 mb-6"
              type="text"
              value={searchTerm}
              onInput={handleSearchChange}
            />

            {/* Filtros de Ki */}
            <div className="bg-white/10 rounded-lg p-6 backdrop-blur-sm border border-white/20">
              <h3 className="text-white text-lg font-semibold mb-4">
                Filtrar por nivel de Ki
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Ki mínimo */}
                <div>
                  <label className="block text-white text-sm font-medium mb-2">
                    Ki mínimo: {formatKiForDisplay(minKi)}
                  </label>
                  <input
                    type="range"
                    min={0}
                    max={25}
                    step={0.5}
                    value={minKi === 0 ? 0 : Math.log10(minKi)}
                    onChange={(e) => {
                      const val = Number(e.target.value);
                      setMinKi(val === 0 ? 0 : 10 ** val);
                    }}
                    className="w-full h-2 bg-gradient-to-r from-orange-500/30 to-red-500/30 rounded-lg appearance-none cursor-pointer slider"
                  />
                  <div className="flex justify-between text-xs text-white/60 mt-1">
                    <span>0</span>
                    <span>1K</span>
                    <span>1M</span>
                    <span>1B</span>
                    <span>1T+</span>
                  </div>
                </div>

                {/* Ki máximo */}
                <div>
                  <label className="block text-white text-sm font-medium mb-2">
                    Ki máximo:{" "}
                    {maxKi === 1e25 ? "Sin límite" : formatKiForDisplay(maxKi)}
                  </label>
                  <input
                    type="range"
                    min={0}
                    max={25}
                    step={0.5}
                    value={maxKi === 1e25 ? 25 : Math.log10(maxKi)}
                    onChange={(e) => {
                      const val = Number(e.target.value);
                      setMaxKi(val === 25 ? 1e25 : 10 ** val);
                    }}
                    className="w-full h-2 bg-gradient-to-r from-orange-500/30 to-red-500/30 rounded-lg appearance-none cursor-pointer slider"
                  />
                  <div className="flex justify-between text-xs text-white/60 mt-1">
                    <span>0</span>
                    <span>1K</span>
                    <span>1M</span>
                    <span>1B</span>
                    <span>∞</span>
                  </div>
                </div>
              </div>

              {/* Botones de filtros rápidos */}
              <div className="mt-6">
                <p className="text-white text-sm font-medium mb-3">
                  Filtros rápidos:
                </p>
                <div className="flex flex-wrap gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      setMinKi(0);
                      setMaxKi(1000);
                    }}
                    className="px-3 py-1 bg-green-500/20 text-green-300 rounded-full text-sm hover:bg-green-500/30 transition-colors border border-green-500/30"
                  >
                    Principiantes (0-1K)
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setMinKi(1000);
                      setMaxKi(1e6);
                    }}
                    className="px-3 py-1 bg-blue-500/20 text-blue-300 rounded-full text-sm hover:bg-blue-500/30 transition-colors border border-blue-500/30"
                  >
                    Intermedios (1K-1M)
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setMinKi(1e6);
                      setMaxKi(1e9);
                    }}
                    className="px-3 py-1 bg-yellow-500/20 text-yellow-300 rounded-full text-sm hover:bg-yellow-500/30 transition-colors border border-yellow-500/30"
                  >
                    Avanzados (1M-1B)
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setMinKi(1e9);
                      setMaxKi(1e25);
                    }}
                    className="px-3 py-1 bg-red-500/20 text-red-300 rounded-full text-sm hover:bg-red-500/30 transition-colors border border-red-500/30"
                  >
                    Élite (1B+)
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setMinKi(0);
                      setMaxKi(1e25);
                    }}
                    className="px-3 py-1 bg-gray-500/20 text-gray-300 rounded-full text-sm hover:bg-gray-500/30 transition-colors border border-gray-500/30"
                  >
                    Todos
                  </button>
                </div>
              </div>
            </div>
          </form>

          {/* Contador de resultados */}
          <div className="text-center">
            <p className="text-white/80">
              Mostrando {characters.length} personaje
              {characters.length !== 1 ? "s" : ""}
            </p>
          </div>

          {/* Grid de personajes */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {characters.length > 0 ? (
              characters.map((character) => (
                <div
                  key={character.id}
                  className="bg-gradient-to-br from-orange-500/20 to-red-500/20 backdrop-blur-sm rounded-xl p-6 border border-orange-300/20 hover:scale-105 transition-all duration-300 cursor-pointer hover:shadow-2xl hover:shadow-orange-500/20"
                >
                  <div className="text-center">
                    <div className="relative mb-4">
                      <img
                        src={character.image}
                        alt={character.name}
                        className="w-full h-48 object-contain rounded-lg"
                        loading="lazy"
                      />
                      {/* Badge de afiliación */}
                      {character.affiliation && (
                        <div className="absolute top-2 right-2 px-2 py-1 bg-black/60 text-white text-xs rounded-full backdrop-blur-sm">
                          {character.affiliation}
                        </div>
                      )}
                    </div>

                    <h3 className="text-xl font-bold text-white mb-3">
                      {character.name}
                    </h3>

                    {/* Información del Ki mejorada */}
                    <div className="space-y-2 mb-3">
                      <p className="text-orange-300 font-semibold">
                        Ki: {formatKiForDisplay(parseKiString(character.ki))}
                      </p>
                      {character.maxKi && character.maxKi !== "0" && (
                        <p className="text-red-300 font-semibold text-sm">
                          Ki máximo:{" "}
                          {formatKiForDisplay(parseKiString(character.maxKi))}
                        </p>
                      )}
                    </div>

                    <div className="space-y-1 mb-3">
                      <p className="text-white/80 text-sm">
                        <span className="font-medium">Raza:</span>{" "}
                        {character.race}
                      </p>
                      <p className="text-white/80 text-sm">
                        <span className="font-medium">Género:</span>{" "}
                        {character.gender}
                      </p>
                    </div>

                    <p className="text-white/70 text-sm leading-relaxed">
                      {summaryUpToLimit(character.description)}
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-full text-center py-12">
                <p className="text-white/60 text-lg">
                  No se encontraron personajes con esos criterios de búsqueda.
                </p>
                <button
                  onClick={() => {
                    handleSearchChange({ target: { value: "" } });
                    setMinKi(0);
                    setMaxKi(1e25);
                  }}
                  className="mt-4 px-6 py-2 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-lg hover:from-orange-600 hover:to-red-600 transition-all duration-300"
                >
                  Limpiar filtros
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}

export default Characters;
