import { AssetType } from "@/shared/constants/types"
import { tool } from "langchain"
import { Injectable } from "@nestjs/common"
import { z } from "zod"
import { GetByUserIdSchema } from "../../platform/intelligence/agents/asset/asset.schems"
import { AssetService } from "./asset.service"

@Injectable()
export class AssetAgent {
  constructor(private readonly service: AssetService) {}

  public getAssetTypesTool = tool(
    async () => {
      return Object.values(AssetType)
    },
    {
      name: "get_asset_types",
      description: "Get types of assets",
      schema: z.object({}),
    }
  )

  public getAssetListTool = tool(
    async ({ userId }: { userId: string }) => {
      try {
        const assets = await this.service.findAllMyAssets(userId)
        return JSON.stringify(assets)
      } catch (error) {
        return "Unable to get the asset list"
      }
    },
    {
      name: "get_asset_list",
      description: "Get asset list for a user",
      schema: GetByUserIdSchema,
    }
  )

  public getTotalAssetTool = tool(
    async ({ userId }: { userId: string }) => {
      try {
        const valuation =
          await this.service.calculateTotalAssetValuation(userId)
        return `Total asset is ${valuation}`
      } catch (error) {
        return "Unable to get total assets"
      }
    },
    {
      name: "get_total_asset_by_userid",
      description: "Get total asset for a user",
      schema: GetByUserIdSchema,
    }
  )
}
