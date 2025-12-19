import { recipes } from "@/data/recipes";
import { notFound } from "next/navigation";

type PageProps = {
  params: Promise<{
    id: string;
  }>;
};

export function generateStaticParams() {
  return recipes.map((recipe) => ({
    id: recipe.id,
  }));
}

export default async function RecipePage({ params }: PageProps) {
  const { id } = await params;

  const recipe = recipes.find((r) => r.id === id);

  if (!recipe) {
    notFound();
  }

  return (
    <article className="container">
      <h1 className="text-4xl text-[#926f52] font-segoe mb-6">{recipe.title}</h1>

      <img
        src={recipe.image}
        alt={recipe.title}
        className="w-full h-64 object-cover rounded-xl mb-8"
      />

      <section className="ingredients">
        <h2 className="text-2xl font-semibold mb-2">Ingrédients</h2>
        <ul className="list-square pl-6">
          {recipe.ingredients.map((ingredient) => (
            <li key={ingredient}>{ingredient}</li>
          ))}
        </ul>
      </section>

      <section className="instructions mt-6">
        <h2 className="text-2xl font-semibold mb-2">Préparation</h2>
        <ol className="list-decimal pl-6 space-y-1">
          {recipe.steps.map((step, index) => (
            <li key={index}>{step}</li>
          ))}
        </ol>
      </section>
    </article>
  );
}
