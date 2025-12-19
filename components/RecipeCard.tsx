import Link from "next/link";
import { Recipe } from "@/data/recipes";

type Props = {
  recipe: Recipe;
};

export default function RecipeCard({ recipe }: Props) {
  return (
    <Link href={`/recettes/${recipe.id}`} className="block">
      <div className="recipe-card cursor-pointer hover:shadow-2xl transition-shadow duration-300">
        <img
          src={recipe.image}
          alt={recipe.title}
          className="w-full h-48 object-cover rounded-xl mb-4"
        />
        <h2>{recipe.title}</h2>
        <p className="text-[#5a4b3c] mt-2">{recipe.description}</p>
      </div>
    </Link>
  );
}
