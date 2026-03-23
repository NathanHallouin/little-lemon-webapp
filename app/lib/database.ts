import { supabase } from './supabase';

// ============================================
// ORDER FUNCTIONS
// ============================================

export interface OrderItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image?: string;
}

export interface CreateOrderData {
  orderType: 'delivery' | 'pickup';
  items: OrderItem[];
  subtotal: number;
  deliveryFee: number;
  total: number;
  deliveryAddress?: {
    street: string;
    postcode: string;
    city: string;
    floor?: string;
    phone?: string;
  };
  deliveryInstructions?: string;
  stuartJobId?: number;
  trackingUrl?: string;
  estimatedDelivery?: string;
}

export interface Order extends CreateOrderData {
  id: string;
  userId: string;
  orderNumber: string;
  status: string;
  createdAt: string;
  updatedAt: string;
}

export async function createOrder(data: CreateOrderData): Promise<{ order: Order | null; error: Error | null }> {
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return { order: null, error: new Error('User not authenticated') };
  }

  const { data: order, error } = await supabase
    .from('orders')
    .insert({
      user_id: user.id,
      order_type: data.orderType,
      items: data.items,
      subtotal: data.subtotal,
      delivery_fee: data.deliveryFee,
      total: data.total,
      delivery_address: data.deliveryAddress,
      delivery_instructions: data.deliveryInstructions,
      stuart_job_id: data.stuartJobId,
      tracking_url: data.trackingUrl,
      estimated_delivery: data.estimatedDelivery,
    })
    .select()
    .single();

  if (error) {
    return { order: null, error: new Error(error.message) };
  }

  return {
    order: {
      id: order.id,
      userId: order.user_id,
      orderNumber: order.order_number,
      status: order.status,
      orderType: order.order_type,
      items: order.items,
      subtotal: order.subtotal,
      deliveryFee: order.delivery_fee,
      total: order.total,
      deliveryAddress: order.delivery_address,
      deliveryInstructions: order.delivery_instructions,
      stuartJobId: order.stuart_job_id,
      trackingUrl: order.tracking_url,
      estimatedDelivery: order.estimated_delivery,
      createdAt: order.created_at,
      updatedAt: order.updated_at,
    },
    error: null
  };
}

export async function getUserOrders(): Promise<{ orders: Order[]; error: Error | null }> {
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return { orders: [], error: new Error('User not authenticated') };
  }

  const { data: orders, error } = await supabase
    .from('orders')
    .select('*')
    .eq('user_id', user.id)
    .order('created_at', { ascending: false });

  if (error) {
    return { orders: [], error: new Error(error.message) };
  }

  return {
    orders: orders.map(order => ({
      id: order.id,
      userId: order.user_id,
      orderNumber: order.order_number,
      status: order.status,
      orderType: order.order_type,
      items: order.items,
      subtotal: order.subtotal,
      deliveryFee: order.delivery_fee,
      total: order.total,
      deliveryAddress: order.delivery_address,
      deliveryInstructions: order.delivery_instructions,
      stuartJobId: order.stuart_job_id,
      trackingUrl: order.tracking_url,
      estimatedDelivery: order.estimated_delivery,
      createdAt: order.created_at,
      updatedAt: order.updated_at,
    })),
    error: null
  };
}

// ============================================
// RESERVATION FUNCTIONS
// ============================================

export interface CreateReservationData {
  guestName: string;
  guestEmail: string;
  guestPhone?: string;
  partySize: number;
  reservationDate: string;
  reservationTime: string;
  occasion?: string;
  specialRequests?: string;
}

export interface Reservation extends CreateReservationData {
  id: string;
  userId: string;
  reservationNumber: string;
  status: string;
  tableNumber?: number;
  createdAt: string;
  updatedAt: string;
}

export async function createReservation(data: CreateReservationData): Promise<{ reservation: Reservation | null; error: Error | null }> {
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return { reservation: null, error: new Error('User not authenticated') };
  }

  const { data: reservation, error } = await supabase
    .from('reservations')
    .insert({
      user_id: user.id,
      guest_name: data.guestName,
      guest_email: data.guestEmail,
      guest_phone: data.guestPhone,
      party_size: data.partySize,
      reservation_date: data.reservationDate,
      reservation_time: data.reservationTime,
      occasion: data.occasion,
      special_requests: data.specialRequests,
    })
    .select()
    .single();

  if (error) {
    return { reservation: null, error: new Error(error.message) };
  }

  return {
    reservation: {
      id: reservation.id,
      userId: reservation.user_id,
      reservationNumber: reservation.reservation_number,
      status: reservation.status,
      guestName: reservation.guest_name,
      guestEmail: reservation.guest_email,
      guestPhone: reservation.guest_phone,
      partySize: reservation.party_size,
      reservationDate: reservation.reservation_date,
      reservationTime: reservation.reservation_time,
      occasion: reservation.occasion,
      specialRequests: reservation.special_requests,
      tableNumber: reservation.table_number,
      createdAt: reservation.created_at,
      updatedAt: reservation.updated_at,
    },
    error: null
  };
}

export async function getUserReservations(): Promise<{ reservations: Reservation[]; error: Error | null }> {
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return { reservations: [], error: new Error('User not authenticated') };
  }

  const { data: reservations, error } = await supabase
    .from('reservations')
    .select('*')
    .eq('user_id', user.id)
    .order('reservation_date', { ascending: true });

  if (error) {
    return { reservations: [], error: new Error(error.message) };
  }

  return {
    reservations: reservations.map(r => ({
      id: r.id,
      userId: r.user_id,
      reservationNumber: r.reservation_number,
      status: r.status,
      guestName: r.guest_name,
      guestEmail: r.guest_email,
      guestPhone: r.guest_phone,
      partySize: r.party_size,
      reservationDate: r.reservation_date,
      reservationTime: r.reservation_time,
      occasion: r.occasion,
      specialRequests: r.special_requests,
      tableNumber: r.table_number,
      createdAt: r.created_at,
      updatedAt: r.updated_at,
    })),
    error: null
  };
}

export async function cancelReservation(id: string): Promise<{ success: boolean; error: Error | null }> {
  const { error } = await supabase
    .from('reservations')
    .update({ status: 'cancelled' })
    .eq('id', id);

  if (error) {
    return { success: false, error: new Error(error.message) };
  }

  return { success: true, error: null };
}
