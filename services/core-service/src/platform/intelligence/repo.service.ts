import { Injectable } from "@nestjs/common"
import { GoalRepository } from "@/apps/goalmanager/goal.repository"
import { DebtRepository } from "@/apps/debttrack/debt.repository"
import { ExpenseRepository } from "@/apps/expensetrack/expense.repository"
import { AssetRepository } from "@/apps/assetmanager/asset/asset.repository"
import { CashFlowRepository } from "@/apps/cashflow/cashflow.repository"
import { SpaceRepository } from "@/apps/assetmanager/space/space.repository"
import { createOrConvertObjectId } from "@/shared/entity/entity.schema"

type RepoMap = {
  Space: SpaceRepository
  Asset: AssetRepository
  Debt: DebtRepository
  Goal: GoalRepository
  Expense: ExpenseRepository
  Cashflow: CashFlowRepository
}

@Injectable()
export class RepoService {
  private readonly repoMap: Partial<RepoMap>

  constructor(
    private readonly spaceRepo: SpaceRepository,
    private readonly assetRepo: AssetRepository,
    private readonly debtRepo: DebtRepository,
    private readonly goalRepo: GoalRepository,
    private readonly expenseRepo: ExpenseRepository,
    private readonly cashflowRepo: CashFlowRepository
  ) {
    this.repoMap = {
      Space: this.spaceRepo,
      Asset: this.assetRepo,
      Debt: this.debtRepo,
      Goal: this.goalRepo,
      Expense: this.expenseRepo,
      Cashflow: this.cashflowRepo,
    }
  }

  async create<T>(entity: keyof RepoMap, userId: string, data: T) {
    const repo = this.repoMap[entity]
    if (!repo) throw new Error("Unsupported Entity")
    return repo.create({ ...data, userId: createOrConvertObjectId(userId) })
  }

  async find<T>(entity: keyof RepoMap, filter: any) {
    const repo = this.repoMap[entity]
    if (!repo) throw new Error("Unsupported Entity")
    return repo.find(filter)
  }
}
