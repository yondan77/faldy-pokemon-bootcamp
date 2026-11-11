"use client";

import { useEffect, useState, } from "react";

export default function TemplateBox() {



    return (
        <div>
            {/* <pre className="text-black">
                {JSON.stringify(types, null, 2)}
            </pre> */}
            <img className="bg-gray-200 rounded-2xl" src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/4.png" alt="image" />
            <div className="text-black text-center font-semibold uppercase">TYPE:</div>
            <div>
                <ul>

                    <li className="text-black text-center font-medium uppercase">hh5</li>

                </ul>
            </div>
        </div>
    );
}
