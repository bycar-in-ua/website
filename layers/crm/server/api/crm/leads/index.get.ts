export default defineEventHandler(async (event) => {
  const leadService = await getLeadPrivateService(event);
  return leadService.getMyLeads();
});
