function StorySection({ activeSection }) {
  return (
    <>
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
                búsqueda épica de las siete Esferas del Dragón, objetos mágicos
                que pueden conceder cualquier deseo.
              </p>
            </div>

            <div className="bg-gradient-to-br from-orange-500/20 to-red-500/20 backdrop-blur-sm rounded-xl p-6 border border-orange-300/20">
              <h3 className="text-2xl font-bold text-white mb-4">
                ⚡ Dragon Ball Z
              </h3>
              <p className="text-white/90 leading-relaxed">
                Goku descubre sus orígenes como Saiyajin mientras la Tierra
                enfrenta amenazas cada vez más poderosas. Desde la llegada de
                Raditz hasta la batalla final contra Majin Buu, los guerreros Z
                trascienden sus límites una y otra vez.
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
    </>
  );
}

export default StorySection;
