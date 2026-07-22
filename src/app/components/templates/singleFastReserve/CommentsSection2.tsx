import { useState } from "react";
import { seedComments } from "./constants";
import { Comment2 } from "./types";
import CommentCard from "./CommentCard";
import Avatar from "./Avatar";
import { ChevronDown, Send } from "lucide-react";

export default function CommentsSection2() {
  const [comments, setComments] = useState<Comment2[]>(seedComments);
  const [newComment, setNewComment] = useState("");
  const [showAll, setShowAll] = useState(false);
  const visible = showAll ? comments : comments.slice(0, 3);

  function handleLike(id: number) {
    setComments((prev) =>
      prev.map((c) =>
        c.id === id
          ? {
              ...c,
              liked: !c.liked,
              likes: c.liked ? c.likes - 1 : c.likes + 1,
            }
          : c,
      ),
    );
  }
  function handleSubmit() {
    if (!newComment.trim()) return;
    setComments((prev) => [
      {
        id: Date.now(),
        name: "کاربر جدید",
        handle: "@user",
        date: "همین لحظه",
        text: newComment.trim(),
        likes: 0,
        liked: false,
      },
      ...prev,
    ]);
    setNewComment("");
  }

  return (
    <section className="space-y-3">
      {/* First comment */}
      {comments[0] && <CommentCard comment={comments[0]} onLike={handleLike} />}

      {/* Comment input */}
      <div className="bg-white dark:bg-[#272727] rounded-2xl border border-gray-100  dark:border-[#272727] shadow-sm px-4 py-4 sm:px-5 sm:py-5">
        <p className="font-bold text-gray-800 dark:text-white text-sm sm:text-base mb-3">
          نظر خود را وارد کنید
        </p>
        <div className="flex gap-3 items-start">
          <Avatar name="کاربر" />
          <div className="flex-1">
            <textarea
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="نظر شما..."
              rows={3}
              className="w-full resize-none rounded-xl border border-gray-200 dark:border-[#353535]  bg-gray-50 dark:bg-[#353535] px-4 py-3 text-sm text-gray-800  dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-300 focus:border-indigo-300 transition-all leading-7"
            />
            <div className="flex justify-end mt-2">
              <button
                onClick={handleSubmit}
                disabled={!newComment.trim()}
                className="flex items-center gap-2 bg-primary500 dark:bg-primary600 hover:bg-primary700  disabled:bg-gray-200 dark:disabled:bg-[#353535]  disabled:text-gray-400 text-white text-sm font-semibold px-5 py-2 rounded-xl transition-all"
              >
                <Send className="w-4 h-4" />
                ارسال
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Rest of comments */}
      {visible.slice(1).map((c) => (
        <CommentCard key={c.id} comment={c} onLike={handleLike} />
      ))}

      {/* Show more */}
      {!showAll && comments.length > 3 && (
        <div className="flex justify-center py-4">
          <button
            onClick={() => setShowAll(true)}
            className="flex items-center gap-2 border border-gray-300 dark:border-primary500 text-gray-600 dark:text-primary500 hover:border-primary600 hover:text-primary700 text-sm font-semibold px-8 py-2.5 rounded-full transition-all bg-white dark:bg-[#272727] shadow-sm"
          >
            بیشتر بخوانید
            <ChevronDown className="w-4 h-4" />
          </button>
        </div>
      )}
    </section>
  );
}
