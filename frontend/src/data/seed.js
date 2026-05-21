// Mock data for Hanggangdrawing — your friend group's study app.

export const AVATAR_COLORS = [
  "#B8553A", "#6E7B4F", "#C9924A", "#8A3E58", "#5C7B8A",
  "#A05A3B", "#7B6E4F", "#946C8E", "#4F7B6E", "#C46B4A",
  "#8E7AAA", "#6A8E5C", "#B8895A", "#7A5A6E", "#5A7A8E",
  "#A87B4A", "#6E4F7B", "#946E5A", "#5A946E",
];

export const FRIENDS = [
  { id: "haddy",   name: "Haddy",   role: "Civil Service prep" },
  { id: "edres",   name: "Edres",   role: "Backend lead" },
  { id: "jho",     name: "Jho",     role: "Frontend / UI" },
  { id: "abdensa", name: "Abdensa", role: "Algorithms" },
  { id: "hero",    name: "Hero",    role: "DevOps & deploys" },
  { id: "khim",    name: "Khim",    role: "Notes archivist" },
  { id: "yasser",  name: "Yasser",  role: "Data structures" },
  { id: "basam",   name: "Basam",   role: "Quiz master" },
  { id: "qais",    name: "Qais",    role: "Python guild" },
  { id: "moain",   name: "Moain",   role: "Networking" },
  { id: "tocalo",  name: "Tocalo",  role: "Math drills" },
  { id: "zainab",  name: "Zainab",  role: "Logic puzzles" },
  { id: "rhana",   name: "Rhana",   role: "Vocabulary" },
  { id: "haron",   name: "Haron",   role: "Code reviewer" },
  { id: "norj",    name: "Norj",    role: "Database" },
  { id: "jhums",   name: "Jhums",   role: "Pomodoro captain" },
  { id: "huamza",  name: "Huamza",  role: "Mock exams" },
  { id: "waren",   name: "Waren",   role: "Cheerleader" },
  { id: "basty",   name: "Basty",   role: "Group historian" },
].map((f, i) => ({ ...f, color: AVATAR_COLORS[i % AVATAR_COLORS.length] }));

export const initialsOf = (name) => {
  const parts = name.trim().split(/\s+/);
  return (parts[0][0] + (parts[1]?.[0] || "")).toUpperCase();
};

export const findFriend = (id) => FRIENDS.find((f) => f.id === id) || FRIENDS[0];

// Default mock user used when someone signs in — until backend exists.
export const DEFAULT_USER_ID = "jho";

// Timeline posts (reactions are stored as { emoji: count } so they render with the emoji)
export const POSTS = [
  {
    id: "p1",
    author: "jhums",
    time: "12 min ago",
    kind: "milestone",
    title: "Day 14 of the streak 🌱",
    body: "Pomodoro count is at 86 sessions this month. We are SO close to the May goal.",
    reactions: { "🔥": 7, "📚": 3, "🌱": 4 },
    comments: 3,
  },
  {
    id: "p2",
    author: "edres",
    time: "1 hr ago",
    kind: "post",
    title: "Pushed the auth route to main",
    body: "FastAPI + JWT is alive. Took a sec but the Swagger docs render now. Reviews welcome 🙏",
    tag: "code",
    reactions: { "✅": 5, "🚀": 2 },
    comments: 4,
  },
  {
    id: "p3",
    author: "rhana",
    time: "3 hr ago",
    kind: "study",
    title: "New deck: Civil Service — English Vocab (Set 4)",
    body: "42 cards. Mostly the words that always trip me up. Run it on the bus 🚌",
    tag: "flashcards",
    reactions: { "🧠": 6, "📖": 2 },
    comments: 1,
  },
  {
    id: "p4",
    author: "huamza",
    time: "Yesterday",
    kind: "exam",
    title: "Mock exam result: 78 / 100",
    body: "Math section pulled me down. We should drill word problems next session. Who's in?",
    tag: "results",
    reactions: { "💪": 9, "📈": 4 },
    comments: 7,
  },
  {
    id: "p5",
    author: "waren",
    time: "Yesterday",
    kind: "post",
    title: "Sunday review session — 4pm at the library",
    body: "Bringing snacks. The good ones, not the suman from last time (sorry Norj).",
    reactions: { "🥐": 5, "❤️": 6 },
    comments: 5,
  },
];

// Chat messages
export const SEED_MESSAGES = [
  { id: "m1", author: "haron",  time: "9:12", text: "did anyone finish problem 7 from the data structures set" },
  { id: "m2", author: "yasser", time: "9:13", text: "yep used a heap, will push later today" },
  { id: "m3", author: "haron",  time: "9:13", text: "ahhh i was using a sorted list 💀" },
  { id: "m4", author: "basam",  time: "9:15", text: "lol that's still O(n log n) on insert tho", reactions: { "😂": 3 } },
  { id: "m5", author: "haron",  time: "9:16", text: "fine fine. dropping a quiz tonight on heaps if anyone wants in" },
  { id: "m6", author: "jho",    time: "9:18", text: "in 🙋 also the new UI is on figma if y'all want to peek" },
  { id: "m7", author: "zainab", time: "9:20", text: "@jho the empty state on flashcards is so cute" },
  { id: "m8", author: "jho",    time: "9:21", text: "🥹 thanks zai" },
  { id: "m9", author: "jhums",  time: "now",  text: "pomodoro starting in 5. who's joining?" },
];

