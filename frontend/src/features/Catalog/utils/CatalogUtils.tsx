import { Book } from "../../../models/Book";
import { PageInfo } from "../../../models/Page";

export function generateRandomGenres(): string[] {
  let choices = [
    "Non-Fiction",
    "Childrens",
    "Fantasy",
    "Fiction",
    "Biography",
    "Romance",
    "Science Fiction",
    "Young Adult",
  ];
  let chosen: string[] = [];
  while (chosen.length !== 5) {
    let num = Math.floor(Math.random() * choices.length);
    if (!chosen.includes(choices[num])) chosen.push(choices[num]);
  }
  return chosen;
}

export function getRandomBooksByGenre(genre: string, books: Book[]) {
  let filtered = books.filter((book) => book.genre === genre);
  let randomBooks: Book[] = [];
  if (filtered.length < 10) return filtered;
  while (randomBooks.length !== 10) {
    let index = Math.floor(Math.random() * filtered.length);
    if (!randomBooks.some((b) => b["barcode"] === filtered[index].barcode))
      randomBooks.push(filtered[index]);
  }
  return randomBooks;
}

export function calculatePaging(pageInfo: PageInfo): string[] {
  let pArr: string[] = [];
  if (pageInfo) {
    let total = pageInfo?.totalPages;
    let current = pageInfo?.currentPage;
    if (total <= 10) {
      for (let i = 1; i <= total; i++) {
        pArr.push(`${i}`);
      }
    } else if (total > 10 && current - 7 <= 0) {
      for (let i = 1; i <= 8; i++) {
        pArr.push(`${i}`);
      }
      pArr.push("...");
      for (let i = total - 1; i <= total; i++) {
        pArr.push(`${i}`);
      }
    } else if (total > 10 && total - 7 > 0 && total - current > 5) {
      for (let i = 1; i <= 2; i++) {
        pArr.push(`${i}`);
      }
      pArr.push("...");
      for (let i = current; i <= current + 4; i++) {
        pArr.push(`${i}`);
      }
      pArr.push("...");
      for (let i = total - 1; i <= total; i++) {
        pArr.push(`${i}`);
      }
    } else {
      for (let i = 1; i <= 2; i++) {
        pArr.push(`${i}`);
      }
      pArr.push("...");
      for (let i = total - 5; i <= total; i++) {
        pArr.push(`${i}`);
      }
    }
  }
  return pArr;
}
