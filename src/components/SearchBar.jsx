import React, { useState } from "react";
import { motion } from "framer-motion";
import { Search } from "lucide-react";

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState("");

  const handleSearch = (e) => {
    setQuery(e.target.value);
    onSearch(e.target.value);
  };

  return (
    <motion.div
      className="flex justify-center my-6"
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <div className="relative">
        <input
          type="text"
          placeholder="Search products..."
          value={query}
          onChange={handleSearch}
          className="bg-[#1E1E2E] text-white border border-[#EC4186] rounded-full p-3 pl-10 w-80 shadow-lg outline-none focus:ring-2 focus:ring-[#EE544A] transition"
        />
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#EC4186]" />
      </div>
    </motion.div>
  );
};

export default SearchBar;

