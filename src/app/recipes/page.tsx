'use client';

import {Suspense, useEffect, useState} from "react";
import RecipeCard from "@/app/components/RecipeCard";
import { useSearchParams } from "next/navigation";

async function fetchRecipes(searchParams: URLSearchParams) {
    const query = searchParams.get("query") ?? "";
    const cuisines = searchParams.get("cuisine") ?? "";
    const maxTime = searchParams.get("maxTime") ?? "";
    const apiKey = process.env.NEXT_PUBLIC_SPOONACULAR_API_KEY;

    if (!apiKey) {
        console.error("API key is missing");
        throw new Error("API key is missing");
    }

    const url = new URL("https://api.spoonacular.com/recipes/complexSearch");
    if (query) url.searchParams.append("query", query);
    if (cuisines) url.searchParams.append("cuisine", cuisines);
    if (maxTime) url.searchParams.append("maxReadyTime", maxTime);
    url.searchParams.append("apiKey", apiKey);

    const response = await fetch(url.toString(), { next: { revalidate: 60 } });
    if (!response.ok) throw new Error("Failed to fetch recipes.");

    return response.json();
}

export default function RecipesPage() {
    const searchParams = useSearchParams();
    const [recipesData, setRecipesData] = useState<any>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        fetchRecipes(searchParams)
            .then(data => setRecipesData(data))
            .catch(err => setError(err.message));
    }, [searchParams]);

    if (error) {
        return <p className="text-red-500">Failed to load recipes: {error}</p>;
    }

    return (
        <div className="flex flex-col items-center min-h-screen p-4 bg-gray-200">
            <h1 className="text-2xl font-bold mb-4">Recipes</h1>
            <Suspense fallback={<p>Loading...</p>}>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 w-full max-w-5xl">
                    {recipesData?.results?.map((recipe: any) => (
                        <RecipeCard key={recipe.id} recipeId={recipe.id} title={recipe.title} image={recipe.image} />
                    ))}
                </div>
            </Suspense>
        </div>
    );
}