import { Injectable } from "@nestjs/common"
import { Event } from "./schemas/event.schema"
import { DbConnectionMap } from "@/shared/entity/entity-db-connection.map"
import {
  EntityModel,
  EntityRepository,
  InjectEntityModel,
} from "@/shared/entity/entity.repository"

@Injectable()
export class EventRepository extends EntityRepository<Event> {
  constructor(
    @InjectEntityModel(Event.name, DbConnectionMap.Resource)
    private eventModel: EntityModel<Event>
  ) {
    super(eventModel)
  }
}
