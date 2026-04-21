import { tool } from "langchain"
import { Injectable } from "@nestjs/common"
import {
  CreateGoalSchema,
  GetByUserIdSchema,
} from "./agent-schemas/goalagent.schema"
import { GoalService } from "../../../resources/goal/goal.service"

@Injectable()
export class GoalAgent {
  constructor(private readonly service: GoalService) {}

  public createGoalTool = tool(
    async (input) => {
      try {
        const { userId, goalDate, goalAmount } = input
        await this.service.createGoal(userId, {
          goalDate,
          goalAmount,
        })
        return {
          success: true,
          data: "Goal created successfully",
          error: null,
        }
      } catch (error) {
        return {
          success: false,
          data: null,
          error: "Failed to create the goal",
        }
      }
    },
    {
      name: "create_goal",
      description: "Create a new goal for a user",
      schema: CreateGoalSchema,
    }
  )

  public getGoalListTool = tool(
    async (input) => {
      try {
        const { userId } = input
        const goals = await this.service.findMyGoals(userId)
        return {
          success: true,
          data: goals,
          error: null,
        }
      } catch (error) {
        return {
          success: false,
          data: null,
          error: "Unable to get the goal list",
        }
      }
    },
    {
      name: "get_goal_list",
      description: "List down all goals for user",
      schema: GetByUserIdSchema,
    }
  )

  public getNearestGoalTool = tool(
    async (input) => {
      try {
        const { userId } = input
        const goal = await this.service.findNearestGoal(userId)
        return {
          success: true,
          data: goal,
          error: null,
        }
      } catch (error) {
        return {
          success: false,
          data: null,
          error: "Unable to get the goal list",
        }
      }
    },
    {
      name: "get_user_nearest_goal",
      description: "Get nearest goal of a user",
      schema: GetByUserIdSchema,
    }
  )
}
