import { Heart } from "lucide-react";
import Avatar from "./Avatar";
import { Comment } from "./types";

export default function CommentItem({
  comment,
  onLike,
}: {
  comment: Comment;
  onLike: (id: number, replyId?: number) => void;
}) {
  return (
    <div className="space-y-3">
      {/* Main comment */}
      <div className="flex gap-3">
        <Avatar name={comment.author} />
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1 flex-wrap">
            <span className="text-sm font-bold text-gray-800">
              {comment.author}
            </span>
            <span className="text-xs text-gray-400">{comment.date}</span>
          </div>
          <p className="text-sm text-gray-600 leading-6">{comment.text}</p>
          <button
            onClick={() => onLike(comment.id)}
            className={`mt-2 flex items-center gap-1 text-xs transition-colors ${comment.liked ? "text-rose-500" : "text-gray-400 hover:text-rose-400"}`}
          >
            <Heart size={13} fill={comment.liked ? "currentColor" : "none"} />
            <span>{comment.likes}</span>
          </button>
        </div>
      </div>

      {/* Replies */}
      {comment.replies?.map((reply) => (
        <div
          key={reply.id}
          className="flex gap-3 mr-10 pr-3 border-r-2 border-blue-100"
        >
          <Avatar name={reply.author} size="sm" />
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1 flex-wrap">
              <span className="text-xs font-bold text-gray-800">
                {reply.author}
              </span>
              <span className="text-[11px] text-gray-400">{reply.date}</span>
            </div>
            <p className="text-xs text-gray-600 leading-6">{reply.text}</p>
            <button
              onClick={() => onLike(comment.id, reply.id)}
              className={`mt-1 flex items-center gap-1 text-xs transition-colors ${reply.liked ? "text-rose-500" : "text-gray-400 hover:text-rose-400"}`}
            >
              <Heart size={11} fill={reply.liked ? "currentColor" : "none"} />
              <span>{reply.likes}</span>
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
