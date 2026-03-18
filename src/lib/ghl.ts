const GHL_API_KEY = process.env.GHL_API_KEY!;
const GHL_LOCATION_ID = process.env.GHL_LOCATION_ID!;
const GHL_BASE_URL = "https://services.leadconnectorhq.com";

interface ContactData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address1?: string;
  city?: string;
  state?: string;
  postalCode?: string;
  tags?: string[];
  source?: string;
}

interface OpportunityData {
  pipelineId: string;
  stageId?: string;
  name: string;
  contactId: string;
  monetaryValue?: number;
  source?: string;
}

async function ghlFetch(endpoint: string, body: Record<string, unknown>) {
  const res = await fetch(`${GHL_BASE_URL}${endpoint}`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${GHL_API_KEY}`,
      "Content-Type": "application/json",
      Version: "2021-07-28",
    },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    const error = await res.text();
    throw new Error(`GHL API error: ${res.status} - ${error}`);
  }

  return res.json();
}

export async function createContact(data: ContactData) {
  return ghlFetch("/contacts/", {
    ...data,
    locationId: GHL_LOCATION_ID,
  });
}

export async function createOpportunity(data: OpportunityData) {
  return ghlFetch("/opportunities/", {
    ...data,
    locationId: GHL_LOCATION_ID,
  });
}

export async function addContactNote(contactId: string, body: string) {
  return ghlFetch(`/contacts/${contactId}/notes/`, {
    body,
    locationId: GHL_LOCATION_ID,
  });
}
