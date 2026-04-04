export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const leadService = await getLeadPrivateService(event);
  return leadService.createLead(body);
});
