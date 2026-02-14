import { PROJECTS as REAL_PROJECTS } from '../constants';

export const profileData = {
    name: "Sameer Khan",
    role: "Backend Engineer",
    bio: "Java Backend Developer | Spring Boot | Microservices | Scalable Systems",
    location: "India",
    email: "sameerkhanyt09@gmail.com",
    socials: {
        github: "https://github.com/sameerkhan05",
        linkedin: "https://www.linkedin.com/in/sameer-khan-ba13641ba/"
    },
    status: "Open to Work"
};

export const techStackData = {
    languages: ["Java", "Python", "JavaScript", "SQL"],
    frameworks: ["Spring Boot", "Microservices", "Hibernate/JPA", "React.js"],
    databases: ["MySQL", "Redis", "MongoDB"],
    tools: ["Git", "Postman", "IntelliJ IDEA", "Linux", "Docker"]
};

// Re-export constants as "projectsData" or "PROJECTS" to fix imports
export const projectsData = REAL_PROJECTS;
export const PROJECTS = REAL_PROJECTS;

export const leetCodeData = {
    username: "sameerkhan05",
    totalSolved: 450, // Mocked for now, will be fetched if API works
    easy: 150,
    medium: 250,
    hard: 50,
    ranking: 12500,
    acceptanceRate: "68.5%"
};
