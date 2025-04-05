
export interface Roadmap {
  id: string;
  title: string;
  description: string;
  image: string;
  path: string;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  duration: string;
  field: string;
}

export const roadmaps: Roadmap[] = [
  {
    id: "web-development",
    title: "Web Development",
    description: "Learn frontend and backend technologies to become a full-stack web developer.",
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80",
    path: "/roadmaps/web-development",
    difficulty: "Beginner",
    duration: "16 weeks",
    field: "Technology",
  },
  {
    id: "data-science",
    title: "Data Science",
    description: "Master data analysis, machine learning, and statistical methods to extract insights from data.",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80",
    path: "/roadmaps/data-science",
    difficulty: "Intermediate",
    duration: "20 weeks",
    field: "Technology",
  },
  {
    id: "ux-ui-design",
    title: "UX/UI Design",
    description: "Learn to design user-friendly interfaces and create exceptional user experiences.",
    image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80",
    path: "/roadmaps/ux-ui-design",
    difficulty: "Beginner",
    duration: "14 weeks",
    field: "Design",
  },
  {
    id: "digital-marketing",
    title: "Digital Marketing",
    description: "Master social media, SEO, content marketing, and analytics to drive online growth.",
    image: "https://images.unsplash.com/photo-1533750349088-cd871a92f7e4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80",
    path: "/roadmaps/digital-marketing",
    difficulty: "Beginner",
    duration: "12 weeks",
    field: "Marketing",
  },
  {
    id: "mobile-development",
    title: "Mobile App Development",
    description: "Learn to build native and cross-platform mobile applications for iOS and Android.",
    image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80",
    path: "/roadmaps/mobile-development",
    difficulty: "Intermediate",
    duration: "18 weeks",
    field: "Technology",
  },
  {
    id: "cloud-computing",
    title: "Cloud Computing",
    description: "Master cloud platforms, infrastructure, and deployment strategies for modern applications.",
    image: "https://images.unsplash.com/photo-1508345228704-935cc84bf5e2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80",
    path: "/roadmaps/cloud-computing",
    difficulty: "Advanced",
    duration: "22 weeks",
    field: "Technology",
  },
  {
    id: "financial-analysis",
    title: "Financial Analysis",
    description: "Learn financial modeling, valuation, and analysis techniques for business decision-making.",
    image: "https://images.unsplash.com/photo-1579170053380-58828edb5e16?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80",
    path: "/roadmaps/financial-analysis",
    difficulty: "Intermediate",
    duration: "16 weeks",
    field: "Finance",
  },
  {
    id: "graphic-design",
    title: "Graphic Design",
    description: "Master visual communication through typography, imagery, color, and layout principles.",
    image: "https://images.unsplash.com/photo-1619616713221-a511d7037672?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80",
    path: "/roadmaps/graphic-design",
    difficulty: "Beginner",
    duration: "14 weeks",
    field: "Design",
  },
  {
    id: "product-management",
    title: "Product Management",
    description: "Learn to lead product development from ideation to launch and ongoing improvement.",
    image: "https://images.unsplash.com/photo-1553877522-43269d4ea984?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80",
    path: "/roadmaps/product-management",
    difficulty: "Intermediate",
    duration: "18 weeks",
    field: "Business",
  },
];

export const fields = ["All Fields", "Technology", "Design", "Marketing", "Finance", "Business"];
