import React from "react";
import { PROJECTS } from "../constants";
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




const Project = () => {
  return (
    <div className="border-b border-neutral-900 pb-4">
      <h1
       className="my-20 text-center text-4xl">Projects</h1>
      <div>
        {PROJECTS.map((project, index) => (
          <div key={index} className="mb-8 flex flex-wrap lg:justify-center">
            <motion.div
            whileInView={{opacity : 1, x:0}}
            initial={{opacity:0, x:-100}}
            transition={{duration: 0.5, delay: index * 0.2 }}
             className="w-full lg:w-1/4">
              <motion.img 
              variants={iconVariants(2.5)}
              initial="initial"
              animate="animate"
                src={project.image}
                alt={project.title}
                height={150}
                width={150}
                className="mb-6 rounded-2xl border-4 border-white opacity-60 p-4"
              />
            </motion.div>
            <motion.div
            whileInView={{opacity : 1, x:0}}
            initial={{opacity:0, x:100}}
            transition={{duration: 0.5, delay: index * 0.2 }} 
            className="w-full max-w-xl lg:w-3/4">
             <h6 className="mb-2 font-semibold">{project.title}</h6>
            <p className="mb-4 text-neutral-400">{project.description}</p>
            {project.technologies.map((tech,index)=>(
                <span className="mr-2 rounded bg-neutral-900 px-2 py-1 text-sm font-medium text-purple-600" key={index}>
                   {tech}
                </span>
            ))}
            </motion.div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Project;
