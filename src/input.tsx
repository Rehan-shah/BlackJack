import { useAtom } from "jotai"
import { useState } from "react"
import {AtomBet} from "./App"


const input = () => {
const [bet , setBet] = useAtom(AtomBet);
    

return( 
       <div >
        <input className="border border-black" value={bet} type={"number"} onChange={(e) => setBet(e.target.value) }/>  
        </div>
    )
}


export default input