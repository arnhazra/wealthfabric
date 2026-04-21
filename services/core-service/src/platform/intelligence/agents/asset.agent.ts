import { AssetType } from "@/shared/constants/types"
import { tool } from "langchain"
import { Injectable } from "@nestjs/common"
import { z } from "zod"
import {
  GetByUserIdSchema,
  CreateAssetGroupSchema,
  GetAssetGroupListSchema,
  GetAssetGroupValuationSchema,
} from "./agent-schemas/assetagent.schema"
import { AssetService } from "../../../resources/asset/asset.service"
import { AssetGroup } from "@/resources/asset/schemas/assetgroup.schema"

@Injectable()
export class AssetAgent {
  constructor(private readonly service: AssetService) {}

  public getAssetTypesTool = tool(async () => Object.values(AssetType), {
    name: "get_asset_types",
    description: "Get types of assets",
    schema: z.object({}),
  })

  public getAssetListTool = tool(
    async (input) => {
      try {
        const { userId } = input
        const assets = await this.service.findAllMyAssets(userId)
        return {
          success: true,
          data: assets,
          error: null,
        }
      } catch (error) {
        return {
          success: false,
          data: null,
          error: "Unable to get the asset list",
        }
      }
    },
    {
      name: "get_asset_list",
      description: "Get asset list for a user",
      schema: GetByUserIdSchema,
    }
  )

  public getTotalAssetTool = tool(
    async (input) => {
      try {
        const { userId } = input
        const valuation =
          await this.service.calculateTotalAssetValuation(userId)
        return {
          success: true,
          data: valuation,
          error: null,
        }
      } catch (error) {
        return {
          success: false,
          data: null,
          error: "Unable to get total assets",
        }
      }
    },
    {
      name: "get_total_asset_by_userid",
      description: "Get total asset for a user",
      schema: GetByUserIdSchema,
    }
  )

  public createAssetGroupTool = tool(
    async (input) => {
      try {
        const { userId, assetgroupName } = input
        await this.service.createAssetGroup(userId, {
          assetgroupName,
        })
        return {
          success: true,
          data: "AssetGroup created successfully",
          error: null,
        }
      } catch (error) {
        return {
          success: false,
          data: null,
          error: "Failed to create the assetgroup",
        }
      }
    },
    {
      name: "create_assetgroup",
      description: "Create a assetgroup for a user",
      schema: CreateAssetGroupSchema,
    }
  )

  public getAssetGroupListTool = tool(
    async (input) => {
      try {
        const { userId, searchKeyword } = input
        const assetgroups: AssetGroup[] = await this.service.findMyAssetGroups(
          userId,
          searchKeyword
        )
        return {
          success: true,
          data: assetgroups,
          error: null,
        }
      } catch (error) {
        return {
          success: false,
          data: null,
          error: "Unable to get the assetgroup list",
        }
      }
    },
    {
      name: "get_assetgroup_list",
      description: "Get assetgroup list for a user",
      schema: GetAssetGroupListSchema,
    }
  )

  public getAssetGroupValuationTool = tool(
    async (input) => {
      try {
        const { userId, assetgroupName } = input
        const assetgroup = await this.service.findMyAssetGroups(
          userId,
          assetgroupName
        )

        return {
          success: true,
          data: assetgroup,
          error: null,
        }
      } catch (error) {
        return {
          success: false,
          data: null,
          error: "Unable to get the valuation",
        }
      }
    },
    {
      name: "get_assetgroup_valuation_by_assetgroup_name",
      description: "Get assetgroup valuation for a specific assetgroup",
      schema: GetAssetGroupValuationSchema,
    }
  )
}
