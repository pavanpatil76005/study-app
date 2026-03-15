import type { Deck, Subject } from '../types'

const DECKS_KEY = 'study-app-decks'
const SUBJECTS_KEY = 'study-app-subjects'

export function loadDecks(): Deck[] {
  try {
    const raw = localStorage.getItem(DECKS_KEY)
    if (!raw) return []
    const data = JSON.parse(raw) as Deck[]
    return Array.isArray(data) ? data : []
  } catch {
    return []
  }
}

export function saveDecks(decks: Deck[]): void {
  localStorage.setItem(DECKS_KEY, JSON.stringify(decks))
}

export function loadSubjects(): Subject[] {
  try {
    const raw = localStorage.getItem(SUBJECTS_KEY)
    if (!raw) return getDefaultSubjects()
    const data = JSON.parse(raw) as Subject[]
    return Array.isArray(data) && data.length > 0 ? data : getDefaultSubjects()
  } catch {
    return getDefaultSubjects()
  }
}

export function saveSubjects(subjects: Subject[]): void {
  localStorage.setItem(SUBJECTS_KEY, JSON.stringify(subjects))
}

export function getDefaultSubjects(): Subject[] {
  return [
    {
      id: 'math',
      name: 'Mathematics',
      description: 'Calculus, Linear Algebra, Differential Equations, Probability',
      resources: [
        { id: 'm1', type: 'youtube', title: 'Essence of Calculus - 3Blue1Brown', url: 'https://www.youtube.com/playlist?list=PLZHQObOWTQDMsr9K-rj53DwVRMYO3t5Yr', description: 'Visual calculus series' },
        { id: 'm2', type: 'youtube', title: 'Essence of Linear Algebra - 3Blue1Brown', url: 'https://www.youtube.com/playlist?list=PLZHQObOWTQDnD2B1CyDgRwGn2hdqD3ZQm', description: 'Visual linear algebra' },
        { id: 'm3', type: 'youtube', title: 'Single Variable Calculus - MIT 18.01', url: 'https://www.youtube.com/playlist?list=PL590CCC2BC5AF3BC1', description: 'MIT OpenCourseWare' },
        { id: 'm4', type: 'youtube', title: 'Linear Algebra - MIT 18.06 Gilbert Strang', url: 'https://www.youtube.com/playlist?list=PL221E2BBF13BECF6C', description: 'Full course' },
        { id: 'm5', type: 'youtube', title: 'Differential Equations - MIT 18.03', url: 'https://www.youtube.com/playlist?list=PLEC88901EBADDD980', description: 'ODEs and applications' },
        { id: 'm6', type: 'youtube', title: 'Engineering Mathematics - Gate Smashers', url: 'https://www.youtube.com/playlist?list=PLxCzCOWd7aiEdK9Lc3gFTrsE0pNrR1YNT', description: 'For GATE/engineering' },
        { id: 'm7', type: 'youtube', title: 'Probability & Statistics - Khan Academy', url: 'https://www.youtube.com/playlist?list=PL1328115D3D8A2566', description: 'Basics to advanced' },
      ],
      createdAt: Date.now(),
    },
    {
      id: 'physics',
      name: 'Physics',
      description: 'Mechanics, E&M, Optics, Thermodynamics',
      resources: [
        { id: 'p1', type: 'youtube', title: 'Physics - Khan Academy', url: 'https://www.youtube.com/playlist?list=PLAD5B880806EBE0A4', description: 'Physics essentials' },
        { id: 'p2', type: 'youtube', title: 'Classical Mechanics - MIT 8.01', url: 'https://www.youtube.com/playlist?list=PLyQSN7X0ro2314mKyUiOILaOC2hk6Pc3j', description: 'MIT OpenCourseWare' },
        { id: 'p3', type: 'youtube', title: 'Electricity & Magnetism - MIT 8.02', url: 'https://www.youtube.com/playlist?list=PLyQSN7X0ro20O2dQBqQ4N0b2L2bwE1xVp', description: 'E&M full course' },
        { id: 'p4', type: 'youtube', title: 'Engineering Physics - Gate Smashers', url: 'https://www.youtube.com/playlist?list=PLxCzCOWd7aiG7txZ1q1f5fT3iEf2DqNnL', description: 'For GATE' },
        { id: 'p5', type: 'youtube', title: 'Physics - Neso Academy', url: 'https://www.youtube.com/playlist?list=PLBlnK6fEyqRgLLyzdFTd5_ZH2nR1RGYRr', description: 'Engineering physics' },
      ],
      createdAt: Date.now(),
    },
    {
      id: 'programming',
      name: 'Programming',
      description: 'C, C++, Python, Java, OOP',
      resources: [
        { id: 'pr1', type: 'youtube', title: 'Python Full Course - freeCodeCamp', url: 'https://www.youtube.com/watch?v=rfscVS0vtbw', description: 'Beginners (4+ hours)' },
        { id: 'pr2', type: 'youtube', title: 'C Programming - CS50 Harvard', url: 'https://www.youtube.com/playlist?list=PLhQjrBD2T382_R182iC2gNZI9HzWFMC_8', description: 'C basics' },
        { id: 'pr3', type: 'youtube', title: 'C++ Full Course - freeCodeCamp', url: 'https://www.youtube.com/watch?v=vLnPwxZdW4Y', description: 'C++ for beginners' },
        { id: 'pr4', type: 'youtube', title: 'Java Full Course - freeCodeCamp', url: 'https://www.youtube.com/watch?v=eIrMbAQSU34', description: 'Java programming' },
        { id: 'pr5', type: 'youtube', title: 'C Programming - Jenny\'s Lectures', url: 'https://www.youtube.com/playlist?list=PLdo5W4Nhv31a8UcMN9-35ghvOpqcr0c26', description: 'Complete C course' },
        { id: 'pr6', type: 'youtube', title: 'OOP in Python - Corey Schafer', url: 'https://www.youtube.com/playlist?list=PL-osiE80TeTsqhIuOqKhwlXsIBIdSeYtc', description: 'Object-oriented Python' },
      ],
      createdAt: Date.now(),
    },
    {
      id: 'dsa',
      name: 'Data Structures & Algorithms',
      description: 'DSA for placements and interviews',
      resources: [
        { id: 'd1', type: 'youtube', title: 'Algorithms - Abdul Bari', url: 'https://www.youtube.com/playlist?list=PLDN4rrl48XKpZkf03iYco-O72oNxDG186', description: 'Algorithm design' },
        { id: 'd2', type: 'youtube', title: 'DSA - Striver (Take U Forward)', url: 'https://www.youtube.com/playlist?list=PLgUwDviBIf0rGEWe64KWas0Nryn7SCRWw', description: 'Placement series' },
        { id: 'd3', type: 'youtube', title: 'DSA - CodeHelp (Love Babbar)', url: 'https://www.youtube.com/playlist?list=PLDzeHZWIZsTryvtXdMr6rPh4MexL9w0gO', description: 'C++ DSA course' },
        { id: 'd4', type: 'youtube', title: 'DSA - Jenny\'s Lectures', url: 'https://www.youtube.com/playlist?list=PLdo5W4Nhv31bbKJzrsKfMpo_grxuLl8LU', description: 'Data structures' },
        { id: 'd5', type: 'youtube', title: 'DSA - Gate Smashers', url: 'https://www.youtube.com/playlist?list=PLxCzCOWd7aiFM9Lj5G9G_76adtyb4ef7i', description: 'For GATE' },
        { id: 'd6', type: 'youtube', title: 'Graph Algorithms - William Fiset', url: 'https://www.youtube.com/playlist?list=PLDV1Zeh2NRsDGO4--qE8yH72HFL0KmJ56', description: 'Graph theory & algorithms' },
      ],
      createdAt: Date.now(),
    },
    {
      id: 'dbms',
      name: 'Database Management System',
      description: 'SQL, Normalization, Transactions, ER',
      resources: [
        { id: 'db1', type: 'youtube', title: 'DBMS Full Course - Gate Smashers', url: 'https://www.youtube.com/playlist?list=PLxCzCOWd7aiFAN6I8CuViBuCdJgOkE2wQ', description: 'Complete DBMS' },
        { id: 'db2', type: 'youtube', title: 'DBMS - Neso Academy', url: 'https://www.youtube.com/playlist?list=PLBlnK6fEyqRgJU0Es6DMV3FE1lO2wE9z1', description: 'Database concepts' },
        { id: 'db3', type: 'youtube', title: 'SQL Tutorial - freeCodeCamp', url: 'https://www.youtube.com/watch?v=HXV3zeQKqGY', description: 'SQL in one video' },
        { id: 'db4', type: 'youtube', title: 'DBMS - Jenny\'s Lectures', url: 'https://www.youtube.com/playlist?list=PLdo5W4Nhv31b33kF46WN9NvXxPg6fqDuo', description: 'DBMS for B.Tech' },
      ],
      createdAt: Date.now(),
    },
    {
      id: 'cn',
      name: 'Computer Networks',
      description: 'OSI, TCP/IP, Routing, Security',
      resources: [
        { id: 'cn1', type: 'youtube', title: 'Computer Networks - Gate Smashers', url: 'https://www.youtube.com/playlist?list=PLxCzCOWd7aiGEBD6qNCGtYKLQ8Y0xelZX', description: 'Full CN course' },
        { id: 'cn2', type: 'youtube', title: 'Computer Networks - Neso Academy', url: 'https://www.youtube.com/playlist?list=PLBlnK6fEyqRgMCUAG0XRw78UA8qnv6jEx', description: 'Networking concepts' },
        { id: 'cn3', type: 'youtube', title: 'Computer Networks - Knowledge Gate', url: 'https://www.youtube.com/playlist?list=PLmXKhU9FNesSjFbXSZGF8JF_3a1Y2bNFZ', description: 'CN full course' },
        { id: 'cn4', type: 'youtube', title: 'Networking - freeCodeCamp', url: 'https://www.youtube.com/watch?v=qiQR5rTSshw', description: 'Full networking course' },
      ],
      createdAt: Date.now(),
    },
    {
      id: 'os',
      name: 'Operating Systems',
      description: 'Processes, Scheduling, Memory, Deadlock',
      resources: [
        { id: 'os1', type: 'youtube', title: 'Operating System - Gate Smashers', url: 'https://www.youtube.com/playlist?list=PLxCzCOWd7aiGz9donHRrE9I3Mwn6XdP8q', description: 'Full OS course' },
        { id: 'os2', type: 'youtube', title: 'Operating System - Neso Academy', url: 'https://www.youtube.com/playlist?list=PLBlnK6fEyqRhG6s3jYIU48CqsT5cyiDTO', description: 'OS concepts' },
        { id: 'os3', type: 'youtube', title: 'OS - Jenny\'s Lectures', url: 'https://www.youtube.com/playlist?list=PLdo5W4Nhv31a5ucW_S1K3x6xXGcyozOTm', description: 'Operating systems' },
        { id: 'os4', type: 'youtube', title: 'Operating Systems - MIT 6.828', url: 'https://www.youtube.com/playlist?list=PLfciLKR3SgqOYgDKq6Rq6QdPjLhHHyGpE', description: 'MIT xv6' },
      ],
      createdAt: Date.now(),
    },
    {
      id: 'coa',
      name: 'Computer Organization & Architecture',
      description: 'Digital logic, COA, Microprocessor',
      resources: [
        { id: 'coa1', type: 'youtube', title: 'COA - Gate Smashers', url: 'https://www.youtube.com/playlist?list=PLxCzCOWd7aiHMonh3G6QNKq53C6qNX2Z9', description: 'Computer organization' },
        { id: 'coa2', type: 'youtube', title: 'Digital Logic - Neso Academy', url: 'https://www.youtube.com/playlist?list=PLBlnK6fEyqRjMH3mWf6Nqi4cK6K68OjS9', description: 'Digital circuits' },
        { id: 'coa3', type: 'youtube', title: 'COA - Gate Smashers (Digital Logic)', url: 'https://www.youtube.com/playlist?list=PLxCzCOWd7aiL2zMnuZ-fuRLnyn3wGXYjH', description: 'Digital logic & design' },
      ],
      createdAt: Date.now(),
    },
    {
      id: 'toc',
      name: 'Theory of Computation',
      description: 'Automata, Grammars, PDA, Turing',
      resources: [
        { id: 'toc1', type: 'youtube', title: 'TOC - Gate Smashers', url: 'https://www.youtube.com/playlist?list=PLxCzCOWd7aiFM9Lj5G9G_76adtyb4ef7i', description: 'Automata & TOC' },
        { id: 'toc2', type: 'youtube', title: 'Theory of Computation - Neso Academy', url: 'https://www.youtube.com/playlist?list=PLBlnK6fEyqRg1FMGRj2V6vL9J5Y-HLsnj', description: 'TOC full course' },
        { id: 'toc3', type: 'youtube', title: 'TOC - Knowledge Gate', url: 'https://www.youtube.com/playlist?list=PLmXKhU9FNesR1rSES7oLdJaNFgmuj0SYVf', description: 'Theory of computation' },
      ],
      createdAt: Date.now(),
    },
    {
      id: 'cd',
      name: 'Compiler Design',
      description: 'Lexical analysis, Parsing, Code generation',
      resources: [
        { id: 'cd1', type: 'youtube', title: 'Compiler Design - Gate Smashers', url: 'https://www.youtube.com/playlist?list=PLxCzCOWd7aiEKtKSIHYusizkESC42diyc', description: 'Full compiler design' },
        { id: 'cd2', type: 'youtube', title: 'Compiler Design - Neso Academy', url: 'https://www.youtube.com/playlist?list=PLBlnK6fEyqRgV2NnW7nE0_YX1nO1XkFbH', description: 'Compiler phases' },
      ],
      createdAt: Date.now(),
    },
    {
      id: 'web',
      name: 'Web Development',
      description: 'HTML, CSS, JavaScript, React',
      resources: [
        { id: 'web1', type: 'youtube', title: 'Web Dev Full Course - freeCodeCamp', url: 'https://www.youtube.com/watch?v=8gNrZ4lAnAw', description: 'HTML, CSS, JS' },
        { id: 'web2', type: 'youtube', title: 'React Course - freeCodeCamp', url: 'https://www.youtube.com/watch?v=bMknfKXIFA8', description: 'React.js full course' },
        { id: 'web3', type: 'youtube', title: 'JavaScript - freeCodeCamp', url: 'https://www.youtube.com/watch?v=jS4aFq5-91M', description: 'JS full course' },
      ],
      createdAt: Date.now(),
    },
  ]
}

export function generateId(): string {
  return Math.random().toString(36).slice(2) + Date.now().toString(36)
}
