// Menu items.
import { ArrowUpDown, BicepsFlexed, Calendar, Dumbbell, Home } from 'lucide-react';

export const SIDEBAR_MENU = [
    {
        title: 'Home',
        url: '/',
        icon: Home,
    },
    {
        title: 'Calendar',
        url: '/calendar',
        icon: Calendar,
    },
    {
        title: 'Athletes',
        url: '/athletes',
        icon: BicepsFlexed,
    },
    {
        title: 'Exercises',
        url: '/exercises',
        icon: Dumbbell,
    },
    {
        title: 'Muscle imbalance',
        url: '/muscle-imbalance',
        icon: ArrowUpDown,
    },
];
