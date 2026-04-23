import { DiscoveryModule } from "@nestjs/core"
import { DynamicModule, Global, Module } from "@nestjs/common"
import { AgentRegistryService } from "./agent.service"

@Global()
@Module({})
export class AgentDiscoveryModule {
  static forRoot(): DynamicModule {
    return {
      imports: [DiscoveryModule],
      module: AgentDiscoveryModule,
      providers: [AgentRegistryService],
      exports: [AgentRegistryService],
    }
  }
}
