
import project1 from "../assets/projects/project-1.png";
import project2 from "../assets/projects/project-2.png";
import project3 from "../assets/projects/project-3.png";
import project4 from "../assets/projects/project-4.png";

export const HERO_CONTENT = `Java Backend Developer with 7+ months of hands-on industry experience in building scalable backend systems using Java, Spring Boot, REST APIs, and SQL. Experienced in high-volume data processing, microservices architecture, and performance optimization, with exposure to real-world fintech applications and UAT environments.`;

export const ABOUT_TEXT = `Java Backend Developer with 7+ months of hands-on industry experience in building scalable backend systems using Java, Spring Boot, REST APIs, and SQL. Experienced in high-volume data processing, microservices architecture, and performance optimization, with exposure to real-world fintech applications and UAT environments.`;

export const EXPERIENCES = [
  {
    year: "July 2025 - Present",
    role: "Java Backend Developer",
    company: "Paynext",
    description: `Developing and maintaining backend applications using Java and Spring Boot in a fintech production environment. Designing and consuming RESTful APIs as part of modular, microservices-based systems. Developed a high-performance CSV file reading module capable of processing and inserting 500,000+ records within ~40 seconds. Applied Data Structures such as Binary Search and TreeMap to optimize data lookup. Integrated Hibernate/JPA with MySQL, focusing on query optimization.`,
    technologies: ["Java", "Spring Boot", "Microservices", "MySQL", "Hibernate", "Redis", "Kafka"],
  },
  {
    year: "2023 - 2025",
    role: "Master of Computer Applications (MCA)",
    company: "SAGE University, Indore",
    description: `Specialized in Computer Applications. Built strong foundation in Advanced Java, Database Management Systems, and Software Engineering principles.`,
    technologies: ["Java", "DBMS", "Software Engineering"],
  },
  {
    year: "2019 - 2022",
    role: "BCCA",
    company: "GH Raisoni College, Nagpur",
    description: `Bachelor of Commerce in Computer Application. Focused on core computer science subjects and commerce fundamentals.`,
    technologies: ["C++", "Web Development", "Accounting"],
  }
];

export const PROJECTS = [
  {
    title: "Optimistic & Pessimistic Locking",
    image: project3,
    description: "Demonstration of concurrency control mechanisms in database transactions to handle race conditions effectively using Spring Boot and JPA.",
    technologies: ["Java", "Spring Boot", "JPA", "MySQL"],
    link: "https://github.com/sameerkhan05/Optimistic-and-Pessimistic-locking"
  },
  {
    title: "Blog-Web-App-Backend",
    image: project1,
    description: "Developed APIs for creating, managing, and viewing blog posts with categories. Implemented user authentication and role-based access control using Spring Security and JWT.",
    technologies: ["Java", "Spring Boot", "Spring Security", "Hibernate", "MySQL"],
    link: "https://github.com/sameerkhan05/Blog-Web-App-Backend"
  },
  {
    title: "Personal Trac",
    image: project2,
    description: "Robust Spring Boot application implementing CRUD operations for efficient departmental and personal data management. Utilized MVC architecture and RESTful API design.",
    technologies: ["Spring Boot", "MVC", "REST API", "CRUD"],
    link: "https://github.com/sameerkhan05/DepartmentCRUD"
  },
  {
    title: "Convo Box",
    image: project4,
    description: "Real-time chat application enabling seamless communication. Features user authentication, room management, and instant messaging capabilities.",
    technologies: ["React.js", "Node.js", "Socket.io", "Tailwind CSS"],
    link: "https://github.com/sameerkhan05/Chat-Application"
  }
];

export const CONTACT = {
  address: "India",
  phoneNo: "+91 7000646093",
  email: "sameerkhanyt09@gmail.com",
};
