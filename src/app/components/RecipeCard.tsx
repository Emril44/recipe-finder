import Link from "next/link";

export default function RecipeCard({ recipeId, title, image }: { recipeId: number; title: string; image: string }) {
    return (
        <Link href={`/recipes/${recipeId}`}>
            <div className="p-4 border rounded-lg shadow-md bg-white flex flex-col items-center cursor-pointer hover:shadow-lg">
                <img src={image} alt={title} className="w-full h-40 object-cover rounded-md mb-2" />
                <p className="font-semibold text-lg text-center text-black">{title}</p>
            </div>
        </Link>
    );
}