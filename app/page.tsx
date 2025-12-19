import RecipeCard from "@/components/RecipeCard";
import { recipes } from "@/data/recipes";

export default function HomePage() {
  return (
    <main className="container">
      <header>
        <h1>Les Recettes de Chihiro</h1>
        <p>Découvrez les plats magiques du voyage de Chihiro</p>
      </header>

      <section className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
        {recipes.map((recipe) => (
          <RecipeCard key={recipe.id} recipe={recipe} />
        ))}
      </section>
    </main>
  );
}
