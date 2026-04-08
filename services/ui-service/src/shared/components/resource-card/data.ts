import {
  Article,
  Asset,
  Cashflow,
  Debt,
  Goal,
  AssetGroup,
  Thread,
} from "@/shared/constants/types"

export enum ResourceType {
  ASSET = "asset",
  ASSETGROUP = "Asset Group",
  DEBT = "debt",
  GOAL = "goal",
  NEWS = "news",
  EXPENSE = "expense",
  CASHFLOW = "cashflow",
  CALENDAR_EVENT = "event",
  THREAD = "Advise",
}

export type ResourceTypeMap = {
  [ResourceType.ASSET]: Asset
  [ResourceType.ASSETGROUP]: AssetGroup
  [ResourceType.DEBT]: Debt
  [ResourceType.GOAL]: Goal
  [ResourceType.NEWS]: Article
  [ResourceType.CASHFLOW]: Cashflow
  [ResourceType.THREAD]: Thread
}

export const createResourceUrlMap: Partial<Record<ResourceType, string>> = {
  [ResourceType.ASSET]: "/apps/assetmanager/asset/create",
  [ResourceType.DEBT]: "/apps/debttrack/createoreditdebt",
  [ResourceType.ASSETGROUP]: "/apps/assetmanager/createoreditassetgroup",
  [ResourceType.GOAL]: "/apps/wealthplanner/createoreditgoal",
  [ResourceType.NEWS]: "/apps/discover",
  [ResourceType.EXPENSE]: "/apps/expensetrack/createoreditexpense",
  [ResourceType.CASHFLOW]: "/apps/cashflow/createoreditcashflow",
  [ResourceType.THREAD]: "/apps/taxadvisor/thread",
}
