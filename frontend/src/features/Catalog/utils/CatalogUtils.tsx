import { Book } from "../../../models/Book";
import { PageInfo } from "../../../models/Page";

// export function generateRandomGenres(): string[] {
//   let choices = [
//     "Non-Fiction",
//     "Childrens",
//     "Fantasy",
//     "Fiction",
//     "Biography",
//     "Romance",
//     "Science Fiction",
//     "Young Adult",
//   ];
//   let chosen: string[] = [];
//   while (chosen.length !== 5) {
//     let num = Math.floor(Math.random() * choices.length);
//     if (!chosen.includes(choices[num])) chosen.push(choices[num]);
//   }
//   return chosen;
// }

/**
 * Dynamically generates random genres from the books data.
 * @param books Array of Book objects
 * @returns Array of 5 randomly selected genres from the book data
 */
export function generateRandomGenres(books: Book[] = []): string[] {
  // Check if books array is valid and has elements
  if (!books || books.length === 0) {
    console.error("Books array is undefined or empty.");
    return [];
  }

  const genresSet = new Set<string>();

  // Collect unique genres from books
  books.forEach((book) => {
    if (book.genre) {
      genresSet.add(book.genre);
    }
  });

  const genres = Array.from(genresSet); // Convert Set to Array

  // If there are fewer than 5 unique genres, return them all
  if (genres.length <= 5) {
    return genres;
  }

  const chosen: string[] = [];
  const usedIndices = new Set<number>();

  // Randomly select up to 5 genres
  while (chosen.length < 5) {
    const randomIndex = Math.floor(Math.random() * genres.length);

    // Ensure the same genre is not chosen twice
    if (!usedIndices.has(randomIndex)) {
      chosen.push(genres[randomIndex]);
      usedIndices.add(randomIndex);
    }
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
export function getRandomBooks(books: Book[], count: number): Book[] {
  if (books.length === 0) return [];

  // Clone the array before shuffling it
  const clonedBooks = [...books];

  // Shuffle the cloned array
  const shuffled = clonedBooks.sort(() => 0.5 - Math.random());

  // Return the first `count` books
  return shuffled.slice(0, Math.min(count, shuffled.length));
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
