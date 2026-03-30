import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Heading, Text } from "@/components/ui/typography";

export const Route = createFileRoute("/")({
    component: Index,
});

function Index() {
    const [theme, setTheme] = useState<"light" | "dark">("light");

    function toggleTheme() {
        const next = theme === "light" ? "dark" : "light";
        setTheme(next);
        document.documentElement.setAttribute("data-dsai-theme", next);
        document.documentElement.setAttribute("data-bs-theme", next);
    }

    return (
        <div className="d-flex min-vh-100 align-items-center justify-content-center">
            <div className="text-center" style={{ maxWidth: "600px" }}>
                <img
                    src="/assets/draft_v0_icon.svg"
                    alt="Draft v0 logo"
                    width={80}
                    height={80}
                    className="mb-3"
                />
                <Heading level={1} className="mb-3">
                    Welcome to DSAi
                </Heading>
                <Text className="text-body-secondary mb-4">
                    The official DSAi starter template. Production-ready React 19 app with design
                    tokens, accessible components, and a full Express + Prisma backend. Add
                    components as you need them with <code>dsai add</code>.
                </Text>
                <div className="d-flex gap-3 justify-content-center">
                    <Button variant="primary" size="lg">
                        Get Started
                    </Button>
                    <Button variant="outline-secondary" size="lg">
                        Documentation
                    </Button>
                </div>
                <div className="mt-4">
                    <Button variant="link" onClick={toggleTheme}>
                        Switch to {theme === "light" ? "dark" : "light"} mode
                    </Button>
                </div>
            </div>
        </div>
    );
}
