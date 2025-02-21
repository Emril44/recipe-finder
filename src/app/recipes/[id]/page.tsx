'use client';

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

async function fetchRecipeDetails(recipeId: number) {
    const apiKey = process.env.NEXT_PUBLIC_SPOONACULAR_API_KEY;

    if (!apiKey) {
        console.error("API key is missing");
        throw new Error("API key is missing");
    }

    const url = `https://api.spoonacular.com/recipes/${recipeId}/information?apiKey=${apiKey}`;
    const res = await fetch(url, { next: { revalidate: 60 } });
    if (!res.ok) throw new Error("Failed to fetch recipe details");

    return res.json();
}

export default function RecipeDetailsPage() {
    const params = useParams();
    const [recipeDetails, setRecipeDetails] = useState<{ image: string; title: string; readyInMinutes: number; servings: number; summary: string; extendedIngredients: { id: number; original: string }[] } | null>(null);

    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (params?.id) {
            fetchRecipeDetails(Number(params.id))
                .then(data => setRecipeDetails(data))
                .catch(err => setError(err.message));
        }
    }, [params?.id]);

    if (error) {
        return <p className="text-red-500">Failed to load recipe details: {error}</p>;
    }

    if (!recipeDetails) {
        return <p className="text-gray-500">Loading...</p>;
    }

    return (
        <div className="flex flex-col items-center min-h-screen p-4 bg-white">
            <div className="w-full max-w-3xl flex flex-col items-center text-center">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={recipeDetails.image} alt={recipeDetails.title} className="w-3/4 max-w-lg h-auto object-cover rounded-md mb-4" />
                <p className="font-semibold text-2xl text-black">{recipeDetails.title}</p>
                <p className="text-base text-gray-600">⏳ {recipeDetails.readyInMinutes} min | 🍽 {recipeDetails.servings} servings</p>
                <p className="text-sm italic text-gray-500 mt-2">{recipeDetails.summary.replace(/<[^>]*>/g, "")}</p>
            </div>
            <div className="w-full max-w-2xl mt-6">
                <h3 className="font-semibold text-lg text-black">Ingredients:</h3>
                <ul className="text-sm list-disc list-inside text-gray-700">
                    {recipeDetails.extendedIngredients.map((ingredient: { id: number; original: string }, index: number) => (
                        <li key={`${ingredient.id}-${index}`}>{ingredient.original}</li>
                    ))}
                </ul>
            </div>
        </div>
    );
}