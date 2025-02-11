export interface Author {
  name: string;
}

export interface Post {
  id: string;
  title: string;
  author: Author;
}

export interface GetPostsData {
  posts: Post[];
}
