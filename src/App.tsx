import { createContext, useContext, useEffect, useState } from "react";
import React from "react";
import Card from "./Card";
import { FlippedCard } from "./Card";
import Header from "./Header";
import Test from "./test";
import PopCard from "./popup";
import { atom, useAtom } from "jotai";
import Input from "./input";

let bet = 100;
let object: card = {
  typeVal: 3,
  numericVal: 1
}

function getTotal(player: unCard[]) {
  let y: number[] = player.map((item, i) => (item.numericVal));
  let x = y.reduce((sum, item) => (sum + item))

  return x;
}

export const TheResult = atom<"null" | "win" | "loss" | "draw">("null");

let object1: card = {
  typeVal: 1,
  numericVal: 11,
};

let object2: card = {
  typeVal: 4,
  numericVal: 13,
};

const CardArray = createContext(null) as any;
const CompCard = createContext(null) as any;
export const TotalAmount = createContext(null) as any;
export const compTotalAmount = createContext(null) as any;
const roundsWon = atom(0);
export const AtomBet = atom(100);
const Amount = atom(1000);
export const popupVibsility = atom<boolean>(false);
const roundsLost = atom(0);

function getCards() {
  function oneSet(num: number) {
    let card = [];
    for (let index = 0; index < num; index++) {
      let object = {
        typeVal: Math.floor((Math.random() * 4) + 1),
        numericVal: (Math.floor((Math.random() * 13) + 1)),
      };
      card.push(object);
    }
    return card;
  }

  return [oneSet(2), oneSet(1)];
}

const App = () => {
  const [blur, setBlur] = useState("");
  const [result] = useAtom(TheResult);
  const [visbility] = useAtom(popupVibsility);
  useEffect(() => {
    if (result !== "null") {
      setBlur("blur");
    } else {
      setBlur("");
    }
  }, [result]);

  const [playerCard, compCard] = getCards();

  if (getTotal(playerCard) > 21 || getTotal(compCard) > 21) {
    const [player, compArray] = getCards();
  }
  return (
    <compTotalAmount.Provider value={useState()}>
      <TotalAmount.Provider value={useState()}>
        <CompCard.Provider value={useState(compCard)}>
          <CardArray.Provider value={useState(playerCard)}>
            {(result !== "null") && <PopCard game_End={result} />}
            <div className={`py-8 w-11/12 h-screen mx-auto ${blur}`}>
              <Header />
              <main className="grid grid-cols-6">
                <Stats_SideBar />
                <The_game />
                <Contorls />
                <Input visbility={visbility} />
              </main>
            </div>
          </CardArray.Provider>
        </CompCard.Provider>
      </TotalAmount.Provider>
    </compTotalAmount.Provider>
  );
};

