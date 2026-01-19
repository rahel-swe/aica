import {
  FlaskRound,
  Inbox,
  Map,
  MessageCircleQuestion,
  Settings2,
} from 'lucide-react';
import { TiChartBarOutline } from 'react-icons/ti';

export const navData = {
  navMain: [
    {
      title: 'Dashboard',
      url: 'dashboard',
      icon: TiChartBarOutline,
    },
    {
      title: 'Ask AI',
      url: 'chatbot',
      icon: FlaskRound,
    },
    {
      title: 'Roadmap',
      url: 'roadmap',
      icon: Map,
    },
    {
      title: 'Inbox',
      url: 'inbox',
      icon: Inbox,
      badge: 7,
    },
  ],
  navSecondary: [
    {
      title: 'Settings',
      url: 'settings',
      icon: Settings2,
    },

    {
      title: 'Help',
      url: 'help',
      icon: MessageCircleQuestion,
    },
  ],
  favorites: [
    {
      name: 'Project Management & Task Tracking',
      url: '#',
      emoji: '📊',
    },
    {
      name: 'Family Recipe Collection & Meal Planning',
      url: '#',
      emoji: '🍳',
    },
    {
      name: 'Fitness Tracker & Workout Routines',
      url: '#',
      emoji: '💪',
    },
    {
      name: 'Book Notes & Reading List',
      url: '#',
      emoji: '📚',
    },
    {
      name: 'Sustainable Gardening Tips & Plant Care',
      url: '#',
      emoji: '🌱',
    },
    {
      name: 'Language Learning Progress & Resources',
      url: '#',
      emoji: '🗣️',
    },
    {
      name: 'Home Renovation Ideas & Budget Tracker',
      url: '#',
      emoji: '🏠',
    },
    {
      name: 'Personal Finance & Investment Portfolio',
      url: '#',
      emoji: '💰',
    },
    {
      name: 'Movie & TV Show Watchlist with Reviews',
      url: '#',
      emoji: '🎬',
    },
    {
      name: 'Daily Habit Tracker & Goal Setting',
      url: '#',
      emoji: '✅',
    },
  ],
};
