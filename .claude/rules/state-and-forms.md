---
description: "State management (TanStack Query, Zustand) and form patterns (React Hook Form + Zod) for src/client/**"
---

# State Management & Forms

## Server State - TanStack Query

- Use `useQuery()` for all server data fetching
- **Never** use `useState` + `useEffect` to fetch API data
- Query keys: `[entity, params]` format (e.g., `["users", { id }]`)
- Invalidate after mutations:
    ```ts
    const mutation = useMutation({
        mutationFn: createUser,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["users"] });
        },
    });
    ```
- QueryClient config already set: 1-min staleTime, 1 retry

## Client State - Zustand

- Use for UI-only state (modals, sidebar, theme, filters)
- Small focused stores - not one mega-store
- Define with `create()`:

    ```ts
    import { create } from "zustand";

    interface SidebarStore {
        isOpen: boolean;
        toggle: () => void;
    }

    export const useSidebarStore = create<SidebarStore>((set) => ({
        isOpen: true,
        toggle: () => set((state) => ({ isOpen: !state.isOpen })),
    }));
    ```

- Prefer derived/computed state over duplicating state

## Forms - React Hook Form + Zod

- Define Zod schema first, infer TypeScript type from it:

    ```ts
    import { z } from "zod";
    import { useForm } from "react-hook-form";
    import { zodResolver } from "@hookform/resolvers/zod";

    const loginSchema = z.object({
        email: z.string().email(),
        password: z.string().min(8),
    });

    type LoginForm = z.infer<typeof loginSchema>;

    const form = useForm<LoginForm>({
        resolver: zodResolver(loginSchema),
    });
    ```

- Use `register()` for simple inputs, `Controller` only when needed (e.g., custom components)
- Combine with `useMutation` for form submission
