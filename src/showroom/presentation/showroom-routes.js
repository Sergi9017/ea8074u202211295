export default [
    {
        path: '/home',
        name: 'home',
        component: () => import('./views/home.vue')
    },
    {
        path: '/laptop',
        children: [
            {
                path: 'items/new',
                name: 'laptop-inventory-item-new',
                component: () => import('./views/new-laptop-inventory-item.vue')
            }
        ]
    }
];
