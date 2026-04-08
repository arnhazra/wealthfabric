"use client"
import { endPoints } from "@/shared/constants/api-endpoints"
import HTTPMethods from "@/shared/constants/http-methods"
import useQuery from "@/shared/hooks/use-query"
import { Cashflow } from "@/shared/constants/types"
import {
  AddResourceCard,
  ResourceCard,
} from "@/shared/components/resource-card"
import { ResourceType } from "@/shared/components/resource-card/data"
import { useUserContext } from "@/context/user.provider"
import { buildQueryUrl } from "@/shared/lib/build-url"

export default function Page() {
  const [{ searchKeyword }] = useUserContext()
  const cashflows = useQuery<Cashflow[]>({
    queryKey: ["get-cashflows", searchKeyword],
    queryUrl: buildQueryUrl(endPoints.cashflow, {
      searchKeyword: encodeURIComponent(searchKeyword),
    }),
    method: HTTPMethods.GET,
    suspense: !!searchKeyword ? false : true,
  })

  const renderCashflows = cashflows?.data?.map((cashflow) => (
    <ResourceCard
      resourceType={ResourceType.CASHFLOW}
      resource={cashflow}
      key={cashflow._id}
    />
  ))

  return (
    <section>
      <div className="mx-auto grid gap-4 xs:grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mb-4">
        <AddResourceCard resourceType={ResourceType.CASHFLOW} />
        {renderCashflows}
      </div>
    </section>
  )
}
