import React from "react";

const Card = ({ card, z_index }: {  card : card, z_index: number }) => {
    let cardSymboll = ["club", "spade", "heart", "diamond"]
    let tempCard = { ...card }
    let url = "/src/assets/" + cardSymboll[card.typeVal - 1] + ".png"
    const z = "z-" + (90 - (z_index * 10))
    let color = "";

    switch (tempCard.numericVal) {
        case 1: tempCard.numericVal = "A"
            break;
        case 11: tempCard.numericVal = "J"
            break;
        case 12: tempCard.numericVal = "Q"
            break;
        case 13: tempCard.numericVal = "K"
            break;
        default:
            break;
    }


    (card.typeVal === 3 || card.typeVal === 2) ? color = "bg-[#404041]" : color = "bg-[rgb(240,90,85)]";


    return (
        <div className={`${color} ${z} rounded-3xl w-40 grid grid-rows-4 py-2 pl-3 border-8 border-[#ffffff] h-56 ml-[-60px]`}>
            <p className=" text-[2.5rem] text-[#ffff] font-extrabold pl-4 text-left">{tempCard.numericVal}</p>
            <div className="row-span-2"></div>
            <img width="45%" src={url} />
        </div>
    )
}

export const FlippedCard = () => {
    return (
        <div className={`bg-[#ffd754] rounded-3xl w-40 grid grid-rows-4 py-2 pl-3 border-8 border-[#ffffff] h-56 ml-[-60px]`}>
        </div>
    )
}

export default Card;

