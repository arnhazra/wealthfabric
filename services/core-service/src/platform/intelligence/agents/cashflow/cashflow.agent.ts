import { tool } from "langchain"
import { Injectable } from "@nestjs/common"
import { GetByUserIdSchema } from "./cashflowagent.schema"
import { CashFlowService } from "../../../../resources/cashflow/cashflow.service"
import { AssetService } from "../../../../resources/asset/asset.service"

@Injectable()
export class CashflowAgent {
  constructor(
    private readonly service: CashFlowService,
    private readonly assetService: AssetService
  ) {}

  public getCashflowsByUserIdTool = tool(
    async ({ userId }: { userId: string }) => {
      try {
        const cashflows = await this.service.findMyCashflows(userId)
        return {
          success: true,
          data: cashflows,
          error: null,
        }
      } catch (error) {
        return {
          success: false,
          data: null,
          error: "Unable to get the cashflow list",
        }
      }
    },
    {
      name: "get_cashflows_list",
      description: "Get list of cashflows for a user",
      schema: GetByUserIdSchema,
    }
  )
}
