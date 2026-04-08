import { Injectable } from "@nestjs/common"
import { Expense } from "./schemas/expense.schema"
import { DbConnectionMap } from "@/shared/entity/entity-db-connection.map"
import {
  EntityModel,
  EntityRepository,
  InjectEntityModel,
} from "@/shared/entity/entity.repository"

@Injectable()
export class ExpenseRepository extends EntityRepository<Expense> {
  constructor(
    @InjectEntityModel(Expense.name, DbConnectionMap.Resource)
    private expenseModel: EntityModel<Expense>
  ) {
    super(expenseModel)
  }
}
