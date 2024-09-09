export interface INews {
  status: string;
  articles: IArticle[];
}

export interface IArticle {
  author: string;
  title: string;
  description: string;
  url: string;
  urlToImage: string;
  content: string;
}
