import { type RouteConfig, index, route } from '@react-router/dev/routes';

export default [
    index('pages/home/index.tsx'),
    route('athletes', 'pages/athletes/index.tsx'),
    route('athlete/:athleteId', 'pages/athleteDetails/index.tsx'),
    // route('some/path', './some/file.tsx'),
    // route('some/path', './some/file.tsx'),
    // route('some/path', './some/file.tsx'),
    // route('some/path', './some/file.tsx'),
] satisfies RouteConfig;
