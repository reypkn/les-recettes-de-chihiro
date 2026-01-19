export default function HomePage() {
  return (
    <div className="container py-12">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
          Bienvenue sur Chihiro Recipes
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Découvrez des recettes magiques inspirées de l'univers enchanteur du Voyage de Chihiro
        </p>
      </div>

      <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="p-6 border rounded-lg">
          <h3 className="text-lg font-semibold mb-2">🍜 Recettes Authentiques</h3>
          <p className="text-muted-foreground">
            Des plats inspirés des délices du monde de Chihiro
          </p>
        </div>
        <div className="p-6 border rounded-lg">
          <h3 className="text-lg font-semibold mb-2">👨‍🍳 Communauté</h3>
          <p className="text-muted-foreground">
            Partagez vos créations culinaires avec d'autres fans
          </p>
        </div>
        <div className="p-6 border rounded-lg">
          <h3 className="text-lg font-semibold mb-2">✨ Magie Culinaire</h3>
          <p className="text-muted-foreground">
            Transformez votre cuisine en une aventure enchanteresse
          </p>
        </div>
      </div>
    </div>
  )
}
