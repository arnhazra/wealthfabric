export enum AppEventMap {
  // General Events
  GetUserDetails = "getUserDetails",
  GetSubscriptionDetails = "getSubscriptionDetails",
  ActivateTrialSubscription = "activateTrialSubscription",

  // AssetManager Events
  GetTotalAsset = "getTotalAsset",
  FindAssetById = "findAssetbyId",
  UpdateAssetById = "updateAssetById",
  GetAssetList = "getAssetList",

  // DebtTrack Events
  GetTotalDebt = "getTotalDebt",
  GetDebtList = "getDebtList",

  // Goal Events
  GetGoalList = "getGoalList",
  GetNearestGoal = "getNearestGoal",

  // ExpenseTrack Events
  GetExpenseByMonth = "getExpenseByMonth",

  // CashFlow Events
  FindCashFlowsByUserId = "findCashFlowsByUserId",

  // Calendar Events
  CreateCalendarEvent = "createCalendarEvent",
  GetCalendarEvents = "getCalendarEvents",
}
