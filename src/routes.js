import Home from './components/home/Home'
import Personagem from './components/Personagem'

export const routes = [
    {
        path: '/',
        name: 'home',
        component: Home
    },
    {
        path: '/personagem/:id',
        name: 'personagem',
        props: true,
        component: Personagem
    }
];