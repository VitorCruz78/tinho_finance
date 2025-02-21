"use client";

import { CurrencyPtBr } from "@/utils/currency/currency_pt-br";
import { useState } from "react";

export function AccountBalance() {
  const [positiveBalance, setPositiveBalance] = useState<boolean>(true)

  return (
    <div className="absolute right-4 top-4">
      <div className="w-fit h-10 flex flex-col items-center justify-center border border-default rounded-md px-4">
        <span className="text-sm flex flex-row items-center gap-2">
          Saldo em conta:
          <span className={`${positiveBalance ? 'text-green-500' : 'text-red-500'}`}>{CurrencyPtBr(0)}</span>
        </span>
      </div>
    </div>
  )
}
