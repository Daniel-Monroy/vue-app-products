import { createRouter, createWebHistory } from 'vue-router'
import Products from '../views/Products'
import Add      from '../views/Add'
const routes = [
    {
        path      : '/',
        name      : 'Products',
        component : Products
    },
    {
        path      : '/add',
        name      : 'Add',
        component : Add
    },
]
const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})
export default router
