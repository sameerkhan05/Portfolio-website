import React from "react";
import { SiLeetcode } from "react-icons/si";
import { SiGeeksforgeeks } from "react-icons/si";
import { animate, delay, motion } from "framer-motion";
const iconVariants = (duration) => ({
  initial: { y: -10 },
  animate: {
    y: [10, -10],
    transition: {
      duration: duration,
      repeat: Infinity,
      repeatType: "reverse",
    },
  },
});
const CodingProfiles = () => {
  return (
    <div className="border-b border-neutral-900 pb-4 lg:mb-35">
      <h2 className="my-20 text-center text-4xl">Coding Profiles</h2>
      <div className="flex flex-wrap items-center justify-center gap-4 cursor-pointer">
        <motion.div
        variants={iconVariants(2)}
        initial="initial"
        animate="animate"
         className="rounded-2xl border-4 border-neutral-800 p-4">
          <a
            href="https://leetcode.com/u/sameerkhanyt09/"
            target="_blank"
            rel="noreferrer"
          >
            <SiLeetcode className="text-7xl text-orange-400 cursor-pointer" />
          </a>
        </motion.div>

        <motion.div
        variants={iconVariants(5)}
        initial="initial"
        animate="animate"
         className="rounded-2xl border-4 border-neutral-800 p-4">
          <a
            href="https://www.geeksforgeeks.org/user/sameerkhan01/"
            target="_blank"
            rel="noreferrer"
          >
            <SiGeeksforgeeks className="text-7xl text-green-500 cursor-pointer" />
          </a>
        </motion.div>
      </div>
    </div>
  );
};

export default CodingProfiles;
