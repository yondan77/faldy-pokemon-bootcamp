"use client";

import { useEffect, useState } from "react";
import PokemonPageDetails from "./pokemonPageDetails";

interface Pokemon {
    name: string;
    url: string;
}

function useDebounce(value: string, delay: number) {
    const [debouncedValue, setDebouncedValue] = useState(value);

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedValue(value);
        }, delay);

        return () => {
            clearTimeout(handler);
        };
    }, [value, delay]);

    return debouncedValue;
}

export default function PokemonPage() {
    const [pokes, setData] = useState<Pokemon[]>([]);
    const [allPokes, setAllPokes] = useState<Pokemon[]>([]);
    const [pokeNumber, setAddNumber] = useState(20);
    const [filteredPokes, setPokeFilter] = useState<Pokemon[]>([]);

    const [search, setSearch] = useState("");

    const debouncedSearch = useDebounce(search, 500);

    function countNumber() {
        setAddNumber(prev => prev + 20);
    }


    useEffect(() => {
        fetch("https://pokeapi.co/api/v2/pokemon/?limit=" + pokeNumber)
            .then(response => response.json())
            .then(data => setData(data.results))
            .catch(error => console.error("Fetch error:", error));

    }, [pokeNumber]);



    useEffect(() => {
        fetch("https://pokeapi.co/api/v2/pokemon/?limit=100000")
            .then(response => response.json())
            .then(data => setAllPokes(data.results))
            .catch(error => console.error("Search fetch error:", error));
    }, []);


    useEffect(() => {
        const keyword = debouncedSearch.trim().toLowerCase();

        if (!keyword) {
            setPokeFilter([]);
            return;
        }

        const result = allPokes.filter(item =>
            item.name.toLowerCase().includes(keyword)
        );

        setPokeFilter(result);

    }, [debouncedSearch, allPokes]);

    return (
        <div className="bg-white w-screen">
            <div className="container py-10 px-10 mx-0 min-w-full flex flex-col items-center">
                <div className=" text-4x bg-linear-to-r from-pink-500 via-purple-500 to-indigo-500 bg-clip-text text-transparent animate-gradient font-extrabold text-5xl">POKEMON</div>
            </div>
            
            <form className="max-w-md mx-auto mt-5">
                <label className="block mb-2.5 text-sm font-medium text-heading sr-only ">Search</label>
                <div className="relative">
                    <div className="absolute inset-y-0 inset-s-0 flex items-center ps-3 pointer-events-none">
                        <svg className="w-4 h-4 text-body text-black" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" strokeLinecap="round" strokeWidth="2" d="m21 21-3.5-3.5M17 10a7 7 0 1 1-14 0 7 7 0 0 1 14 0Z" /></svg>
                    </div>
                    <input type="text" id="search" value={search} onChange={(e) => setSearch(e.target.value)} className="text-black block w-full p-3 ps-9 bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand shadow-xs placeholder:text-body" placeholder="Search Pokemon..." required />
                </div>
                {search != "" ? <div className="text-black">Kata kunci <strong>&quot;{search}&quot;</strong> menampilkan hasil pencarian: {filteredPokes.length} Poke dari {allPokes.length}</div> : <div className="text-black">Menampilkan: {pokes.length} Poke dari {allPokes.length}</div>}
            </form>


            {debouncedSearch.trim() !== "" ? (
                <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-1 p-4 sm:p-6 lg:p-10">

                    {filteredPokes.length > 0 ? (
                        filteredPokes.map((post) => (
                            <li
                                className="bg-gray-100 p-6 rounded-2xl m-2 transition delay-100 duration-150 ease-in-out hover:bg-gray-300"
                                key={post.name}
                            >
                                <div className="text-black text-center font-extrabold uppercase">
                                    {post.name}
                                </div>

                                <PokemonPageDetails
                                    urlDetailsPoke={post.url}
                                    namePoke={post.name}
                                />
                            </li>
                        ))
                    ) : (
                        <li className="col-span-5 text-center text-black">
                            Pokémon tidak ditemukan.
                        </li>
                    )}

                </ul>
            ) : (

                // Menampilkan Pokémon utama
                <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-1 p-4 sm:p-6 lg:p-10">
                    {pokes.map((post) => (
                        <li
                            className="bg-gray-100 p-6 rounded-2xl m-2 transition delay-100 duration-150 ease-in-out hover:bg-gray-300"
                            key={post.name}
                        >
                            <div className="text-black text-center font-extrabold uppercase">
                                {post.name}
                            </div>

                            <PokemonPageDetails
                                urlDetailsPoke={post.url}
                                namePoke={post.name}
                            />
                        </li>
                    ))}
                </ul>
            )}

            <div className="container py-10 px-10 mx-0 min-w-full flex flex-col items-center">
{search == "" ? <button
                    onClick={countNumber}
                    className="bg-purple-900 text-white hover:bg-blue-400 font-bold py-2 px-4 mt-3 rounded"
                >
                    Load More
                </button> : <></>}
               
            </div>
        </div>
    );
}