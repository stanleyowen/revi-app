type Blog = {
  key?: string;
  title: string;
  description: string;
  thumbnail: string;
  content: string;
  properties?: {
    createdAt: Date;
    estimatedReadTime: string;
  };
  author: {
    name: string;
    profilePicture: string;
  };
};

export type { Blog };
