import { tool } from "langchain"
import { Injectable } from "@nestjs/common"
import {
  CreateDebtSchema,
  GetByUserIdSchema,
  GetDebtListSchema,
} from "./debtagent.schema"
import { DebtService } from "../../../../resources/debt/debt.service"

@Injectable()
export class DebtAgent {
  constructor(private readonly service: DebtService) {}

  public createDebtTool = tool(
    async (input) => {
      try {
        const { userId, ...debtRequest } = input
        await this.service.createDebt(userId, debtRequest)
        return {
          success: true,
          data: "Debt created successfully",
          error: null,
        }
      } catch (error) {
        return {
          success: false,
          data: null,
          error: "Failed to create the debt",
        }
      }
    },
    {
      name: "create_debt",
      description: "Create a new debt for a user",
      schema: CreateDebtSchema,
    }
  )

  public getDebtListTool = tool(
    async (input) => {
      try {
        const { userId, searchKeyword } = input
        const debts = await this.service.findMyDebts(userId, searchKeyword)
        return {
          success: true,
          data: debts,
          error: null,
        }
      } catch (error) {
        return {
          success: false,
          data: null,
          error: "Unable to get the debt list",
        }
      }
    },
    {
      name: "get_debt_list",
      description: "List down all the debts for a user",
      schema: GetDebtListSchema,
    }
  )

  public getTotalDebtTool = tool(
    async (input) => {
      try {
        const { userId } = input
        const valuation = await this.service.calculateTotalDebt(userId)
        return {
          success: true,
          data: valuation,
          error: null,
        }
      } catch (error) {
        return {
          success: false,
          data: null,
          error: "Unable to get total debt",
        }
      }
    },
    {
      name: "get_total_debt_by_userid",
      description: "Get total debt for a user",
      schema: GetByUserIdSchema,
    }
  )
}
