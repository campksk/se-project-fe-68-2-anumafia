export interface UserItem {
  _id: string;
  name: string;
  email: string;
  tel: string;
  role: string;
  createdAt: string;
  token?: string;
  yellowCards: {
	count: number;
	records: {
		reason: string;
		issuedAt: string;
	}[]
  };
  ban: {
		isBanned: boolean;
		reason: string;
	};
}

export interface CompanyItem {
  _id: string;
  user: string
  name: string;
  address: string;
  website: string;
  description: string;
  tel: string;
  id: string;
  public: boolean;
  ratingAverage: number;
  ratingCount: number;
}

export interface CompanyJson {
  success: boolean;
  count: number;
  pagination: Object;
  data: CompanyItem[];
}

export interface InterviewItem {
  _id: string;
  company: CompanyItem; 
  user: UserItem;
  sessionDate: string; 
  createdAt: string;
}

export interface InterviewJson {
  success: boolean;
  count: number;
  data: InterviewItem[];
}

export interface UserItemForReview {
  _id: string;
  name: string;
}

export interface CompanyItemForReview {
  _id: string;
  name: string;
}

export interface ReviewItem {
  _id: string;
  user: UserItemForReview;
  company: CompanyItemForReview; 
  rating: number;
  reviewText: string;
  createdAt: string;
}

export interface ReviewJson {
  success: boolean;
  count: number;
  data: ReviewItem[];
}


