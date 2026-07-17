import { Heart } from "lucide-react";
import { Comment } from "./types";
import Avatar from "./Avatar";
export default function CommentCard({
  comment,
  onLike,
}: {
  comment: Comment;
  onLike: (id: number) => void;
}) {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 px-4 py-4 sm:px-5 sm:py-5 shadow-sm">
      <div className="flex items-start gap-3">
        <Avatar name={comment.name} />
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="font-bold text-gray-900 text-sm sm:text-base leading-none">
              {comment.name}
            </span>
            <span className="text-gray-400 text-xs">{comment.handle}</span>
          </div>
          <p className="text-gray-400 text-[11px] sm:text-xs mt-1">
            {comment.date}
          </p>
        </div>
      </div>
      <p className="mt-3 text-gray-700 text-sm sm:text-base leading-7 whitespace-pre-line pr-[52px] sm:pr-[56px]">
        {comment.text}
      </p>
      <div className="flex justify-end mt-3">
        <button
          onClick={() => onLike(comment.id)}
          className={[
            "flex items-center gap-1.5 text-xs sm:text-sm rounded-full px-3 py-1.5 transition-all duration-200",
            comment.liked
              ? "text-primary500 bg-rose-50"
              : "text-gray-400 hover:text-primary700 hover:bg-rose-50",
          ].join(" ")}
        >
          <Heart
            className={[
              "w-4 h-4 transition-all duration-200",
              comment.liked ? "fill-primary500 text-primary500 scale-110" : "",
            ].join(" ")}
          />
          <span className="font-medium">{comment.likes}</span>
        </button>
      </div>
    </div>
  );
}
