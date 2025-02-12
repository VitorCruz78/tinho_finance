import { ReleaseCard } from "@/components/app/release-card";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="">
      <ReleaseCard
        title="Lançamentos"
        description="Lançe entradas ou despesas do dia"
        content={
          <div>
            <Button variant={"default"}>Lançar</Button>
          </div>
        }
      />
    </div>
  )
}
