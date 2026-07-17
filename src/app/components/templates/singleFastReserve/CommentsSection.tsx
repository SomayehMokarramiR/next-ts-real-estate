"use client";

import { useState } from "react";
import { INITIAL_COMMENTS } from "./constants";
import CommentItem from "./CommentItem";
import Avatar from "./Avatar";
import { Send } from "lucide-react";
import type { Comment as CommentType } from "./types";

export default function CommentsSection() {
  const [comments, setComments] = useState<CommentType[]>(INITIAL_COMMENTS);
  const [newComment, setNewComment] = useState("");

  const handleLike = (id: number, replyId?: number) => {
    setComments((prev) =>
      prev.map((c) => {
        if (c.id !== id) return c;

        // like main comment
        if (replyId === undefined) {
          return {
            ...c,
            liked: !c.liked,
            likes: c.liked ? c.likes - 1 : c.likes + 1,
          };
        }

        // like reply
        return {
          ...c,
          replies: c.replies?.map((r) =>
            r.id === replyId
              ? {
                  ...r,
                  liked: !r.liked,
                  likes: r.liked ? r.likes - 1 : r.likes + 1,
                }
              : r,
          ),
        };
      }),
    );
  };

  const handleSubmit = () => {
    if (!newComment.trim()) return;

    setComments((prev) => [
      {
        id: Date.now(),
        author: "کاربر جدید",
        date: "۱۴۰۳/۰۴/۱۶",
        text: newComment.trim(),
        likes: 0,
        liked: false,
      },
      ...prev,
    ]);

    setNewComment("");
  };

  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-5 mt-4">
      <h2 className="text-base font-bold text-gray-900 mb-4">
        دیدگاه‌ها
        <span className="mr-2 text-sm font-normal text-gray-400">
          ({comments.length} نظر)
        </span>
      </h2>

      <div className="space-y-5 divide-y divide-gray-100">
        {comments.map((comment, i) => (
          <div key={comment.id} className={i > 0 ? "pt-5" : ""}>
            <CommentItem comment={comment} onLike={handleLike} />
          </div>
        ))}
      </div>

      {/* New comment input */}
      <div className="mt-6 pt-5 border-t border-gray-100">
        <h3 className="text-sm font-bold text-gray-800 mb-3">ثبت دیدگاه</h3>

        <div className="flex gap-3">
          <Avatar name="ک" />

          <div className="flex-1">
            <textarea
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="دیدگاه خود را بنویسید..."
              rows={3}
              className="
                w-full
                border
                border-gray-200
                rounded-xl
                px-3
                py-2.5
                text-sm
                text-gray-700
                placeholder-gray-400
                resize-none
                focus:outline-none
                focus:border-blue-400
                transition-colors
                leading-6
              "
            />

            <button
              onClick={handleSubmit}
              className="
                mt-2
                flex
                items-center
                gap-2
                bg-blue-600
                hover:bg-blue-700
                text-white
                text-sm
                font-semibold
                px-4
                py-2
                rounded-xl
                transition-colors
              "
            >
              <Send size={14} />
              ثبت دیدگاه
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
