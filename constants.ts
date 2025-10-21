
import type { Book } from './types';

export const MY_BOOKS: Book[] = [
  {
    id: 1,
    title: "Other Words for Home",
    author: "Jasmine Warga",
    coverUrl: "https://picsum.photos/seed/book1/200/300",
    progress: 75,
    timeLeft: "3d 5h",
    rating: 4.8,
    pages: 352,
    language: "Eng",
    tags: ["Young Adult", "Fiction"],
    description: "A beautifully written, poignant novel in verse about a young Syrian refugee who must find her place in a new country. It's a story of resilience, hope, and the universal search for home."
  },
  {
    id: 2,
    title: "The Municipalists",
    author: "Seth Fried",
    coverUrl: "https://picsum.photos/seed/book2/200/300",
    progress: 23,
    timeLeft: "10d 5h",
    rating: 4.2,
    pages: 400,
    language: "Eng",
    tags: ["Sci-Fi", "Humor"],
    description: "In a near-future metropolis, a rigidly dutiful city planner is forced to team up with an advanced AI to save the city from a shadowy organization. A hilarious and thought-provoking adventure."
  },
  {
    id: 3,
    title: "Cosmic Ocean",
    author: "Eva St. Cloud",
    coverUrl: "https://picsum.photos/seed/book3/200/300",
    progress: 2,
    timeLeft: "1d 2h",
    rating: 4.6,
    pages: 280,
    language: "Eng",
    tags: ["Fantasy", "Adventure"],
    description: "A tale of ancient sea gods and the mortals who dare to sail their waters. Filled with magic, mystery, and breathtaking world-building, this is a fantasy epic for the ages."
  },
];

export const BEST_SELLERS: Book[] = [
  {
    id: 4,
    title: "The Tiny Dragon",
    author: "Rupert Carter",
    coverUrl: "https://picsum.photos/seed/book4/200/300",
    rating: 4.5,
    pages: 160,
    language: "Eng",
    tags: ["Drama", "Romance", "Adventure"],
    description: "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
  },
  {
    id: 5,
    title: "Under Land",
    author: "Robert Macfarlane",
    coverUrl: "https://picsum.photos/seed/book5/200/300",
    rating: 4.9,
    pages: 496,
    language: "Eng",
    tags: ["Non-Fiction", "Nature"],
    description: "An epic exploration of the Earth's underworlds as they exist in myth, literature, memory, and the land itself. Macfarlane takes us on an extraordinary journey into our relationship with darkness, burial, and what lies beneath."
  },
    {
    id: 6,
    title: "Project Hail Mary",
    author: "Andy Weir",
    coverUrl: "https://picsum.photos/seed/book6/200/300",
    rating: 4.9,
    pages: 496,
    language: "Eng",
    tags: ["Sci-Fi", "Thriller"],
    description: "Ryland Grace is the sole survivor on a desperate, last-chance mission—and if he fails, humanity and the earth itself will perish. Except that right now, he doesn’t know that. He can’t even remember his own name, let alone the nature of his assignment or how to complete it."
  }
];
