export default defineEventHandler(async (event) => {
  const leadId = getRouterParam(event, "id");

  if (!leadId) {
    throw createError({
      statusCode: 400,
      message: "Lead ID is required",
    });
  }

  const leadService = await getLeadPrivateService(event);
  return leadService.getLeadProposals(leadId);
});
