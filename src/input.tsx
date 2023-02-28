import { useAtom } from "jotai"
import { useEffect, useState } from "react"
import {AtomBet , popupVibsility} from "./App"


const input = ({ visbility } : {visbility : boolean}) => {
const [bet , setBet] = useAtom(AtomBet);
const [,setVisbility] = useAtom(popupVibsility)

return(
    visbility   && ( <div className={`w-64 bg-green-500 h-52 rounded-2xl m-auto top-0 bottom-0 left-0 right-0 absolute z-50 py-5`} >
    <h1 className="text-center px-14 text-xl pt-2 pb-4  font-semibold font-poppins">Edit your bet</h1>  
         <input className="rounded border border-black mx-auto w-48 h-10 absolute left-0 right-0" type={"number"} onChange={(e) => setBet(e.target.value) }/> 
         <button className="bg-white text-black mx-auto rounded  font-bold absolute left-8 right-8 bottom-0 mb-10 py-2"onClick={()=> setVisbility(false)}>Done</button> 
        </div>)
    )
}


export default input