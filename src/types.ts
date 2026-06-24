export interface SubscriptionPlan {
  id: string;
  name: string;
  price: string;
  originalPrice: string;
  badge?: string;
  features: string[];
}

export interface Review {
  id: string;
  name: string;
  avatar: string;
  rating: number;
  date: string;
  comment: string;
  plan: string;
}

export interface PaymentSubmission {
  name: string;
  phoneNumber: string;
  trxId: string;
  planId: string;
}
