import { Module } from "@nestjs/common"
import { IntelligenceService } from "./intelligence.service"
import { IntelligenceController } from "./intelligence.controller"
import { CqrsModule } from "@nestjs/cqrs"
import { GeneralDbConnectionMap } from "@/shared/entity/entity-db-connection.map"
import { Thread, ThreadSchema } from "./schemas/thread.schema"
import { CreateThreadCommandHandler } from "./commands/handler/create-thread.handler"
import { IntelligenceRepository } from "./intelligence.repository"
import { EntityModule } from "@/shared/entity/entity.module"
import { FetchThreadByIdQueryHandler } from "./queries/handler/fetch-thread-by-id.handler"
import { HttpModule } from "@nestjs/axios"
import { GoalAgent } from "./agents/goal.agent"
import { config } from "@/config"
import { ChatStrategy } from "./strategies/chat.strategy"
import { SpaceAgent } from "./agents/space.agent"
import { AssetAgent } from "./agents/asset.agent"
import { DebtAgent } from "./agents/debt.agent"
import { ExpenseAgent } from "./agents/expense.agent"
import { CashflowAgent } from "./agents/cashflow.agent"
import { RepoService } from "./repo.service"
import { SpaceModule } from "@/apps/assetmanager/space/space.module"
import { AssetModule } from "@/apps/assetmanager/asset/asset.module"
import { DebtTrackModule } from "@/apps/debttrack/debttrack.module"
import { GoalManagerModule } from "@/apps/goalmanager/goalmanager.module"
import { CashFlowModule } from "@/apps/cashflow/cashflow.module"
import { PlannerModule } from "@/apps/planner/planner.module"
import { ExpenseTrackModule } from "@/apps/expensetrack/expensetrack.module"

@Module({
  imports: [
    HttpModule,
    CqrsModule,
    EntityModule.forRoot(
      config.PLATFORM_DATABASE_URI,
      GeneralDbConnectionMap.Platform
    ),
    EntityModule.forFeature(
      [{ name: Thread.name, schema: ThreadSchema }],
      GeneralDbConnectionMap.Platform
    ),
    SpaceModule,
    AssetModule,
    DebtTrackModule,
    GoalManagerModule,
    CashFlowModule,
    PlannerModule,
    ExpenseTrackModule,
  ],
  controllers: [IntelligenceController],
  providers: [
    IntelligenceService,
    IntelligenceRepository,
    ChatStrategy,
    SpaceAgent,
    AssetAgent,
    GoalAgent,
    DebtAgent,
    ExpenseAgent,
    CashflowAgent,
    CreateThreadCommandHandler,
    FetchThreadByIdQueryHandler,
    RepoService,
  ],
})
export class IntelligenceModule {}