// Polls
export const SEED_POLLS = [
  {
    id: "pl1",
    author: "basty",
    time: "2 hr ago",
    question: "Next mock exam topic?",
    options: [
      { id: "a", label: "English Vocab",       votes: ["rhana", "khim", "waren"] },
      { id: "b", label: "Math Word Problems",  votes: ["huamza", "tocalo", "edres", "qais", "haddy"] },
      { id: "c", label: "Logical Reasoning",   votes: ["zainab", "abdensa"] },
      { id: "d", label: "General Information", votes: ["moain", "basam"] },
    ],
    closesIn: "2 days",
  },
  {
    id: "pl2",
    author: "jhums",
    time: "Yesterday",
    question: "Best time for the daily pomodoro?",
    options: [
      { id: "a", label: "6:00 AM (early bird)", votes: ["jhums", "tocalo"] },
      { id: "b", label: "9:00 PM (after work)", votes: ["edres", "jho", "yasser", "qais", "basam", "haron", "norj", "zainab"] },
      { id: "c", label: "Both — split sessions", votes: ["waren", "basty", "haddy"] },
    ],
    closesIn: "Closes today",
  },
  {
    id: "pl3",
    author: "waren",
    time: "3 days ago",
    question: "Snack budget per session?",
    options: [
      { id: "a", label: "₱50 each",  votes: ["haddy", "edres", "moain"] },
      { id: "b", label: "₱100 each", votes: ["waren", "rhana", "jho", "khim", "jhums", "qais"] },
      { id: "c", label: "Bring your own", votes: ["abdensa"] },
    ],
    closesIn: "Closed",
  },
];

// Flashcard decks
export const DECKS = [
  {
    id: "d1",
    title: "Python — Basics",
    subtitle: "List comprehensions, dict tricks, common pitfalls",
    color: "#6E7B4F",
    owner: "qais",
    cards: [
      { q: "What does `enumerate(lst)` return?", a: "An iterator of (index, value) pairs." },
      { q: "Difference between `is` and `==`?", a: "`is` compares identity (same object). `==` compares value (equality)." },
      { q: "Default value of a function arg should never be...", a: "...a mutable object (like `[]` or `{}`) — it persists across calls." },
      { q: "What is a list comprehension for squares of 0–4?", a: "[x**2 for x in range(5)]  →  [0, 1, 4, 9, 16]" },
      { q: "How do you swap two variables in one line?", a: "a, b = b, a" },
    ],
  },
  {
    id: "d2",
    title: "Civil Service — English Vocab",
    subtitle: "Set 4 · synonyms & idioms",
    color: "#B8553A",
    owner: "rhana",
    cards: [
      { q: "Ubiquitous", a: "Present, appearing, or found everywhere." },
      { q: "Ephemeral", a: "Lasting for a very short time." },
      { q: "Pragmatic", a: "Dealing with things sensibly and realistically." },
      { q: "Quintessential", a: "Representing the most perfect example of a quality or class." },
    ],
  },
  {
    id: "d3",
    title: "FastAPI Routes",
    subtitle: "Decorators, dependencies, async",
    color: "#C9924A",
    owner: "edres",
    cards: [
      { q: "Decorator to register a GET endpoint on /users", a: "@app.get(\"/users\")" },
      { q: "How do you mark a route as async?", a: "Use `async def` instead of `def`." },
      { q: "How do you read a query param `q: str = None`?", a: "Declare it as a function arg with a default — FastAPI infers it." },
    ],
  },
  {
    id: "d4",
    title: "Math — Word Problems",
    subtitle: "Ratio, work, mixture",
    color: "#8A3E58",
    owner: "huamza",
    cards: [
      { q: "If 3 painters finish a wall in 6 hrs, how long for 2?", a: "9 hours. (work = painters × time)" },
      { q: "Ratio of 12:18 in simplest form?", a: "2 : 3" },
    ],
  },
];

export const findDeck = (id) => DECKS.find((d) => d.id === id) || DECKS[0];

