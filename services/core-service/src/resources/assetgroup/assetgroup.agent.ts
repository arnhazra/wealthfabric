import { AppEventMap } from "@/shared/constants/app-events.map"
import { tool } from "langchain"
import { Injectable } from "@nestjs/common"
import { AssetGroup } from "@/resources/assetgroup/schemas/assetgroup.schema"
import {
  CreateAssetGroupSchema,
  GetAssetGroupListSchema,
  GetAssetGroupValuationSchema,
} from "../../platform/intelligence/agents/assetgroup/assetgroup.schema"
import { AssetGroupService } from "./assetgroup.service"

@Injectable()
export class AssetGroupAgent {
  constructor(private readonly service: AssetGroupService) {}

  public createAssetGroupTool = tool(
    async ({
      userId,
      assetgroupName,
    }: {
      userId: string
      assetgroupName: string
    }) => {
      try {
        await this.service.createAssetGroup(userId, {
          assetgroupName,
        })
        return "AssetGroup created successfully"
      } catch (error) {
        return "Failed to create the assetgroup"
      }
    },
    {
      name: "create_assetgroup",
      description: "Create a assetgroup for a user",
      schema: CreateAssetGroupSchema,
    }
  )

  public getAssetGroupListTool = tool(
    async ({
      userId,
      searchKeyword,
    }: {
      userId: string
      searchKeyword: string
    }) => {
      try {
        const assetgroups: AssetGroup[] = await this.service.findMyAssetGroups(
          userId,
          searchKeyword
        )
        return JSON.stringify(assetgroups)
      } catch (error) {
        return "Unable to get the assetgroup list"
      }
    },
    {
      name: "get_assetgroup_list",
      description: "Get assetgroup list for a user",
      schema: GetAssetGroupListSchema,
    }
  )

  public getAssetGroupValuationTool = tool(
    async ({
      userId,
      assetgroupName,
    }: {
      userId: string
      assetgroupName: string
    }) => {
      try {
        const assetgroup: any = (
          await this.service.findMyAssetGroups(userId, assetgroupName)
        ).shift()
        const valuation = assetgroup.currentValuation ?? 0
        return `Valuation is ${valuation}`
      } catch (error) {
        return "Unable to get the valuation"
      }
    },
    {
      name: "get_assetgroup_valuation_by_assetgroup_name",
      description: "Get assetgroup valuation for a specific assetgroup",
      schema: GetAssetGroupValuationSchema,
    }
  )
}
