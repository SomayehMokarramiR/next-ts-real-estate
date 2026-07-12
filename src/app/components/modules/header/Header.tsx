import { HiOutlineUser, HiOutlineMoon, HiOutlinePhone } from "react-icons/hi";
import {
  MdOutlineKeyboardArrowDown,
  MdOutlineNotificationsNone,
} from "react-icons/md";

const Header = () => {
  return (
    <header className="w-full bg-white shadow-sm border border-gray-200">
      <div className="h-20 px-10 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-blue-700 rounded-sm"></div>
          <span className="text-3xl font-bold text-gray-900">Home</span>
        </div>

        {/* Menu */}
        <nav className="hidden lg:flex items-center gap-8 text-sm text-gray-700">
          <a href="#" className="text-blue-700 font-medium">
            خانه
          </a>

          <button className="flex items-center gap-1 hover:text-blue-700">
            خرید و اجاره
            <MdOutlineKeyboardArrowDown />
          </button>

          <button className="flex items-center gap-1 hover:text-blue-700">
            رزرو ویلا
            <MdOutlineKeyboardArrowDown />
          </button>

          <button className="flex items-center gap-1 hover:text-blue-700">
            رزرو بوم گردی
            <MdOutlineKeyboardArrowDown />
          </button>

          <a href="#" className="hover:text-blue-700">
            تماس با ما
          </a>
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-3">
          <button className="w-10 h-10 rounded-full border border-blue-700 text-blue-700 flex items-center justify-center hover:bg-blue-50 transition">
            <HiOutlineMoon size={18} />
          </button>

          <button className="flex items-center gap-2 px-4 py-2 rounded-full border border-blue-700 text-blue-700 hover:bg-blue-50 transition">
            <HiOutlineUser size={18} />
            <span className="text-sm">ورود / ثبت نام</span>
          </button>

          <button className="flex items-center gap-2 px-4 py-2 rounded-full bg-blue-700 text-white hover:bg-blue-800 transition">
            <MdOutlineNotificationsNone size={18} />
            <span className="text-sm">مهم ترین اخبار</span>
          </button>
        </div>
      </div>

      {/* Bottom blue line */}
      <div className="relative h-1 bg-gray-200">
        <div className="absolute right-0 w-1/3 h-full bg-blue-700"></div>
      </div>
    </header>
  );
};

export default Header;
