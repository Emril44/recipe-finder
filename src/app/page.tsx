'use client';

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
    const [query, setQuery] = useState('');
    const [cuisines, setCuisines] = useState('');
    const [maxTime, setMaxTime] = useState('');
    const [error] = useState(false);
    const router = useRouter();

    const isButtonDisabled = !query && !cuisines && !maxTime;

    const handleNext = () => {
        const params = new URLSearchParams();
        if (query) params.append("query", query);
        if (cuisines) params.append("cuisines", cuisines);
        if (maxTime) params.append("maxTime", maxTime);

        router.push(`/recipes?${params.toString()}`);
    }

    return (
    <div className="flex flex-col items-center min-h-screen p-4 bg-gray-200">
      <h1 className="text-3xl font-bold mb-4 text-black">Yummers!</h1>
      <h3 className="text-1xl font-bold mb-6 text-black">The Recipe Finder of your dreams :D</h3>

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
                onClick={() => handleNext()}
                disabled={isButtonDisabled}
                className={`w-full mt-2 p-2 rounded-lg ${isButtonDisabled ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-500 text-white hover:bg-blue-600'}`}
            >Next
            </button>
        </div>

        {error && <p className="mt-4 text-red-500">{error}</p>}
    </div>
  );
}
