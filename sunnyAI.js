// ==========================================================================
// SUNNY AI KNOWLEDGE ASSISTANT - S SANKARSHA PORTFOLIO
// Answers questions about S Sankarsha's skills, projects, experience & resume.
// ==========================================================================

const SankarshaKnowledge = {
    personal: {
        name: "S. Sankarsha",
        role: "B.Tech AI & ML Student / Software Engineer",
        institution: "VIT Bhopal University",
        degree: "Bachelor's Degree in Artificial Intelligence & Machine Learning",
        expectedGraduation: "2027",
        cgpa: "7.92 / 10",
        bio: "Motivated B.Tech AI & ML student at VIT Bhopal with a strong passion for computer vision, data science, LLM security, and machine learning. Experienced in FastAPI micro-services, prompt injection shields, OpenCV vision systems, and 24/7 autonomous agents.",
        email: "sankarshsreekulam@gmail.com",
        phone: "+91 9014936902",
        github: "https://github.com/Sankarsh369",
        linkedin: "https://www.linkedin.com/in/sankarsha-s-b049b41b6",
        location: "VIT Bhopal University, India"
    },
    skills: {
        languages: ["Python", "C++", "JavaScript", "HTML5", "CSS3"],
        libraries: ["NumPy", "Pandas", "Scikit-learn", "OpenCV", "Tkinter"],
        mlConcepts: ["Supervised Learning", "Classification", "Regression", "Computer Vision", "LLM Security", "Threat Scoring"],
        webDev: ["FastAPI", "Next.js", "TypeScript", "HTML5", "CSS3"],
        tools: ["GitHub", "Jupyter Notebook", "Canva", "Figma", "GitHub Actions", "MongoDB"],
        softSkills: ["Quick Learner", "Problem Solver", "Team Collaborator", "Hackathon Enthusiast"]
    },
    experience: [
        {
            role: "Software Engineer Intern",
            company: "YugaYatra Retail (OPC) Private Ltd",
            period: "Nov 2025 – Jan 2026",
            location: "India (Hybrid)",
            highlights: [
                "Identified and reported functional bugs on live production websites through hands-on testing.",
                "Proposed UI/UX improvements including image, content, and frontend suggestions."
            ]
        }
    ],
    projectsCount: 16,
    githubUrl: "https://github.com/Sankarsh369",
    linkedinUrl: "https://www.linkedin.com/in/sankarsha-s-b049b41b6",
    education: [
        {
            degree: "Bachelor's Degree in AI & ML",
            school: "VIT Bhopal University",
            year: "2023 - 2027 (Expected)",
            score: "CGPA: 7.92 / 10"
        },
        {
            degree: "Class 12th Senior Secondary",
            school: "Amaravati State Board",
            year: "2022",
            score: "84.9%"
        },
        {
            degree: "Class 10th Secondary School",
            school: "Keshava Reddy School (State Board)",
            year: "2020",
            score: "97.6%"
        }
    ],
    certifications: [
        {
            title: "Fundamentals of AI and Machine Learning",
            provider: "Vityarthi & VIT Bhopal",
            desc: "Comprehensive certification covering AI fundamentals, data preprocessing, supervised learning, and Python ML implementation."
        },
        {
            title: "LLM Security & Prompt Injection Defense",
            provider: "GitHub & AI Security Poneglyph",
            desc: "Architecting FastAPI security gateways with threat scoring and real-time prompt injection filtering."
        },
        {
            title: "Computer Vision & OpenCV Facial Recognition",
            provider: "OpenCV Vision Engineering",
            desc: "Building web-based facial identification, automated attendance marking, and document perspective warping."
        }
    ]
};

class SunnyAIEngine {
    constructor() {
        this.kb = SankarshaKnowledge;
    }

