import { useState } from "react";
import { Heart, Send, ChevronDown } from "lucide-react";

type Comment = {
  id: number;
  name: string;
  handle: string;
  date: string;
  text: string;
  likes: number;
  liked: boolean;
};

const initialComments: Comment[] = [
  {
    id: 1,
    name: "امیر محمد",
    handle: "@amiri64",
    date: "شنبه ۱۵ دی ماه ۱۴۰۳، ساعت ۱۴:۳۰",
    text: "سلام، ممنون از ارائه این خانه شگفت‌انگیز. هوش مصنوعی برای این منظور عالی هست.\nبرای اجاره بیشتر از ۶ ماه مبلغی تخفیف دارد یا داریم؟ ممنون از لطفتون 🥰",
    likes: 3,
    liked: false,
  },
  {
    id: 2,
    name: "امیر محمد",
    handle: "@amiri64",
    date: "دوشنبه ۱۷ دی ماه ۱۴۰۳، ساعت ۱۰:۱۵",
    text: "سلام، ممنون از ارائه این خانه شگفت‌انگیز. هوش مصنوعی برای این منظور عالی هست.\nبرای اجاره بیشتر از ۶ ماه مبلغی تخفیف دارد یا داریم؟ ممنون از لطفتون 🥰",
    likes: 5,
    liked: false,
  },
  {
    id: 3,
    name: "امیر محمد",
    handle: "@amiri64",
    date: "سه‌شنبه ۱۸ دی ماه ۱۴۰۳، ساعت ۰۹:۴۵",
    text: "سلام، ممنون از ارائه این خانه شگفت‌انگیز. هوش مصنوعی برای این منظور عالی هست.\nبرای اجاره بیشتر از ۶ ماه مبلغی تخفیف دارد یا داریم؟ ممنون از لطفتون 🥰",
    likes: 2,
    liked: false,
  },
  {
    id: 4,
    name: "امیر محمد",
    handle: "@amiri64",
    date: "چهارشنبه ۱۹ دی ماه ۱۴۰۳، ساعت ۱۶:۰۰",
    text: "سلام، ممنون از ارائه این خانه شگفت‌انگیز. هوش مصنوعی برای این منظور عالی هست.\nبرای اجاره بیشتر از ۶ ماه مبلغی تخفیف دارد یا داریم؟ ممنون از لطفتون 🥰",
    likes: 7,
    liked: false,
  },
  {
    id: 5,
    name: "امیر محمد",
    handle: "@amiri64",
    date: "پنجشنبه ۲۰ دی ماه ۱۴۰۳، ساعت ۱۱:۳۰",
    text: "سلام، ممنون از ارائه این خانه شگفت‌انگیز. هوش مصنوعی برای این منظور عالی هست.\nبرای اجاره بیشتر از ۶ ماه مبلغی تخفیف دارد یا داریم؟ ممنون از لطفتون 🥰",
    likes: 4,
    liked: false,
  },
];

function Avatar({ name }: { name: string }) {
  const initials = name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .slice(0, 2);
  return (
    <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-gradient-to-br from-indigo-400 to-purple-500 flex items-center justify-center flex-shrink-0 text-white font-bold text-sm select-none shadow-sm">
      {initials}
    </div>
  );
}

function CommentCard({
  comment,
  onLike,
}: {
  comment: Comment;
  onLike: (id: number) => void;
}) {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 px-4 py-4 sm:px-5 sm:py-5 shadow-sm">
      {/* Header */}
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

      {/* Body */}
      <p className="mt-3 text-gray-700 text-sm sm:text-base leading-7 whitespace-pre-line pr-[52px] sm:pr-[56px]">
        {comment.text}
      </p>

      {/* Like */}
      <div className="flex justify-end mt-3">
        <button
          onClick={() => onLike(comment.id)}
          className={[
            "flex items-center gap-1.5 text-xs sm:text-sm rounded-full px-3 py-1.5 transition-all duration-200",
            comment.liked
              ? "text-rose-500 bg-rose-50"
              : "text-gray-400 hover:text-rose-400 hover:bg-rose-50",
          ].join(" ")}
        >
          <Heart
            className={[
              "w-4 h-4 transition-all duration-200",
              comment.liked ? "fill-rose-500 text-rose-500 scale-110" : "",
            ].join(" ")}
          />
          <span className="font-medium">{comment.likes}</span>
        </button>
      </div>
    </div>
  );
}

export default function App() {
  const [comments, setComments] = useState<Comment[]>(initialComments);
  const [newComment, setNewComment] = useState("");
  const [showAll, setShowAll] = useState(false);

  const visibleComments = showAll ? comments : comments.slice(0, 3);

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
    const comment: Comment = {
      id: Date.now(),
      name: "کاربر جدید",
      handle: "@user",
      date: "همین لحظه",
      text: newComment.trim(),
      likes: 0,
      liked: false,
    };
    setComments((prev) => [comment, ...prev]);
    setNewComment("");
  }

  return (
    <div
      dir="rtl"
      className="min-h-screen bg-[#f5f6f8] flex justify-center py-8 px-3 sm:px-6"
      style={{ fontFamily: "'Vazirmatn', sans-serif" }}
    >
      <div className="w-full max-w-2xl space-y-3">
        {/* First comment (above input) */}
        <CommentCard comment={comments[0]} onLike={handleLike} />

        {/* ── Comment input box ── */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm px-4 py-4 sm:px-5 sm:py-5">
          <p className="font-bold text-gray-800 text-sm sm:text-base mb-3">
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
                className="w-full resize-none rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-300 focus:border-indigo-300 transition-all leading-7"
              />
              <div className="flex justify-end mt-2">
                <button
                  onClick={handleSubmit}
                  disabled={!newComment.trim()}
                  className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 disabled:bg-gray-200 disabled:text-gray-400 text-white text-sm font-semibold px-5 py-2 rounded-xl transition-all duration-200"
                >
                  <Send className="w-4 h-4" />
                  ارسال
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Remaining comments */}
        {visibleComments.slice(1).map((c) => (
          <CommentCard key={c.id} comment={c} onLike={handleLike} />
        ))}

        {/* Show more */}
        {!showAll && comments.length > 3 && (
          <div className="flex justify-center pt-2 pb-4">
            <button
              onClick={() => setShowAll(true)}
              className="flex items-center gap-2 border border-gray-300 text-gray-600 hover:border-indigo-400 hover:text-indigo-600 text-sm font-semibold px-8 py-2.5 rounded-full transition-all duration-200 bg-white shadow-sm"
            >
              بیشتر بخوانید
              <ChevronDown className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
