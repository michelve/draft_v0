import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
    component: Index,
});

function Index() {
    return (
        <div className="flex min-h-screen items-center justify-center">
            <div className="text-center">
                <h1 className="text-4xl font-bold tracking-tight">Draft v0</h1>
                <p className="mt-2 text-muted-foreground">
                    Ready to build. Add shadcn components, paste a Figma URL, or describe a page.
                </p>
            </div>
        </div>
    );
}
