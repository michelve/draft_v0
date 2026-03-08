import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
    component: Index,
});

function Index() {
    return (
        <div className="flex min-h-screen items-center justify-center">
            <div className="text-center">
                <h1 className="text-4xl font-bold tracking-tight">Draft v0</h1>
                <p className="text-muted-foreground mt-2 max-w-xl">
                    Fast prototyping for designers. Use AI prompts to generate code, integrate
                    components, paste Figma links, or sketch your ideas; no engineering background
                    needed.
                </p>
            </div>
        </div>
    );
}
