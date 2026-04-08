import * as v from "valibot";

const bodySchema = v.object({ proposalId: v.string() });

export default defineEventHandler(async (event) => {
  const leadId = getRouterParam(event, "id");

  const body = await readValidatedBody(event, (data: unknown) => v.parse(bodySchema, data));

  if (!leadId) {
    throw createError({
      statusCode: 400,
      message: "Lead ID is required",
    });
  }

  const leadService = await getLeadPrivateService(event);

  return leadService.confirmLead(leadId, { proposalId: body.proposalId });
});
