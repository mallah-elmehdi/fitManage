import { type RouteConfig, index, route } from '@react-router/dev/routes';

export default [
    index('pages/home/index.tsx'),
    route('athletes', 'pages/athletes/index.tsx'),
    route('athlete/:athleteId', 'pages/athleteDetails/index.tsx'),
    route('exercises', 'pages/exercises/index.tsx'),
] satisfies RouteConfig;
