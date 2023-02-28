import { useAtom } from "jotai"
import { useState } from "react"
import { TheResult } from "./App"


export default function popCard({ game_End } :{ game_End :"win" | "loss" | "draw"}){
 let [result , setResult] = useAtom(TheResult)
   let color = "bg-red-500"

   if(game_End === "win"){
      color = "bg-green-500"
   }
   else if(game_End === "draw"){
      color = "bg-organe-500"
   }
    
return (
(
<div className={`w-64 h-64 rounded-2xl ${color} m-auto top-0 bottom-0 left-0 right-0 absolute z-50 py-5`}> 
   <h1 className="text-center text-4xl text-white font-poppins font-bold">You {game_End}</h1>
   <button className="bg-white text-black mx-auto rounded  font-bold absolute left-8 right-8 bottom-0 mb-10 py-2" onClick={() => {setResult("null")}}>Close</button>
</div>)


)

}