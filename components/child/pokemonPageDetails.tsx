"use client";

import { useEffect, useState } from "react";

interface Props {
  urlDetailsPoke: string;
  pokeData?: any;
  namePoke: string;
}

export default function PokemonPageDetails({ namePoke, urlDetailsPoke }: Props) {
  const [isVisible, setIsVisible] = useState(false);
  const [types, setTypes] = useState([]);
  const [stats, setStats] = useState([]);
  const [imageUrl, setImage] = useState("")
  //const types = pokeData.types
  //const stats = pokeData.stats


  function CloseToggleStats() {
    if (isVisible == true) {
      setIsVisible(false);
    }
  }

  function OpenToggleStats() {
    if (isVisible == false) {
      setIsVisible(true);
    }
  }

  useEffect(() => {
    fetch(urlDetailsPoke)
      .then((res) => res.json())
      .then((data) => {
        setImage(data.sprites.other.home.front_default)
        setTypes(data.types)
        setStats(data.stats)

        console.log("API" + JSON.stringify(data))
      })
  }, [])


  return (
    <div onClick={OpenToggleStats} >
      {/* <pre className="text-black">
                {JSON.stringify(types, null, 2)}
            </pre> */}
      {imageUrl ? <img className="bg-gray-200 rounded-2xl" src={imageUrl} alt="image" />
        : <div className="text-black bg-gray-200 rounded-2xl p-10 text-center font-extrabold">404</div>}
      <div className="text-black text-center font-semibold uppercase">TYPE:</div>
      <div>
        <ul>
          {types?.map((post: any) => (
            <li key={post.type.name} className="text-black text-center font-medium uppercase">{post.type.name}</li>
          ))}
        </ul>
        <ul>
          {isVisible == true && (
            <>
              <div
                data-dialog-backdrop="modal"
                data-dialog-backdrop-close="true"
                className="fixed inset-0 z-999 grid h-screen w-screen place-items-center  bg-transparent backdrop-blur-sm transition-opacity duration-300"
              >
                <div
                  data-dialog="modal"
                  className="relative m-4 p-4 w-2/5 min-w-[40%] max-w-[40%] rounded-lg bg-white shadow-sm"
                >
                  <div className="flex shrink-0 items-center pb-4 text-xl text-slate-800 uppercase text-center font-extrabold">
                    {namePoke}
                  </div>
                  <div className="container py-10 px-10 mx-0 min-w-full flex flex-col items-center">
                  </div>
                  <div className="border-t border-slate-200 py-4  text-slate-600 columns-3">
                    {stats.map((post: any) => (
                      <li key={post.stat.name}>
                        <div className="text-black uppercase font-extrabold">{post.stat.name.replace(/-/g, " ")}</div>
                        <div className="text-black uppercase font-extrabold bg-amber-600 p-4 m-2 rounded-2xl">{post.base_stat}</div>
                      </li>
                    ))}
                  </div>
                  <div className="flex shrink-0 flex-wrap items-center pt-4 justify-end">
                    <button onClick={CloseToggleStats} data-dialog-close="true" className="rounded-md border border-transparent py-2 px-4 text-center font-extrabold transition-all text-slate-600 hover:bg-slate-100 focus:bg-slate-100 active:bg-slate-100 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none" type="button">
                      Tutup
                    </button>
                  </div>
                </div>
              </div>
            </>
          )}
        </ul>
      </div>
    </div>
  );
}
