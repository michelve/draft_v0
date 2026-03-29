import { createRootRoute, Outlet } from "@tanstack/react-router";

export const Route = createRootRoute({
    component: RootLayout,
});

function RootLayout() {
    return (
        <div className="min-vh-100">
            <Outlet />
        </div>
    );
}
