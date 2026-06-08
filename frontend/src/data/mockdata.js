import lenchoImage from '../assets/lencho.jpg';
import gelataImage from '../assets/gelata.jpg';

export const mockPosts = [
  {
    _id: '1',
    title: '10 Essential Tech Skills Every Modern Parent Should Know',
    content: 'In today\'s digital age, parents need to stay updated with technology to guide their children effectively. This comprehensive guide covers everything from digital literacy to online safety...',
    excerpt: 'Learn the essential tech skills every parent needs to navigate the digital world with their children.',
    category: 'Technology',
    image: 'https://images.unsplash.com/photo-1516321318423-f06a3b504e0e?ixlib=rb-4.0.3&w=1200&h=600&fit=crop',
    likes: 245,
    views: 1250,
    comments: [
      { id: 'c1', name: 'Sarah Johnson', text: 'Very helpful article!', createdAt: '2024-01-15' },
      { id: 'c2', name: 'Michael Chen', text: 'Great tips for parents', createdAt: '2024-01-16' }
    ],
    tags: ['parenting', 'tech-skills', 'digital-literacy'],
    author: 'ODAA Admin',
    createdAt: '2024-01-20',
    featured: true
  },
  {
    _id: '2',
    title: 'The Ultimate Guide to Family Online Safety in 2024',
    content: 'Protecting your family online is more important than ever. This guide provides practical tips and tools to ensure your loved ones stay safe in the digital space...',
    excerpt: 'Essential online safety tips and tools to protect your family in the digital age.',
    category: 'Technology',
    image: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?ixlib=rb-4.0.3&w=1200&h=600&fit=crop',
    likes: 189,
    views: 890,
    comments: [],
    tags: ['safety', 'privacy', 'parenting'],
    author: 'ODAA Admin',
    createdAt: '2024-01-08',
    featured: true
  },
  {
    _id: '3',
    title: 'How to Create a Balanced Screen Time Schedule for Kids',
    content: 'Finding the right balance between screen time and other activities can be challenging. Here\'s a practical approach to creating schedules that work for everyone...',
    excerpt: 'Practical strategies for creating healthy screen time habits for children.',
    category: 'Family',
    image: 'https://images.unsplash.com/photo-1596462502278-27bfdc7f43b5?ixlib=rb-4.0.3&w=1200&h=600&fit=crop',
    likes: 312,
    views: 2100,
    comments: [],
    tags: ['screen-time', 'parenting', 'balance'],
    author: 'ODAA Admin',
    createdAt: '2024-01-05',
    featured: true
  },
  {
    _id: '6',
    title: 'Step-by-Step Tutorial: Building Your First Family Website',
    content: 'Create a beautiful family website to share memories, updates, and photos with relatives. This beginner-friendly tutorial walks you through every step...',
    excerpt: 'Learn how to create a beautiful family website even with no coding experience.',
    category: 'Tutorial',
    image: 'https://images.unsplash.com/photo-1461749280691-d6ccabfeca3a?ixlib=rb-4.0.3&w=1200&h=600&fit=crop',
    likes: 278,
    views: 1560,
    comments: [],
    tags: ['website', 'tutorial', 'beginner'],
    author: 'ODAA Admin',
    createdAt: '2023-12-28'
  },
  {
    _id: '7',
    title: 'Latest Tech News: What Families Need to Know',
    content: 'Stay updated with the latest technology trends and how they impact family life. From AI to privacy laws, we cover what matters most to parents...',
    excerpt: 'Weekly roundup of tech news relevant to modern families.',
    category: 'News',
    image: 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?ixlib=rb-4.0.3&w=1200&h=600&fit=crop',
    likes: 134,
    views: 567,
    comments: [],
    tags: ['news', 'trends', 'updates'],
    author: 'ODAA Admin',
    createdAt: '2023-12-25'
  },
  {
    _id: '8',
    title: 'Digital Family Games: Connect and Have Fun Together',
    content: 'Explore the best digital games and activities that families can enjoy together, whether at home or remotely. Great for building connections and creating memories...',
    excerpt: 'Fun digital games and activities that bring families closer together.',
    category: 'Family',
    image: 'https://images.unsplash.com/photo-1552820728-8b83bb6b773f?ixlib=rb-4.0.3&w=1200&h=600&fit=crop',
    likes: 345,
    views: 2340,
    comments: [],
    tags: ['games', 'family-time', 'fun'],
    author: 'ODAA Admin',
    createdAt: '2023-12-20',
    featured: true
  }
];

export const categories = [
  { id: 'all', name: 'All Posts', icon: '📚', color: 'primary' },
  { id: 'Technology', name: 'Technology', icon: '💻', color: 'secondary' },
  { id: 'Family', name: 'Family', icon: '👨‍👩‍👧‍👦', color: 'primary' },
  { id: 'Tutorial', name: 'Tutorials', icon: '📖', color: 'secondary' },
  { id: 'Interprenership', name: 'Interprenership', icon: '💼', color: 'primary' },
  { id: 'leadership', name: 'leadership', icon: '⭐', color: 'secondary' }
];

export const teamMembers = [
  {
    name: 'Lencho ',
    image: lenchoImage,
    role: 'Founder & CEO',
    bio: 'Software Developer '
  },
  {
    name: 'Gelata',
    image: gelataImage,
    role: 'Co-Founder & CTO',
    bio: ' Tech Entrepreneur'
  }
];