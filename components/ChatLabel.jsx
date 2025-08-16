import React, { useState } from "react";
import Image from "next/image";
import { assets } from "./../assets/assets";

const ChatLabel = () => {
  const [showMenu, setShowMenu] = useState(false);

  return (
    <div className="flex items-center justify-between p-2 text-white/80 hover:bg-white/10 rounded-lg text-sm group cursor-pointer">
      {/* Chat Name */}
      <p className="group-hover:max-w-5/6 truncate">Chat Name Here</p>

      {/* 3 Dots Menu */}
      <div
        className="relative flex items-center justify-center h-6 w-6 aspect-square hover:bg-black/80 rounded-lg"
        onClick={() => setShowMenu(!showMenu)}
      >
        <Image src={assets.three_dots} alt="" className="w-4" />

        {/* Dropdown */}
        {showMenu && (
          <div className="absolute -right-36 top-6 bg-gray-700 rounded-xl w-max p-2 shadow-lg">
            <div className="flex items-center gap-3 hover:bg-white/10 px-3 py-2 rounded-lg cursor-pointer">
              <Image src={assets.pencil_icon} alt="" className="w-4" />
              <p>Rename</p>
            </div>
            <div className="flex items-center gap-3 hover:bg-white/10 px-3 py-2 rounded-lg cursor-pointer">
              <Image src={assets.delete_icon} alt="" className="w-4" />
              <p>Delete</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatLabel;
