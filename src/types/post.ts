export type PostCategory = "tech" | "blog" | "diary";

export interface Post {
  id: string;
  title: string;
  excerpt: string;
  category: PostCategory;
  author: {
    id: string;
    name: string;
    avatar?: string;
  };
  createdAt: string;
  readTime: number;
  thumbnail?: string;
  tags: string[];
}
