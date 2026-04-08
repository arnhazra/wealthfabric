import { Injectable } from "@nestjs/common"
import { Debt } from "./schemas/debt.schema"
import { DbConnectionMap } from "@/shared/entity/entity-db-connection.map"
import {
  EntityRepository,
  EntityModel,
  InjectEntityModel,
} from "@/shared/entity/entity.repository"

@Injectable()
export class DebtRepository extends EntityRepository<Debt> {
  constructor(
    @InjectEntityModel(Debt.name, DbConnectionMap.Resource)
    private debtModel: EntityModel<Debt>
  ) {
    super(debtModel)
  }
}