function Contorls() {
  const [userArray, setUserArray]: [unCard[], Function] = useContext(CardArray);
  const [compArray, setCompArray]: [unCard[], Function] = useContext(CompCard);
  const [total, setTotal]: [number, Function] = useContext(TotalAmount);
  const [compTotal, setComp] = useContext(compTotalAmount);
  const [, setResult] = useAtom(TheResult);
  const [roundWon, setRoundWon] = useAtom(roundsWon);
  const [roundLost, setRoundLost] = useAtom(roundsLost);
  const [bet, setBet] = useAtom(AtomBet);
  const [amount, setAmount] = useAtom(Amount);

  function addCard() {
    let object = {
      typeVal: Math.floor((Math.random() * 4) + 1),
      numericVal: (Math.floor((Math.random() * 13) + 1)),
    };
    return object;
  }

  useEffect(() => {
    setComp(getTotal(compArray));
    setTotal(getTotal(userArray));
  });

  function compPlay() {
    let newArray = [...compArray];
    while (getTotal(newArray) < 17) {
      newArray.push(addCard());
    }
    setCompArray(newArray);
    setComp(getTotal(newArray));
    console.log(getTotal(newArray))

    setTimeout(() => check(getTotal(newArray)), 1000);
  }

  function check(comp_total: number) {
    if (total < 22 && (total > comp_total || comp_total > 21)) {
      setResult("win");
      setRoundWon((e) => (e + 1));
      setAmount((e) => (e + (Math.abs(bet) * 1)));
    } else {
      setResult("loss");
      setRoundLost(roundLost + 1);
      setAmount((e) => (e + (Math.abs(bet) * -1)));
    }
  }
  function reset() {
    const [player, comp] = getCards();
    setUserArray(player);
    setCompArray(comp);
  }

  return (
    <div id="contorls" className=" grid grid-row-6 pl-8">
      <div>
        <div className="text-4xl  text-[#ded5d6] font-extrabold">
          {compTotal}
        </div>
      </div>
      <div className="row-span-4"></div>
      <div className="mt-8">
        <div className="text-4xl  text-[#ded5d6] font-extrabold">{total}</div>
        <button
          onClick={() => {
            setUserArray((e: card[]) => [addCard(), ...e]);
          }}
          className="text-center rounded-2xl px-14 text-lg border-[#ded5d6] border-2 font-poppins  w-2/4 mt-3  flex justify-center align-middle leading-relaxed py-1"
        >
          <p className=" whitespace-nowrap block text-ellipsis text-[#404041]">
            Hit
          </p>
        </button>
        <button
          onClick={() => {
            compPlay();
            setTimeout(reset, 3000);
          }}
          className="text-center rounded-2xl px-14 text-lg border-[#ded5d6] border-2 font-poppins  w-2/4 mt-3  flex justify-center align-middle leading-relaxed py-1"
        >
          <p className=" whitespace-nowrap block text-ellipsis text-[#404041]">
            Stand
          </p>
        </button>
        <Button>Edit Bet</Button>
      </div>
    </div>
  );
}

const Button = ({ children }: { children: string }) => {
  const [, setVisbility] = useAtom(popupVibsility);
  return (
    <button
      onClick={() => setVisbility(true)}
      className="text-center rounded-2xl px-14 text-lg border-[#ded5d6] border-2 font-poppins  w-2/4 mt-3  flex justify-center align-middle leading-relaxed py-1"
    >
      <p className=" whitespace-nowrap block text-ellipsis text-[#404041]">
        {children}
      </p>
    </button>
  );
};

const Stats_SideBar = () => {
  const [roundWon] = useAtom(roundsWon);
  const [roundLost] = useAtom(roundsLost);
  const [Total] = useAtom(Amount);
  const [bet] = useAtom(AtomBet);
  return (
    <div id="stats" className="grid grid-rows-6 h-[92vh] pr-8">
      <h2 className="text-3xl font-poppins font-bold py-2 text-[#ded5d6] text-right">
        Bet: <span className="text-[#c7b1c9]">${bet}</span>
      </h2>
      <div className="row-span-3 "></div>
      <div className="my-12 ">
        <h2 className="text-3xl font-poppins font-bold py-2 text-[#ded5d6] text-right">
          Win: <span className="text-[#c7b1c9]">{roundWon}</span>
        </h2>
        <h2 className="text-3xl font-poppins font-bold py-2 text-[#ded5d6] text-right whitespace-nowrap">
          lost: <span className="text-[#c7b1c9]">{roundLost}</span>
        </h2>
        <h2 className="text-2xl font-poppins font-bold py-2 text-[#ded5d6] text-right">
          Total: <span className="text-[#c7b1c9]">${Total}</span>
        </h2>
      </div>
    </div>
  );
};

const The_game = () => {
  const [playerArray, setTestArray]: [unCard[], Function] = useContext(
    CardArray,
  );
  const [compArray, setCompArray]: [unCard[], Function] = useContext(CompCard);

  return (
    <div id="Main" className="col-span-4 grid row-span-3 pb-12  ">
      <div id="playerCard" className="flex mx-auto mb-auto">
        {compArray.map((item: card, i: number) => {
          return <Card card={item} z_index={i} key={i} />;
        })}
        <FlippedCard />
      </div>
      <div id="playerCard" className="flex mx-auto mt-auto ">
        {playerArray.map((item: card, i: number) => {
          return <Card card={item} z_index={i} key={i} />;
        })}
      </div>
    </div>
  );
};

export default App;
