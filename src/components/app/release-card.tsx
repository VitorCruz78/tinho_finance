import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/ui/card"
import { IReleaseCard } from "@/interfaces/components/IReleaseCard"

export function ReleaseCard({ title, description, content }: IReleaseCard) {
  return (
    <Card className="min-w-96 min-h-40 w-fit h-fit">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        {
          !!description && (
            <CardDescription>{description}</CardDescription>
          )
        }
      </CardHeader>
      <CardContent>
        {content}
      </CardContent>
    </Card>
  )
}