    query(input) {
        if (!input || typeof input !== 'string') {
            return "Shishishi! Ask me anything about S. Sankarsha's 16 GitHub projects, LinkedIn certifications, skills, experience, or resume!";
        }

        const text = input.toLowerCase().trim();

        // 1. Who is Sankarsha / General Overview
        if (text.includes("who is") || text.includes("tell me about") || text.includes("overview") || text.includes("bio") || text.includes("developer")) {
            return `🍖 **S. Sankarsha** is a B.Tech AI & ML student at VIT Bhopal (CGPA 7.92/10). He has created **16 open-source projects** on GitHub including **LLM Firewalls**, **OpenCV Face Recognition Systems**, **Autonomous AI Agents**, and **Healthcare ML engines**! Connect with him on LinkedIn at: ${this.kb.linkedinUrl}`;
        }

        // 2. Technical Skills & Languages
        if (text.includes("skill") || text.includes("technology") || text.includes("tech stack") || text.includes("language") || text.includes("python") || text.includes("c++")) {
            return `🗡️ **Zoro's Haki Tech Stack**:
• **Core Languages**: ${this.kb.skills.languages.join(", ")}
• **Data Science & ML**: ${this.kb.skills.libraries.join(", ")}
• **ML & AI Concepts**: ${this.kb.skills.mlConcepts.join(", ")}
• **Web & Cloud**: ${this.kb.skills.webDev.join(", ")}, GitHub Actions
• **Tools**: ${this.kb.skills.tools.join(", ")}`;
        }

        // 3. Projects & Repositories
        if (text.includes("project") || text.includes("bounty") || text.includes("work") || text.includes("repo") || text.includes("download") || text.includes("zip")) {
            return `🏴‍☠️ **S. Sankarsha's 16 GitHub Repositories**:
1. **LLM Firewall & Prompt Shield** (FastAPI Gateway)
2. **Autonomous AI News Agent** (Google Gemini & NewsAPI)
3. **Healthcare Disease Predictor** (Scikit-learn ML)
4. **Face Recognition Attendance System** (OpenCV & Web)
5. **Digital Document Scanner** (Computer Vision & Warp)
6. **Python Task Commander** (Desktop Tkinter GUI)
7. **Skill Spot Job Platform** (Career Matching)
8. **OpenLake LLM Storage Engine** (Inference Infra)
9. **Next.js AI Assistant Site** (TypeScript & Web)
...and 7 more! Every project has a direct **Download ZIP** button on the Projects page!`;
        }

        // 4. Experience & Internship
        if (text.includes("experience") || text.includes("internship") || text.includes("yugayatra") || text.includes("work")) {
            const exp = this.kb.experience[0];
            return `🚩 **Experience: ${exp.role} @ ${exp.company}** (${exp.period})
• Identified and documented functional bugs on live production websites through hands-on testing.
• Proposed actionable UI/UX improvements including image, copy, and frontend suggestions.`;
        }

        // 5. Education & Scores
        if (text.includes("education") || text.includes("cgpa") || text.includes("vit") || text.includes("school") || text.includes("college") || text.includes("marks")) {
            return `📜 **Academic Milestones**:
• **VIT Bhopal University**: B.Tech in AI & ML (2023–2027) | **CGPA: 7.92 / 10**
• **Amaravati State Board**: Class 12th Senior Secondary (2022) | **84.9%**
• **Keshava Reddy School**: Class 10th Secondary School (2020) | **97.6%**`;
        }

        // 6. Certifications
        if (text.includes("certif") || text.includes("vityarthi") || text.includes("linkedin") || text.includes("course")) {
            return `📜 **S. Sankarsha's Verified Certifications**:
1. **Fundamentals of AI & Machine Learning** (Vityarthi & VIT Bhopal)
2. **LLM Security & Prompt Injection Defense** (GitHub & FastAPI)
3. **Computer Vision & OpenCV Facial Recognition** (Vision Engineering)
Check out his verified LinkedIn profile: ${this.kb.linkedinUrl}`;
        }

        // 7. Contact Details
        if (text.includes("contact") || text.includes("email") || text.includes("phone") || text.includes("github") || text.includes("linkedin") || text.includes("reach")) {
            return `📞 **Den Den Mushi Contact Line**:
• **Email**: ${this.kb.personal.email}
• **Phone**: ${this.kb.personal.phone}
• **GitHub**: ${this.kb.personal.github}
• **LinkedIn**: ${this.kb.personal.linkedin}`;
        }

        // 8. Why Hire Him
        if (text.includes("hire") || text.includes("why") || text.includes("recruit") || text.includes("strengths")) {
            return `🔥 **Why Recruit S. Sankarsha?**
1. **16 Active GitHub Repositories**: Strong hands-on experience in LLMs, OpenCV, Python, and web development.
2. **24/7 Cloud Automation**: Experience building resilient agent pipelines with GitHub Actions & Gemini API.
3. **Strong Academics & Work Ethic**: 7.92 CGPA at VIT Bhopal, 97.6% 10th score, and live QA internship experience at YugaYatra Retail.
4. **Quick Learner & Collaborator**: Rapidly picks up new frameworks and works seamlessly in engineering teams.`;
        }

        return `⚓ I don't have that specific information in my Grand Line Log Book! Try asking about S. Sankarsha's **16 projects**, **certifications**, **skills**, **internship experience**, **education**, or **contact info**!`;
    }
}

window.sunnyAI = new SunnyAIEngine();
