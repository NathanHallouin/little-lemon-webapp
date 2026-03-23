/**
 * Stuart Delivery API Integration
 * Documentation: https://docs.stuart.com/
 */

const STUART_API_URL = import.meta.env.VITE_STUART_API_URL || 'https://api.sandbox.stuart.com';
const STUART_CLIENT_ID = import.meta.env.VITE_STUART_CLIENT_ID || '';
const STUART_CLIENT_SECRET = import.meta.env.VITE_STUART_CLIENT_SECRET || '';

interface StuartToken {
  access_token: string;
  token_type: string;
  expires_in: number;
  scope: string;
}

interface Address {
  street: string;
  postcode: string;
  city: string;
  country: string;
  phone?: string;
  firstname?: string;
  lastname?: string;
  company?: string;
}

interface DeliveryLocation {
  address: string;
  comment?: string;
  contact?: {
    firstname: string;
    lastname: string;
    phone: string;
    email?: string;
  };
}

interface DeliveryJob {
  id: number;
  status: string;
  pickup: DeliveryLocation;
  dropoff: DeliveryLocation;
  tracking_url?: string;
  eta?: string;
}

interface DeliveryQuote {
  amount: number;
  currency: string;
  eta: string;
}

// Restaurant address (pickup point)
const RESTAURANT_ADDRESS: Address = {
  street: '2 Rue Jeanne d\'Arc',
  postcode: '45000',
  city: 'Orléans',
  country: 'France',
  phone: '+33912345678',
  company: 'Little Lemon Restaurant'
};

let cachedToken: { token: StuartToken; expiresAt: number } | null = null;

/**
 * Get Stuart API access token
 */
async function getAccessToken(): Promise<string> {
  // Check cached token
  if (cachedToken && Date.now() < cachedToken.expiresAt) {
    return cachedToken.token.access_token;
  }

  if (!STUART_CLIENT_ID || !STUART_CLIENT_SECRET) {
    throw new Error('Stuart API credentials not configured');
  }

  const response = await fetch(`${STUART_API_URL}/oauth/token`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({
      client_id: STUART_CLIENT_ID,
      client_secret: STUART_CLIENT_SECRET,
      grant_type: 'client_credentials',
      scope: 'api',
    }),
  });

  if (!response.ok) {
    throw new Error('Failed to authenticate with Stuart API');
  }

  const token: StuartToken = await response.json();
  cachedToken = {
    token,
    expiresAt: Date.now() + (token.expires_in - 60) * 1000, // Refresh 1 minute before expiry
  };

  return token.access_token;
}

/**
 * Make authenticated request to Stuart API
 */
async function stuartRequest<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const token = await getAccessToken();

  const response = await fetch(`${STUART_API_URL}${endpoint}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
      ...options.headers,
    },
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(error.message || `Stuart API error: ${response.status}`);
  }

  return response.json();
}

/**
 * Validate a delivery address
 */
export async function validateAddress(address: string): Promise<boolean> {
  try {
    const response = await stuartRequest<{ valid: boolean }>('/v2/addresses/validate', {
      method: 'POST',
      body: JSON.stringify({
        address,
        type: 'delivering',
      }),
    });
    return response.valid;
  } catch {
    return false;
  }
}

/**
 * Get a delivery quote
 */
export async function getDeliveryQuote(deliveryAddress: string): Promise<DeliveryQuote> {
  const restaurantFullAddress = `${RESTAURANT_ADDRESS.street}, ${RESTAURANT_ADDRESS.postcode} ${RESTAURANT_ADDRESS.city}, ${RESTAURANT_ADDRESS.country}`;

  const response = await stuartRequest<{ amount: number; currency: string; eta: string }>('/v2/jobs/pricing', {
    method: 'POST',
    body: JSON.stringify({
      job: {
        transport_type: 'bike',
        pickups: [{
          address: restaurantFullAddress,
        }],
        dropoffs: [{
          address: deliveryAddress,
        }],
      },
    }),
  });

  return {
    amount: response.amount / 100, // Convert cents to euros
    currency: response.currency,
    eta: response.eta,
  };
}

/**
 * Create a delivery job
 */
export async function createDeliveryJob(
  deliveryAddress: string,
  customer: { firstname: string; lastname: string; phone: string; email?: string },
  orderDetails: { id: string; items: string[] }
): Promise<DeliveryJob> {
  const restaurantFullAddress = `${RESTAURANT_ADDRESS.street}, ${RESTAURANT_ADDRESS.postcode} ${RESTAURANT_ADDRESS.city}, ${RESTAURANT_ADDRESS.country}`;

  const response = await stuartRequest<DeliveryJob>('/v2/jobs', {
    method: 'POST',
    body: JSON.stringify({
      job: {
        transport_type: 'bike',
        pickups: [{
          address: restaurantFullAddress,
          comment: `Order #${orderDetails.id}`,
          contact: {
            firstname: 'Little Lemon',
            lastname: 'Restaurant',
            phone: RESTAURANT_ADDRESS.phone,
            company: RESTAURANT_ADDRESS.company,
          },
        }],
        dropoffs: [{
          address: deliveryAddress,
          comment: `Items: ${orderDetails.items.join(', ')}`,
          contact: {
            firstname: customer.firstname,
            lastname: customer.lastname,
            phone: customer.phone,
            email: customer.email,
          },
        }],
      },
    }),
  });

  return response;
}

/**
 * Get delivery job status
 */
export async function getDeliveryStatus(jobId: number): Promise<DeliveryJob> {
  return stuartRequest<DeliveryJob>(`/v2/jobs/${jobId}`);
}

/**
 * Cancel a delivery job
 */
export async function cancelDelivery(jobId: number): Promise<void> {
  await stuartRequest(`/v2/jobs/${jobId}/cancel`, {
    method: 'POST',
  });
}

/**
 * Check if Stuart integration is configured
 */
export function isStuartConfigured(): boolean {
  return Boolean(STUART_CLIENT_ID && STUART_CLIENT_SECRET);
}
