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
        : <div className="text-black bg-gray-200 rounded-2xl p-10 text-center font-extrabold">Gambar mungkin belum muncul / tidak akan muncul</div>}
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
                className="fixed inset-0 z-999 grid h-screen w-screen place-items-center bg-black/30 backdrop-blur-sm p-4"
              >
                <div
                  data-dialog="modal"
                  className="relative flex flex-col w-full sm:max-w-[90%] md:max-w-[70%] lg:max-w-[40%] max-h-[90vh] rounded-lg bg-white shadow-sm overflow-hidden"
                >
                  {/* Header */}
                  <div className="shrink-0 p-4 text-xl text-slate-800 uppercase text-center font-extrabold">
                    {namePoke}
                  </div>

                  {/* Content - Scroll */}
                  <div className="flex-1 min-h-0 overflow-y-auto px-4">
                    <div className="w-full py-6 flex flex-col items-center">
                    </div>

                    <div className="border-t border-slate-200 py-4">
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                        {stats.map((post: any) => (
                          <div key={post.stat.name} className="min-w-0">
                            <div className="text-black uppercase font-extrabold text-sm text-center">
                              {post.stat.name.replace(/-/g, " ")}
                            </div>

                            <div className="text-black text-center uppercase font-extrabold bg-amber-600 p-4 m-1 rounded-2xl">
                              {post.base_stat}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Footer - Always Visible */}
                  <div className="shrink-0 flex justify-end border-t border-slate-200 bg-white p-4">
                    <button
                      onClick={CloseToggleStats}
                      data-dialog-close="true"
                      className="rounded-md py-2 px-4 font-extrabold text-slate-600 transition-all hover:bg-slate-100"
                      type="button"
                    >
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
