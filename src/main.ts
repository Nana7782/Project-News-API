import { IArticle } from "./assets/interfaces/INews";
import { format } from "date-fns";

const apiKey = "c2f6d9f1dac946a5919ba9181d556e86";
const BASE_URL = "https://newsapi.org";

const searchElement = document.getElementById("search") as HTMLInputElement;
const languageElement = document.getElementById(
  "language"
) as HTMLSelectElement;
const sortElement = document.getElementById("sort") as HTMLSelectElement;
const newsContent = document.getElementById(
  "article-container"
) as HTMLDivElement;
const buttonElement = document.getElementById("send") as HTMLButtonElement;

const dateElement = document.querySelector(".date-p") as HTMLParagraphElement;

function formatDate(): string {
  return format(new Date(), `eeee LLLL ee yyyy`);
}

const formattedDate = formatDate();
dateElement.textContent = formattedDate;

const createArticle = (article: IArticle) => {
  const newsCard = document.createElement("div") as HTMLDivElement;
  newsCard.className = "news-card";

  const headlineElement = document.createElement("h2") as HTMLHeadingElement;
  headlineElement.className = "title";
  headlineElement.textContent = article.title;

  const imageElement = document.createElement("img") as HTMLImageElement;
  imageElement.src = article.urlToImage;
  imageElement.alt = article.urlToImage;

  const infoElement = document.createElement("p") as HTMLParagraphElement;
  infoElement.className = "info";
  infoElement.textContent = article.description;

  const toArticleElement = document.createElement(
    "button"
  ) as HTMLButtonElement;
  toArticleElement.className = "to-article";
  toArticleElement.textContent = "To article";

  newsCard.appendChild(headlineElement);

  newsCard.appendChild(imageElement);
  newsCard.appendChild(infoElement);
  newsCard.appendChild(toArticleElement);
  newsContent.appendChild(newsCard);

  toArticleElement.addEventListener("click", () => {
    window.open(article.url, "_blank");
  });
};

const fetchNews = () => {
  let newsURL = `${BASE_URL}/v2/everything`;

  const parameter: string[] = [];
  if (searchElement.value.length !== 0) {
    const searchKey = searchElement.value;
    parameter.push(`q=${searchKey}`);
  }

  if (languageElement.value.length !== 0) {
    const languageKey = languageElement.value;
    parameter.push(`language=${languageKey}`);
  }

  if (sortElement.value.length !== 0) {
    const sortKey = sortElement.value;
    parameter.push(`sortBy=${sortKey}`);
  }

  parameter.push(`apiKey=${apiKey}`);
  newsURL += `?${parameter.join("&")}`;

  newsContent.innerHTML = "";

  fetch(newsURL)
    .then((response: Response) => response.json())
    .then((data: any) => {
      data.articles.forEach((article: IArticle) => {
        createArticle(article);
      });
    })
    .catch((error: Error) => {
      console.error(error.message);
    });
};

const fetchTopNews = () => {
  const topNewsURL = `${BASE_URL}/v2/top-headlines?apiKey=${apiKey}&country=us`;

  newsContent.innerHTML = "";

  fetch(topNewsURL)
    .then((response: Response) => response.json())
    .then((data: any) => {
      data.articles.forEach((article: IArticle) => {
        createArticle(article);
      });
    })
    .catch((error: Error) => {
      console.error(error.message);
    });
};

buttonElement.addEventListener("click", fetchNews);

document.addEventListener("DOMContentLoaded", fetchTopNews);
