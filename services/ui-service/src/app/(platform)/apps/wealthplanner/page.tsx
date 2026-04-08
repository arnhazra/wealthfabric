"use client"
import { endPoints } from "@/shared/constants/api-endpoints"
import HTTPMethods from "@/shared/constants/http-methods"
import useQuery from "@/shared/hooks/use-query"
import { Goal } from "@/shared/constants/types"
import {
  AddResourceCard,
  ResourceCard,
} from "@/shared/components/resource-card"
import { ResourceType } from "@/shared/components/resource-card/data"

export default function Page() {
  const goals = useQuery<Goal[]>({
    queryKey: ["get-goals"],
    queryUrl: endPoints.goal,
    method: HTTPMethods.GET,
  })

  const renderGoals = goals?.data?.map((goal) => (
    <ResourceCard
      resourceType={ResourceType.GOAL}
      resource={goal}
      key={goal._id}
    />
  ))

  return (
    <section>
      <div className="mx-auto grid gap-4 xs:grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mb-4">
        <AddResourceCard resourceType={ResourceType.GOAL} />
        {renderGoals}
      </div>
    </section>
  )
}
