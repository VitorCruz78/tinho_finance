"use client";

import { ILoader } from "@/interfaces/components/ILoader";
import { useEffect, useState } from "react";
import { Progress } from "../ui/progress";

export function Loader({ loading }: ILoader) {
  const [progress, setProgress] = useState(20)

  useEffect(() => {
    let timer = setTimeout(() => setProgress(60), 500)
    clearTimeout(timer)

    timer = setTimeout(() => setProgress(!loading ? 80 : 100), 250)
    return () => clearTimeout(timer)
  }, [])

  return <Progress value={progress} />
}
