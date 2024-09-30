import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import List from './pages/list'
import Detail from './pages/detail'
import Create from './pages/create'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const router = createBrowserRouter([
    {
        path: '/',
        element: <List />,
    },
    {
        path: '/course/:id',
        element: <Detail />,
    },
    {
        path: '/course/new',
        element: <Create />,
    },
])

const queryClient = new QueryClient()

const App = () => {
    return (
        <QueryClientProvider client={queryClient}>
            <RouterProvider router={router} />
        </QueryClientProvider>
    )
}

export default App
