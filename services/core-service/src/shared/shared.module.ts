import { Module } from "@nestjs/common"
import { EntityModule } from "./entity/entity.module"
import { AgentDiscoveryModule } from "./agentdiscovery/agent.module"

@Module({
  imports: [EntityModule, AgentDiscoveryModule],
  controllers: [],
  providers: [],
})
export class SharedModule {}