// Notes
export const NOTES = [
  {
    id: "n1",
    title: "Sprint 3 plan — Chat feature",
    author: "edres",
    edited: "Edited 2h ago",
    pinned: true,
    body: [
      "## Goals",
      "- WebSocket route at /ws/{room_id}",
      "- Persist messages to Postgres",
      "- Show typing indicator (nice-to-have)",
      "",
      "## Tasks",
      "- [x] Auth middleware reuse",
      "- [x] Connection manager class",
      "- [ ] Message schema (Pydantic)",
      "- [ ] Frontend WS client",
      "",
      "## Notes from review",
      "Hero suggested using Redis pub/sub if we ever shard. Overkill for 19 of us — defer.",
    ].join("\n"),
  },
  {
    id: "n2",
    title: "Civil Service — high-frequency words",
    author: "rhana",
    edited: "Edited yesterday",
    body: [
      "Words that show up almost every test cycle.",
      "",
      "1. Ubiquitous",
      "2. Ephemeral",
      "3. Pragmatic",
      "4. Quintessential",
      "5. Mitigate",
      "6. Innocuous",
      "",
      "Drill these before anything else.",
    ].join("\n"),
  },
  {
    id: "n3",
    title: "Saturday meetup — checklist",
    author: "waren",
    edited: "Edited 3d ago",
    body: [
      "## Bring",
      "- Laptops (charged!)",
      "- Mock exam printouts x19",
      "- Snacks (budget ₱100 ea — see poll)",
      "",
      "## Skip",
      "- Loud speaker (last time was chaos)",
    ].join("\n"),
  },
];

// Album
export const ALBUM = [
  { id: "a1", label: "Saturday review · group",   tone: ["#b8553a", "#d97a5c"], poster: "waren" },
  { id: "a2", label: "Edres' whiteboard",         tone: ["#6e7b4f", "#93a072"], poster: "edres" },
  { id: "a3", label: "Coffee + notebooks",        tone: ["#c9924a", "#e0b06b"], poster: "khim" },
  { id: "a4", label: "Pomodoro corner",           tone: ["#8a3e58", "#a85e78"], poster: "jhums" },
  { id: "a5", label: "Library — 2nd floor",       tone: ["#5c7b8a", "#7a99a8"], poster: "haron" },
  { id: "a6", label: "Suman incident (RIP)",      tone: ["#a05a3b", "#c2724a"], poster: "norj" },
  { id: "a7", label: "Mock exam #4 results",      tone: ["#7b6e4f", "#9c8d6c"], poster: "huamza" },
  { id: "a8", label: "Jho's whiteboard sketch",   tone: ["#946c8e", "#b48cac"], poster: "jho" },
  { id: "a9", label: "Birthday — Basty",          tone: ["#b8553a", "#c9924a"], poster: "basty" },
];

// Studying-now
export const STUDYING_NOW = [
  { id: "jhums",  topic: "Flashcards · Vocab",   minLeft: 18 },
  { id: "edres",  topic: "Coding · FastAPI",     minLeft: 12 },
  { id: "rhana",  topic: "Reading · English",    minLeft: 22 },
  { id: "tocalo", topic: "Math drills",          minLeft: 7  },
  { id: "zainab", topic: "Logic puzzles",        minLeft: 25 },
];

// Co-study rooms (used inside Pomodoro)
export const STUDY_ROOMS = [
  {
    id: "r1",
    name: "Algo grind",
    topic: "Data structures · heaps & graphs",
    host: "yasser",
    members: ["yasser", "haron", "abdensa", "zainab"],
    minLeft: 18,
    accent: "var(--accent)",
  },
  {
    id: "r2",
    name: "Vocab cabin",
    topic: "Civil Service · English drill",
    host: "rhana",
    members: ["rhana", "khim", "waren"],
    minLeft: 22,
    accent: "var(--sage)",
  },
  {
    id: "r3",
    name: "FastAPI lab",
    topic: "Building the chat WebSocket",
    host: "edres",
    members: ["edres", "qais", "jho"],
    minLeft: 7,
    accent: "var(--ochre)",
  },
];

// Kanban — tasks for the project itself
export const SEED_TASKS = {
  todo: [
    { id: "t1", title: "WebSocket route for chat", tag: "code",     assignee: "edres",   prio: "high" },
    { id: "t2", title: "Civil Service vocab set 5", tag: "study",    assignee: "rhana",   prio: "med" },
    { id: "t3", title: "Design empty-state for Album", tag: "design", assignee: "jho",     prio: "low" },
    { id: "t4", title: "Migrate to PostgreSQL",     tag: "infra",    assignee: "hero",    prio: "med" },
  ],
  doing: [
    { id: "t5", title: "JWT auth middleware",       tag: "code",     assignee: "edres",   prio: "high" },
    { id: "t6", title: "Pomodoro session storage",  tag: "code",     assignee: "jhums",   prio: "med" },
    { id: "t7", title: "Mock exam #5 — Math",       tag: "study",    assignee: "huamza",  prio: "high" },
  ],
  done: [
    { id: "t8", title: "Repo + CI setup",           tag: "infra",    assignee: "hero",    prio: "high" },
    { id: "t9", title: "Login UI",                  tag: "design",   assignee: "jho",     prio: "med" },
    { id: "t10", title: "Database schema v1",       tag: "code",     assignee: "norj",    prio: "med" },
    { id: "t11", title: "Sunday review session",    tag: "meet",     assignee: "waren",   prio: "low" },
  ],
};

export const TAG_TONES = {
  code:   "terra",
  design: "berry",
  study:  "sage",
  infra:  "ochre",
  meet:   "default",
};
