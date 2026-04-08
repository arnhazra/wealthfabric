"use client"
import { endPoints } from "@/shared/constants/api-endpoints"
import HTTPMethods from "@/shared/constants/http-methods"
import useQuery from "@/shared/hooks/use-query"
import { Thread } from "@/shared/constants/types"
import {
  AddResourceCard,
  ResourceCard,
} from "@/shared/components/resource-card"
import { ResourceType } from "@/shared/components/resource-card/data"

export default function Page() {
  const threads = useQuery<Thread[]>({
    queryKey: ["get-taxadvisor-threads"],
    queryUrl: `${endPoints.tax}/getthreads`,
    method: HTTPMethods.GET,
  })

  const renderThreads = threads?.data?.map((thread) => (
    <ResourceCard
      resourceType={ResourceType.THREAD}
      resource={thread}
      key={thread._id}
    />
  ))

  return (
    <section>
      <div className="mx-auto grid gap-4 xs:grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mb-4">
        <AddResourceCard resourceType={ResourceType.THREAD} />
        {renderThreads}
      </div>
    </section>
  )
}
