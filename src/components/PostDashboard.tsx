import { useEffect, useMemo, useState } from "react";

type Post = {
    id: number;
    title: string;
    body: string;
};

export default function PostDashboard() {
    const [posts, setPosts] = useState<Post[]>([]);
    const [search, setSearch] = useState("");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        let cancelled = false;

        async function loadPosts() {
            setLoading(true);
            setError(null);
            try {
                const response = await fetch("https://jsonplaceholder.typicode.com/posts");
                if (!response.ok) {
                    throw new Error(`Request failed: ${response.status} ${response.statusText}`);
                }
                const data = (await response.json()) as Post[];
                if (!cancelled) setPosts(data);
            } catch (error) {
                if (!cancelled) {
                    setError(error instanceof Error ? error.message : "Unknown error");
                }
            } finally {
                if (!cancelled) setLoading(false);
            }
        }

        loadPosts();
        return () => {
            cancelled = true;
        };
    }, []);

    const filteredPosts = useMemo(() => {
        const query = search.trim().toLowerCase();
        if (!query) return posts;
        return posts.filter((post) => post.title.toLowerCase().includes(query));
    }, [posts, search]);

    if (loading) return <div className="status">📡 Loading posts...</div>;
    if (error) return <div className="status error">⚠️ Error: {error}</div>;
    return (
        <div>
            <h1>Post Dashboard</h1>
            <input
                type="text"
                placeholder="Search posts by title..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                style={{ padding: "10px", width: "100%" }}
            />
            <div>
                {filteredPosts.map((post) => (
                    <div key={post.id} style={{ border: "1px solid #ccc", padding: "10px", margin: "10px 0" }}>
                        <h2>{post.title}</h2>
                        <div>{post.body}</div>
                    </div>
                ))}
            </div>
        </div>
    );
}