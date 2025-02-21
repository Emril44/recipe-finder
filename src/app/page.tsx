'use client';

import { useState } from "react";

export default function Home() {
    const [query, setQuery] = useState('');
    const [cuisines, setCuisines] = useState('');
    const [maxTime, setMaxTime] = useState('');
    const [recipes, setRecipes] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

    const isButtonDisabled = !query && !cuisines && !maxTime;

    const fetchRecipes = () => {
        console.log("fetchRecipes is not implemented yet.");
    };


    return (
    <div className="flex flex-col items-center min-h-screen p-4 bg-gray-400">
      <h1 className="text-3xl font-bold mb-4">Yummers!</h1>
      <h3 className="text-1xl font-bold mb-6">The Recipe Finder of your dreams :D</h3>

        <div className="w-full max-w-md">
            <input
                type="text"
                placeholder="Search for a recipe..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="w-full p-2 border rounded-lg shadow-md text-black bg-white"
                />
            <label htmlFor="cuisine" className="block mt-2 font-bold">Cuisine options</label>
            <select
                name="cuisine"
                id="cuisine"
                value={cuisines}
                onChange={(e) => setCuisines(e.target.value)}
                className="w-full p-2 mb-2 border rounded-lg shadow-md text-black bg-white placeholder-gray-400"
                >
                <option value="">Select a cuisine...</option>
                <option value="italian">Italian</option>
                <option value="mexican">Mexican</option>
                <option value="chinese">Chinese</option>
                <option value="japanese">Japanese</option>
            </select>
            <input
                type="number"
                placeholder="Maximum preparation time (in minutes)..."
                value={maxTime}
                onChange={(e) => setMaxTime(e.target.value)}
                className="w-full p-2 border rounded-lg shadow-md text-black bg-white"
            />
            <button
                onClick={() => fetchRecipes}
                disabled={isButtonDisabled}
                className={`w-full mt-2 p-2 rounded-lg ${isButtonDisabled ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-500 text-white hover:bg-blue-600'}`}
            >Next
            </button>
        </div>

        {loading && <p className="mt-4">Loading...</p> }
        {error && <p className="mt-4 text-red-500">{error}</p>}

        <ul className="mt-4 w-full max-w-md">
            {recipes.map((recipe, index) => (
                <li key={index} className="p-2 border-b bg-white shadow-sm rounded-md">
                    {recipe.name}
                </li>
            ))}
        </ul>
    </div>
  );
}
