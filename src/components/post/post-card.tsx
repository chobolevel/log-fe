import Link from "next/link";
import { Post, PostCategory } from "@/types/post";
import { cn } from "@/lib/utils";
import { Clock } from "lucide-react";

const CATEGORY_LABEL: Record<PostCategory, string> = {
  tech: "기술",
  blog: "블로그",
  diary: "일기",
};

const CATEGORY_STYLE: Record<PostCategory, string> = {
  tech: "bg-green-subtle text-green-subtle-foreground",
  blog: "bg-blue-50 text-blue-600",
  diary: "bg-amber-50 text-amber-600",
};

interface PostCardProps {
  post: Post;
}

export default function PostCard({ post }: PostCardProps) {
  return (
    <Link
      href={`/posts/${post.id}`}
      className="group flex flex-col gap-3 rounded-2xl border border-border bg-card p-5 transition-shadow hover:shadow-md"
    >
      <div className="flex items-center justify-between">
        <span
          className={cn(
            "rounded-full px-2.5 py-0.5 text-xs font-semibold",
            CATEGORY_STYLE[post.category]
          )}
        >
          {CATEGORY_LABEL[post.category]}
        </span>
        <span className="flex items-center gap-1 text-xs text-muted-foreground">
          <Clock className="h-3 w-3" />
          {post.readTime}분
        </span>
      </div>

      <h3 className="line-clamp-2 text-base font-bold leading-snug tracking-tight group-hover:text-green">
        {post.title}
      </h3>

      <p className="line-clamp-2 text-sm leading-relaxed text-muted-foreground">
        {post.excerpt}
      </p>

      {post.tags.length > 0 && (
        <div className="flex flex-wrap gap-1.5">
          {post.tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="rounded-md bg-muted px-2 py-0.5 text-xs text-muted-foreground"
            >
              #{tag}
            </span>
          ))}
        </div>
      )}

      <div className="mt-auto flex items-center justify-between pt-1">
        <span className="text-xs font-medium text-foreground">
          {post.author.name}
        </span>
        <span className="text-xs text-muted-foreground">{post.createdAt}</span>
      </div>
    </Link>
  );
}
