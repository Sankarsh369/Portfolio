/*
 * Project data. Each entry renders as a card on the home page and as a
 * detail view (overview, architecture, workflow, stack, links) in the modal.
 *
 * architecture: ordered layers, top (user-facing) to bottom (storage/infra).
 * workflow:     ordered steps a request / run goes through.
 */
const GH = "https://github.com/Sankarsh369/";

const PROJECTS = [
  {
    slug: "nucleus",
    title: "Nucleus",
    tagline: "LLM context compression engine that cuts prompt size by 70%+ while keeping answers accurate.",
    category: "ai",
    featured: true,
    badge: "Hackathon · InnovaHack Round 2",
    stack: ["Python", "FastAPI", "Next.js", "TypeScript", "Appwrite", "tiktoken", "Docker", "GitHub Actions"],
    repo: GH + "Nucleus",
    live: "https://nucleus-lime-nine.vercel.app",
    metrics: [
      { value: "76.3%", label: "token reduction on benchmark code" },
      { value: "95%+", label: "QA accuracy retained" },
      { value: "1.85×", label: "latency speedup" }
    ],
    overview:
      "Large codebases, logs and chat histories are expensive to send to an LLM. Nucleus sits in front of any model and compresses the context first: it removes duplicated chunks, boilerplate and filler, keeps what matters for the question, and then proves the compressed text still answers the same questions as the original.",
    problem:
      "Every extra token costs money and latency. Naively truncating context breaks answers, so the goal was to shrink prompts aggressively without losing the facts a model needs.",
    features: [
      "Content-type detection (code, JSON logs, prose, conversation) with type-aware chunking",
      "Semantic de-duplication of near-identical chunks using similarity scoring",
      "TF-IDF based filler stripping with a floor so important lines are never dropped",
      "Token-budget mode, PII redaction, and conversation-history compression that protects recent turns",
      "QA validation: asks an LLM the same questions on raw vs. compressed text and reports accuracy retained",
      "Per-stage trace, cost-saved estimate per target model, and run metrics endpoint",
      "Next.js dashboard with email, GitHub and Google sign-in via Appwrite"
    ],
    architecture: [
      { name: "Frontend", nodes: ["Next.js + TypeScript UI (Vercel)", "Appwrite Auth (Email · GitHub · Google)"] },
      { name: "API", nodes: ["FastAPI service (Render)", "API-key auth", "/compress · /compress/conversation · /metrics"] },
      { name: "Engine", nodes: ["Ingestion & chunking", "Semantic dedup", "Filler stripping", "PII redaction"] },
      { name: "Validation", nodes: ["QA validator", "LLM client (Groq / Gemini / Claude, retry + backoff)"] },
      { name: "Data & Infra", nodes: ["Appwrite database (run history)", "Response cache", "Docker · CI tests"] }
    ],
    workflow: [
      { t: "Submit context", d: "User pastes code, logs or a conversation (optionally with test questions) in the dashboard." },
      { t: "Detect & chunk", d: "Engine counts tokens with tiktoken, detects the content type and splits it into token-bounded chunks." },
      { t: "Compress", d: "Duplicate chunks are merged, low-value lines are stripped and PII is masked, recording a trace per stage." },
      { t: "Validate", d: "The same questions are asked against original and compressed text; answer similarity gives accuracy retained." },
      { t: "Report", d: "Returns compressed text, compression ratio, cost saved, latency speedup and a readable diff of what was removed." }
    ],
    learned: [
      "Designing a multi-stage pipeline where each stage is measurable and testable on its own",
      "Building graceful fallbacks (offline token estimator, mock model) so the API never crashes",
      "Shipping a split frontend/backend deployment with third-party auth"
    ],
    run: "cd Backend\npip install -r requirements.txt\npython verify_pipeline.py   # benchmark run\nuvicorn app.main:app --reload"
  },
  {
    slug: "ai-teacher",
    title: "AI Teacher",
    tagline: "Human-like AI educator that plans lessons, teaches through video, asks questions and adapts to the learner.",
    category: "ai",
    featured: true,
    badge: "Hackathon · AI Innovation Hackathon 2026",
    stack: ["Python", "FastAPI", "React", "TypeScript", "Vite", "RAG (TF-IDF)", "Claude / OpenAI", "edge-tts", "SQLite / Postgres"],
    repo: GH + "ai-teacher",
    live: "https://ai-teacher-sankarsha.vercel.app",
    links: [{ label: "API docs", url: "https://ai-teacher-backend-yb5i.onrender.com/docs" }],
    overview:
      "A working AI tutor, not a chatbot. Give it a topic or upload notes (PDF, DOCX, PPTX) and it plans a lesson sized to your time, teaches it section by section with a talking avatar, stops to ask checkpoint questions, re-explains misconceptions a different way, adjusts difficulty live, and ends with a graded quiz and a personal report. It can also render the whole lesson as a narrated, downloadable video.",
    problem:
      "Recorded lectures only broadcast and text chatbots only answer. Neither checks whether the learner understood, or re-teaches when they didn't.",
    features: [
      "Lessons from an uploaded document (RAG-grounded) or from just a topic",
      "Explain → question → evaluate → adapt loop with live beginner ⇄ intermediate ⇄ advanced difficulty",
      "Misconception diagnosis instead of plain right/wrong marking",
      "Server-rendered .mp4 lessons: narrated avatar with audio-driven lip movement and subject-aware visuals",
      "20 languages, including Hindi, Hinglish and 8 other Indian languages",
      "Learner memory of weak/strong concepts, AI learning paths, and school roles (principal, teacher, student)",
      "Pluggable LLM (Claude or OpenAI) plus a zero-cost mock mode so the whole pipeline runs without API keys"
    ],
    architecture: [
      { name: "Frontend", nodes: ["React + Vite + TS (Vercel)", "Classroom (live lesson)", "Video Studio", "Dashboard"] },
      { name: "API", nodes: ["FastAPI (Render)", "auth · school · materials · sessions · learner · video"] },
      { name: "Teaching brain", nodes: ["Lesson planner", "Answer evaluator", "Difficulty state machine"] },
      { name: "AI & retrieval", nodes: ["LLM client (Claude / OpenAI / mock)", "TF-IDF retrieval (RAG)", "PDF/DOCX/PPTX parsers"] },
      { name: "Media & data", nodes: ["TTS (edge-tts → gTTS → pyttsx3)", "Avatar + slide renderer", "SQLite / Postgres"] }
    ],
    workflow: [
      { t: "Set up", d: "Learner picks a topic or uploads material, and chooses level, language and time budget." },
      { t: "Plan", d: "Material is chunked and retrieved; the LLM drafts a sectioned lesson plan." },
      { t: "Teach", d: "The avatar explains each section, grounded in the retrieved context." },
      { t: "Check", d: "Checkpoint questions are asked and answers are evaluated for misconceptions." },
      { t: "Adapt", d: "Difficulty shifts and weak concepts are re-taught from a different angle." },
      { t: "Assess", d: "A final quiz is graded and a personal report updates the learner profile." }
    ],
    learned: [
      "Designing an LLM app around one interface so providers can be swapped or mocked",
      "Building RAG from scratch and generating video and audio on the server",
      "Scoping a large feature set against a hackathon brief"
    ],
    run: "cd backend && pip install -r requirements.txt && uvicorn app.main:app --reload\ncd frontend && npm install && npm run dev"
  },
  {
    slug: "llm-firewall",
    title: "LLM Firewall & Prompt Injection Shield",
    tagline: "API gateway that scores prompts for injection attacks before they reach an LLM.",
    category: "ai",
    featured: true,
    badge: "Published on RapidAPI",
    stack: ["Python", "FastAPI", "Pydantic", "MongoDB Atlas", "RapidAPI", "Render"],
    repo: GH + "llm-firewall-api",
    live: "https://rapidapi.com/sankarshsreekulam/api/llm-firewall-prompt-injection-shield",
    liveLabel: "API listing",
    overview:
      "A micro-SaaS security layer for apps that use LLMs. Every incoming prompt is checked against known attack patterns (instruction override, role-play jailbreaks, encoded payloads, data extraction), given a threat score, and either allowed or blocked. Every verdict is logged for auditing.",
    problem:
      "Apps that pass user text straight to an LLM can be hijacked with prompts like “ignore previous instructions”. Teams need a simple, fast check they can drop in front of their model.",
    features: [
      "POST /api/v1/analyze returns is_safe, threat_score (0–1) and the exact patterns matched",
      "Pre-compiled regex rules for override, jailbreak, encoding and extraction attacks",
      "Detects alternating-case obfuscation tricks (e.g. “iGnOrE aLl…”)",
      "Every request logged to MongoDB Atlas for security auditing",
      "Proxy-secret check so the backend only accepts traffic routed through RapidAPI (keys, rate limits, plans)"
    ],
    architecture: [
      { name: "Client", nodes: ["Developer app / chatbot"] },
      { name: "Gateway", nodes: ["RapidAPI (API keys, rate limiting, subscription tiers)"] },
      { name: "Service", nodes: ["FastAPI on Render", "Proxy-secret dependency", "Analyze router"] },
      { name: "Engine", nodes: ["InjectionDetector (regex rules + casing heuristic)"] },
      { name: "Storage", nodes: ["MongoDB Atlas · attack_logs"] }
    ],
    workflow: [
      { t: "Request", d: "Client app sends the user's prompt to the RapidAPI endpoint with its API key." },
      { t: "Authenticate", d: "RapidAPI forwards it with a proxy secret; FastAPI rejects anything without the correct secret (401)." },
      { t: "Score", d: "Each matched attack pattern adds 0.4, obfuscated casing adds 0.2; the score is capped at 1.0." },
      { t: "Decide", d: "Score ≥ 0.5 is flagged unsafe; the verdict and matched patterns are returned as JSON." },
      { t: "Audit", d: "The prompt, score and verdict are written to MongoDB without slowing the response if logging fails." }
    ],
    learned: [
      "Securing a public API behind a marketplace gateway",
      "Designing a clear JSON contract with Pydantic models",
      "Keeping the request path resilient when a dependency (database) fails"
    ],
    run: "pip install -r requirements.txt\nuvicorn app.main:app --reload\n# open http://127.0.0.1:8000/docs"
  },
  {
    slug: "diffdocs",
    title: "DiffDocs",
    tagline: "Turns git diffs into clear AI change reports — features, fixes, breaking changes and risk — with a team dashboard.",
    category: "ai",
    featured: true,
    stack: ["FastAPI", "Google Gemini", "Pydantic", "MongoDB Atlas", "GitHub App + OAuth", "Next.js", "Recharts", "Vercel", "Render"],
    repo: GH + "diffdocs",
    live: "https://diffdocs-frontend.vercel.app",
    liveLabel: "Live dashboard",
    links: [
      { label: "Waitlist site", url: "https://sankarsh369.github.io/diffdocs-waitlist/" },
      { label: "Live API", url: "https://diffdocs-backend.onrender.com" }
    ],
    overview:
      "Developers dislike writing PR descriptions, and managers can't read raw diffs. DiffDocs is installed as a GitHub App: on every push or pull request it fetches the real diff, has Gemini produce a structured analysis, caches it in MongoDB, and shows risk trends, per-commit breakdowns and reviewer load on a dashboard behind GitHub sign-in.",
    problem:
      "Changelogs and PR descriptions are often empty or out of date, so stakeholders don't know what actually shipped.",
    features: [
      "Real GitHub App: webhook → installation token → fetch the unified diff from the GitHub API",
      "Gemini analysis with a strict Pydantic schema, so the output is always valid structured JSON",
      "Per-commit cache in MongoDB, with real authors and reviewers pulled from GitHub",
      "Next.js dashboard with risk trends and per-contributor review load",
      "GitHub OAuth sign-in for the dashboard, plus a marketing / waitlist page"
    ],
    architecture: [
      { name: "GitHub", nodes: ["Push / PR event", "GitHub App webhook", "GitHub REST API"] },
      { name: "Backend", nodes: ["FastAPI (Render)", "Webhook handling", "/api/telemetry · /api/team"] },
      { name: "AI", nodes: ["Gemini structured analysis (Pydantic schema)"] },
      { name: "Storage", nodes: ["MongoDB Atlas (analysis cache)"] },
      { name: "Frontend", nodes: ["Next.js dashboard (Vercel)", "GitHub OAuth login", "Waitlist page (GitHub Pages)"] }
    ],
    workflow: [
      { t: "Event", d: "A push or pull request triggers the GitHub App webhook." },
      { t: "Fetch diff", d: "The backend authenticates as the App and fetches the real diff from GitHub." },
      { t: "Cache check", d: "If this commit was analysed before, the cached result is reused." },
      { t: "Analyse", d: "Gemini returns features, bug fixes, refactors, breaking changes and a risk rating." },
      { t: "Store & show", d: "The result is saved with author and reviewer data and visualised on the dashboard." }
    ],
    learned: [
      "GitHub Apps, installation tokens and OAuth",
      "Getting reliable structured output from an LLM",
      "Splitting a product into a backend, a dashboard and a landing page"
    ]
  },
  {
    slug: "ai-news-agent",
    title: "AI News Agent",
    tagline: "Daily automated pipeline that summarises AI news with Gemini and posts it to Telegram & Discord.",
    category: "automation",
    stack: ["Python", "Google Gemini API", "NewsAPI", "Telegram Bot API", "Discord Webhooks", "GitHub Actions"],
    repo: GH + "ai-news-agent",
    live: "https://github.com/Sankarsh369/ai-news-agent/actions",
    liveLabel: "See daily runs",
    liveBadge: "Runs daily",
    overview:
      "A fully hands-off content agent. Every morning a scheduled GitHub Actions job fetches the latest AI headlines, has Gemini rewrite each one as a short, punchy post, cleans the output with a guardrail filter, and delivers it to a Telegram channel and a Discord server.",
    problem:
      "Keeping up with AI news takes time every day. The goal was a zero-maintenance agent that runs in the cloud for free and never needs a server.",
    features: [
      "Runs daily on a cron schedule (and on demand) with GitHub Actions; secrets stored in repo secrets",
      "Model fallback chain across several Gemini models with retries and exponential backoff",
      "Strict prompt layout (hook, value, link) plus a filter that strips chatty LLM filler",
      "Delivery to Telegram (HTML-escaped) and Discord webhooks with retry on network errors"
    ],
    architecture: [
      { name: "Scheduler", nodes: ["GitHub Actions cron (daily) + manual trigger"] },
      { name: "Agent", nodes: ["agent.py — fetch & summarise", "sender.py — delivery with retries"] },
      { name: "External APIs", nodes: ["NewsAPI", "Google Gemini"] },
      { name: "Channels", nodes: ["Telegram Bot", "Discord Webhook"] }
    ],
    workflow: [
      { t: "Trigger", d: "GitHub Actions starts the job every morning and installs dependencies." },
      { t: "Fetch", d: "NewsAPI returns the newest AI articles; the top 3 are kept as title + link." },
      { t: "Summarise", d: "Gemini writes a hook, a one-line ‘why it matters’ and a read-more link; falls back to another model if rate-limited." },
      { t: "Clean", d: "Guardrail filter removes filler lines like “Here is your post”." },
      { t: "Deliver", d: "Posts are sent to Telegram and Discord with automatic retries." }
    ],
    learned: [
      "Building reliable automation on free infrastructure",
      "Handling LLM rate limits with retries, backoff and model fallbacks",
      "Managing API keys safely with CI secrets"
    ],
    run: "pip install -r requirements.txt\n# set NEWS_API_KEY, GEMINI_API_KEY, TELEGRAM_BOT_TOKEN, CHAT_ID, DISCORD_WEBHOOK_URL\npython agent.py"
  },
  {
    slug: "face-attendance",
    title: "Face Recognition Attendance System",
    tagline: "Web app where teachers mark class attendance by scanning faces through the webcam.",
    category: "cv",
    stack: ["Python", "Flask", "OpenCV", "LBPH recognizer", "Haar cascade", "Jinja2", "SMTP"],
    repo: GH + "Face-recognition-attendance-system",
    live: "https://face-recognition-attendance-92yo.onrender.com",
    overview:
      "A school attendance system with separate teacher and principal roles. Teachers register a student's face once, then mark attendance by scanning faces in the browser. The principal manages teachers, students and classes and can review or correct attendance for every class. Demo accounts are listed in the repo README.",
    problem:
      "Manual roll-calls waste class time and are easy to get wrong. Face scanning makes attendance quick and leaves a per-day record for every class.",
    features: [
      "Role-based login for teachers and principal",
      "Face capture for new students; recognition with OpenCV's LBPH model trained per class",
      "Attendance stored per class per day, viewable as records or percentages, and editable",
      "Principal dashboard to manage users, students and class slots",
      "Optional email to parents when a student is marked present"
    ],
    architecture: [
      { name: "Browser", nodes: ["Teacher dashboard (webcam)", "Principal dashboard"] },
      { name: "Flask app", nodes: ["auth routes", "teacher routes", "principal routes"] },
      { name: "Vision", nodes: ["Haar cascade face detection", "LBPH face recognizer"] },
      { name: "Storage", nodes: ["users.csv · students.csv", "faces/{class}/", "attendance/{class}/{date}.csv"] },
      { name: "Notifications", nodes: ["Gmail SMTP (optional)"] }
    ],
    workflow: [
      { t: "Log in", d: "Teacher signs in and picks a class and date." },
      { t: "Capture", d: "Webcam frame is sent to the server; a face is detected with a Haar cascade." },
      { t: "Recognise", d: "LBPH model trained on that class's stored photos identifies the student." },
      { t: "Record", d: "Student is marked present in the class/date CSV; parent email is sent if configured." },
      { t: "Review", d: "Teachers and the principal view percentages and fix records when needed." }
    ],
    learned: [
      "Trade-offs between accuracy and deployability (moved from dlib to LBPH to run on free hosting)",
      "Role-based access in a Flask app",
      "Designing simple, inspectable file-based storage"
    ],
    run: "pip install -r requirements.txt\npython app.py"
  },
  {
    slug: "health-care-center",
    title: "Health Care Center — Disease Predictor",
    tagline: "Predicts a likely disease from symptoms and suggests precautions, medicines, diet and workouts.",
    category: "ml",
    stack: ["Python", "scikit-learn (SVC)", "Pandas", "Flask", "Bootstrap", "Web Speech API"],
    repo: GH + "Health_Care_center",
    links: [{ label: "View notebook", url: "https://nbviewer.org/github/Sankarsh369/Health_Care_center/blob/main/Medicine%20Recommendation%20System.ipynb" }],
    overview:
      "A Flask web app backed by a Support Vector Classifier trained on 4,920 records covering 132 symptoms and 41 diseases. Users type or speak their symptoms and get the predicted condition with a description and recommended precautions, medications, diets and workouts.",
    problem:
      "People often search symptoms with no structure. This project turns symptom input into a structured prediction with practical next-step guidance (educational, not medical advice).",
    features: [
      "Symptom autocomplete drawn from the trained model's vocabulary",
      "Voice input using browser speech recognition",
      "Prediction plus description, precautions, medications, diet and workout suggestions",
      "Custom 404/500 pages and a /health endpoint for uptime checks",
      "Notebook covering EDA and comparison of several classifiers"
    ],
    architecture: [
      { name: "Frontend", nodes: ["Jinja2 + Bootstrap pages", "Speech-to-text (JS)"] },
      { name: "Server", nodes: ["Flask · /predict", "Gunicorn"] },
      { name: "Model", nodes: ["SVC model (svc.pkl)", "Symptom → feature vector"] },
      { name: "Knowledge base", nodes: ["description · precautions · medications · diets · workouts CSVs"] }
    ],
    workflow: [
      { t: "Input", d: "User enters or speaks symptoms, e.g. “itching, skin rash”." },
      { t: "Encode", d: "Symptoms are mapped to a 132-length binary vector." },
      { t: "Predict", d: "The trained SVC returns the most likely of 41 diseases." },
      { t: "Enrich", d: "Disease is looked up in the CSV knowledge base for details and recommendations." },
      { t: "Display", d: "Results are shown in tabs: description, precautions, medications, diet, workouts." }
    ],
    learned: [
      "End-to-end ML: training in a notebook, serialising the model and serving it in a web app",
      "Cleaning list-like CSV fields and handling unknown inputs safely"
    ],
    run: "pip install -r requirements.txt\npython main.py"
  },
  {
    slug: "document-scanner",
    title: "Digital Document Scanner",
    tagline: "Turns skewed, shadowed phone photos of documents into clean, flat scans.",
    category: "cv",
    stack: ["Python", "OpenCV", "NumPy", "Flask"],
    repo: GH + "digital-document-scanner",
    live: "https://digital-document-scanner.onrender.com",
    overview:
      "Upload a photo of a page and get a clean black-and-white scan back. The app finds the paper's edges, corrects the perspective to a top-down view and applies thresholding to remove shadows. Works as both a CLI tool and a web demo.",
    problem:
      "Phone photos of notes and receipts are tilted, shadowed and low-contrast, which makes them hard to read or print.",
    features: [
      "Automatic paper detection with Canny edges and contour analysis",
      "Perspective (homography) transform to a flat, bird's-eye view",
      "Adaptive, Otsu or simple thresholding",
      "Debug mode showing each intermediate step",
      "Web demo with in-memory results and download"
    ],
    architecture: [
      { name: "Interfaces", nodes: ["Flask web app (upload)", "CLI (document_scanner.py)"] },
      { name: "Detection", nodes: ["Grayscale + Gaussian blur", "Canny edges + dilation", "Largest 4-point contour"] },
      { name: "Correction", nodes: ["Order corners", "Perspective warp"] },
      { name: "Enhancement", nodes: ["Adaptive / Otsu / simple threshold"] }
    ],
    workflow: [
      { t: "Upload", d: "User uploads a JPG/PNG/WEBP photo (max 12 MB)." },
      { t: "Find edges", d: "Image is blurred and edge-detected to outline the paper." },
      { t: "Locate page", d: "The largest four-cornered contour is taken as the document." },
      { t: "Flatten", d: "Corners are ordered and warped to a straight, top-down view." },
      { t: "Scan effect", d: "Thresholding produces a crisp, high-contrast result to view or download." }
    ],
    learned: [
      "Classic computer-vision pipeline design",
      "Wrapping a CLI tool in a web app without duplicating logic"
    ],
    run: "pip install -r requirements.txt\npython document_scanner.py --image photo.jpg --debug"
  },
  {
    slug: "voice-shopping",
    title: "Basket — Voice Shopping Assistant",
    tagline: "Speak in 7 languages to build a shopping list with prices, a GST receipt and smart suggestions.",
    category: "ai",
    stack: ["React", "Vite", "Tailwind CSS", "Web Speech API", "FastAPI", "SQLite", "Docker"],
    repo: GH + "voice-shopping-assistant",
    live: "https://voice-shopping-assistant-orcin.vercel.app",
    overview:
      "A voice-first shopping list. Say things like “add two bottles of milk and bread” in English, Hindi, Spanish, French, German, Portuguese or Bengali. A custom NLP engine works out the intent, items and quantities, matches them to a priced catalog and replies by voice in the same language. It shows a receipt with GST, live stock, and suggestions based on your own history.",
    problem:
      "Typing lists on a phone is slow, and most voice assistants only work well in English.",
    features: [
      "Intent parsing for add, remove, search, bill, suggest and clear — in 7 languages",
      "Multi-item commands (“milk and bread”) and de-duplication by catalog product",
      "Unicode-safe text handling so Devanagari, Bengali and other scripts aren't mangled",
      "Receipt with item prices, subtotal, GST and total in ₹",
      "Complementary, seasonal and history-based suggestions",
      "Sign up, log in or continue as guest, with per-user lists"
    ],
    architecture: [
      { name: "Browser", nodes: ["React + Vite SPA (Vercel)", "Speech recognition (STT)", "Speech synthesis (TTS)"] },
      { name: "API", nodes: ["FastAPI /command endpoint", "Auth", "Catalog & list CRUD"] },
      { name: "Language", nodes: ["NLP engine (intent, item, qty, unit)", "Localised replies (7 languages)"] },
      { name: "Logic", nodes: ["Suggestion engine", "Receipt / GST calculator"] },
      { name: "Data", nodes: ["SQLite (Postgres-ready)", "Seeded product catalog"] }
    ],
    workflow: [
      { t: "Speak", d: "User taps the mic and speaks a command in their language." },
      { t: "Transcribe", d: "The browser turns speech into text and sends it with the selected language." },
      { t: "Understand", d: "NLP engine detects the intent and extracts each item, quantity and unit." },
      { t: "Act", d: "Items are matched to the catalog, de-duplicated and saved — or a bill / suggestions are returned." },
      { t: "Reply", d: "The list updates and the assistant answers out loud in the same language." }
    ],
    learned: [
      "Writing a rule-based multilingual NLP parser and debugging Unicode issues",
      "Fixing real user-reported bugs in a second version",
      "Containerising a full-stack app with Docker Compose"
    ],
    run: "docker compose up --build"
  },
  {
    slug: "ai-assistant-site",
    title: "AI Assistant Website",
    tagline: "Next.js product site with a working AI chat widget powered by Groq.",
    category: "web",
    stack: ["Next.js", "TypeScript", "Tailwind CSS", "Framer Motion", "Groq API", "Vercel"],
    repo: GH + "my-ai-assistant-site",
    live: "https://my-ai-assistant-site.vercel.app",
    overview:
      "A multi-page landing site (features, pricing, FAQ, contact) for a personal AI assistant, with a real chat widget. Messages go through a Next.js API route that calls Groq's OpenAI-compatible chat API, so the API key never reaches the browser.",
    problem:
      "Most landing pages only describe a product. This one lets visitors actually try the assistant, while keeping secrets server-side.",
    features: [
      "App Router pages with animated sections",
      "Floating chat widget with per-session conversation history",
      "Server route validates input length and trims history before calling the model",
      "Clear fallback message when the API key isn't configured"
    ],
    architecture: [
      { name: "Client", nodes: ["Next.js pages", "ChatWidget component"] },
      { name: "Server", nodes: ["POST /api/chat (Node runtime)", "Input validation & history limit"] },
      { name: "Model", nodes: ["Groq Chat Completions (GPT-OSS-20B default)"] },
      { name: "Hosting", nodes: ["Vercel"] }
    ],
    workflow: [
      { t: "Message", d: "Visitor types a message in the chat widget." },
      { t: "API route", d: "Browser posts the message and recent history to /api/chat." },
      { t: "Validate", d: "Server checks length, keeps the last 12 turns and adds a system prompt." },
      { t: "Generate", d: "Groq returns the assistant's reply." },
      { t: "Render", d: "Reply appears in the widget; history stays in the browser tab." }
    ],
    learned: [
      "Next.js App Router and server routes",
      "Keeping API keys server-side and validating user input"
    ],
    run: "npm install\nnpm run dev"
  },
  {
    slug: "etl-pipeline",
    title: "Retail Data ETL Pipeline",
    tagline: "Tested Python pipeline that extracts retail CSVs, validates them and loads Parquet or SQL.",
    category: "data",
    stack: ["Python", "Pandas", "SQLAlchemy", "Parquet", "JSON Schema", "pytest", "GitHub Actions"],
    repo: GH + "ETL",
    overview:
      "An extract → transform → load pipeline for five retail datasets (products, categories, sales, stores, warranty). Each source has its own extractor and transformer with JSON-schema validation, and the CLI loads results to Parquet files or any SQL database, with upsert support.",
    problem:
      "Raw CSV exports are messy and inconsistent. Analysts need clean, validated tables they can trust.",
    features: [
      "Modular extract / transform / load packages per source",
      "JSON schemas for validation and normalisation",
      "Parquet output or SQL load (SQLite / PostgreSQL) via SQLAlchemy",
      "Upsert logic per database dialect",
      "Dry-run preview, pytest suite and CI on every push"
    ],
    architecture: [
      { name: "Sources", nodes: ["products.csv", "categories.csv", "sales.csv", "stores.csv", "warranty.csv"] },
      { name: "Extract", nodes: ["Per-source extractors"] },
      { name: "Transform", nodes: ["Normalisation", "JSON-schema validation"] },
      { name: "Load", nodes: ["Parquet writer", "SQL loader (append / upsert)"] },
      { name: "Quality", nodes: ["pytest", "GitHub Actions CI"] }
    ],
    workflow: [
      { t: "Choose", d: "Run the CLI for one source or all, choosing Parquet or DB output." },
      { t: "Extract", d: "CSV is read into a DataFrame." },
      { t: "Transform", d: "Columns are cleaned, typed and validated against the schema." },
      { t: "Load", d: "Data is written to Parquet folders or inserted into SQL tables in a transaction." },
      { t: "Verify", d: "Tests run in CI on every push and pull request." }
    ],
    learned: [
      "Structuring a data project as a testable Python package",
      "Database-agnostic loading with SQLAlchemy"
    ],
    run: "pip install -r requirements.txt\npython -m etl_project.pipeline.run_pipeline --to parquet --out ./out_data\npytest -q"
  },
  {
    slug: "wine-classifier",
    title: "Wine Type Classifier",
    tagline: "Predicts red vs. white wine from 12 lab measurements, with a live prediction form.",
    category: "ml",
    stack: ["Python", "Pandas", "Keras", "scikit-learn", "Matplotlib", "Flask"],
    repo: GH + "Wine_Testing",
    live: "https://wine-type-classifier.onrender.com",
    links: [{ label: "View notebook", url: "https://nbviewer.org/github/Sankarsh369/Wine_Testing/blob/main/wine_testing.ipynb" }],
    overview:
      "Uses the UCI Wine Quality dataset (~6,500 wines). The notebook explores the data and trains a Keras neural network; the deployed app trains a RandomForest at startup and serves a form that returns a red/white prediction with confidence.",
    problem:
      "A beginner-friendly classification task used to practise the full flow from EDA to a deployed model.",
    features: [
      "EDA of physicochemical features such as alcohol and acidity",
      "Keras model with accuracy, classification report and confusion matrix",
      "Lightweight RandomForest model for fast deployment",
      "Prediction form with pre-filled sample values"
    ],
    architecture: [
      { name: "Research", nodes: ["Jupyter notebook", "Keras neural network"] },
      { name: "Web app", nodes: ["Flask form", "Gunicorn on Render"] },
      { name: "Model", nodes: ["RandomForest (200 trees) trained at startup"] },
      { name: "Data", nodes: ["winequality-red.csv", "winequality-white.csv"] }
    ],
    workflow: [
      { t: "Load", d: "Red and white datasets are merged and labelled." },
      { t: "Split", d: "Stratified 80/20 train-test split." },
      { t: "Train", d: "Model is fitted and test accuracy logged." },
      { t: "Predict", d: "User submits measurements and gets a label with confidence." }
    ],
    learned: [
      "Choosing a simpler model for deployment vs. experimentation",
      "Evaluating classifiers beyond plain accuracy"
    ],
    run: "cd webapp\npip install -r requirements.txt\npython app.py"
  },
  {
    slug: "todo-app",
    title: "To-Do List App",
    tagline: "Task manager with categories, due dates and overdue alerts — desktop and web versions.",
    category: "web",
    stack: ["Python", "Tkinter", "Flask", "JSON storage"],
    repo: GH + "To-Do-List-App",
    live: "https://todo-list-app-web.onrender.com",
    overview:
      "Started as a Tkinter desktop app and extended with a Flask web version that reuses the same TaskManager data layer. Tasks have unique IDs, timestamps, categories and due dates, with filtering, sorting and overdue highlighting.",
    problem:
      "Practice project focused on clean separation between data logic and UI, so one model can power two different interfaces.",
    features: [
      "Add, complete and delete tasks with unique IDs and timestamps",
      "Categories, due dates and overdue highlighting",
      "Filter by category, sort by date, due date, description or status",
      "Persistent JSON storage; shared logic between desktop and web"
    ],
    architecture: [
      { name: "Interfaces", nodes: ["Tkinter GUI (desktop)", "Flask + Jinja2 (web)"] },
      { name: "Logic", nodes: ["TaskManager (shared)"] },
      { name: "Storage", nodes: ["tasks.json"] }
    ],
    workflow: [
      { t: "Add", d: "User enters a description, category and optional due date." },
      { t: "Save", d: "TaskManager assigns an ID and timestamp and writes to JSON." },
      { t: "View", d: "Tasks are filtered, sorted and overdue items highlighted." },
      { t: "Update", d: "Toggling or deleting a task updates the same JSON file." }
    ],
    learned: ["Separating business logic from UI", "Reusing one data layer across two interfaces"],
    run: "python main.py            # desktop\ncd webapp && python app.py  # web"
  },
  {
    slug: "employee-data-cleaning",
    title: "Messy Employee Data Cleaning",
    tagline: "Pandas notebook that turns a messy HR dataset into a clean, analysis-ready table.",
    category: "data",
    stack: ["Python", "Pandas", "Jupyter"],
    repo: GH + "Messy-Employee-Dataset",
    links: [{ label: "View notebook", url: "https://nbviewer.org/github/Sankarsh369/Messy-Employee-Dataset/blob/main/scripts/data_cleaning.ipynb" }],
    overview:
      "A data-wrangling exercise on a deliberately messy employee dataset: fixing types, parsing dates, normalising booleans, filling missing values and splitting combined columns, then exporting a clean CSV.",
    problem: "Real-world data is rarely clean; this project practises the cleaning steps that come before any analysis or ML.",
    features: [
      "Convert Salary and Age to numeric",
      "Parse Join_Date as datetime and normalise Remote_Work to boolean",
      "Fill missing Status and Performance_Score values",
      "Split Department_Region into two columns and clean phone numbers"
    ],
    architecture: [
      { name: "Input", nodes: ["Messy_Employee_dataset.csv"] },
      { name: "Processing", nodes: ["data_cleaning.ipynb (Pandas)"] },
      { name: "Output", nodes: ["clean_dataset_output.csv"] }
    ],
    workflow: [
      { t: "Profile", d: "Inspect types, nulls and inconsistent formats." },
      { t: "Fix types", d: "Numeric, date and boolean conversions." },
      { t: "Impute", d: "Fill or flag missing values." },
      { t: "Restructure", d: "Split combined fields and clean text." },
      { t: "Export", d: "Save the cleaned dataset." }
    ],
    learned: ["Systematic data profiling and cleaning with Pandas"]
  },
  {
    slug: "skill-spot",
    title: "Skill Spot",
    tagline: "Frontend prototype of a platform that matches people to small jobs based on skills and quizzes.",
    category: "web",
    stack: ["HTML", "CSS", "JavaScript"],
    repo: GH + "Skill_Spot",
    overview:
      "A multi-page UI prototype: sign-up and login, skill quizzes (web developer, delivery services, event organiser, animal care), daily quizzes, leaderboard, level status, profile and job prototypes with a mock UPI payment flow.",
    problem:
      "Students and freshers struggle to get first experience. The idea: prove skills through quizzes, then unlock small paid tasks.",
    features: [
      "Sign-up, login and profile pages",
      "Role-specific skill quizzes and daily quizzes",
      "Leaderboard and level progression screens",
      "Job prototype pages with a mock payment and success flow"
    ],
    architecture: [
      { name: "Pages", nodes: ["Auth", "Quizzes", "Leaderboard & levels", "Jobs & payment mock"] },
      { name: "Styling", nodes: ["Custom CSS"] }
    ],
    workflow: [
      { t: "Sign up", d: "User creates a profile." },
      { t: "Take quiz", d: "User proves a skill through a role-specific quiz." },
      { t: "Level up", d: "Scores feed the leaderboard and level status." },
      { t: "Pick a job", d: "User browses job prototypes and completes a mock payment flow." }
    ],
    learned: ["Designing user flows across many screens", "Translating an idea into a clickable prototype"]
  }
];

const CATEGORIES = {
  all: "All",
  ai: "AI & LLM",
  ml: "Machine Learning",
  cv: "Computer Vision",
  data: "Data Engineering",
  automation: "Automation",
  web: "Web"
};
