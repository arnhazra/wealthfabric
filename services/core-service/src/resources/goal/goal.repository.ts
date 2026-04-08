import { Injectable } from "@nestjs/common"
import { Goal } from "./schemas/goal.schema"
import { DbConnectionMap } from "@/shared/entity/entity-db-connection.map"
import {
  EntityModel,
  EntityRepository,
  InjectEntityModel,
} from "@/shared/entity/entity.repository"

@Injectable()
export class GoalRepository extends EntityRepository<Goal> {
  constructor(
    @InjectEntityModel(Goal.name, DbConnectionMap.Resource)
    private goalModel: EntityModel<Goal>
  ) {
    super(goalModel)
  }
}
