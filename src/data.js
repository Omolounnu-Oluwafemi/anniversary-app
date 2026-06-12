// ─────────────────────────────────────────────
//  PERSONALISE EVERYTHING HERE
// ─────────────────────────────────────────────

const base = import.meta.env.BASE_URL;

export const names = {
  yours: "Oluwafemi",
  hers:  "Oluwatoyosi",
};

export const anniversaryDate = "June 12, 2025 — June 12, 2026";

export const letter = `A year ago, something shifted — quietly, gently, the way sunlight moves across a room without you noticing until everything looks different.

That's what you did. You didn't announce yourself. You just became the best part of my every single day.

I have watched you laugh until you couldn't breathe. Seen the way your eyes go somewhere else when you're lost in a thought. Felt the weight of your hand in mine on ordinary evenings — and understood, again and again, that this is the one thing I never want to take for granted.

You are my home.

Not a place. Not a routine. You — the actual, living, impossible-to-describe you — are where I feel most like myself.

This year has not been perfect. But every imperfect moment was made bearable, even beautiful, because you were in it. I would choose every single one again, a thousand times, just to end up here — with you reading this.

Thank you for your patience. For your laughter. For choosing me back, every single morning.

Happy one year, my love.

I am so, so lucky.`;

export const timeline = [
  {
    label: "The beginning",
    event: "The day we met 💫",
    detail: "After the long talk we had on the phone that might you called, I know you probably don't remember this, but I do. The next meeting was physical. Already late, I rushed in and saw the gentle lady standiing there with Mr A. Calm, Collected, Brilliant and Beautiful, but so intentional and down to earth. I just knew you were someone special and we would get along just fine. I was right. And here we are, a year later, still getting along just fine, and loving each other more every day.",
    video: 'photos/Day6.mp4', 
  },
  {
    label: "First date",
    event: "When I knew 🌙",
    detail: "We had talked on phone for almost throughtout the year (2024). Those late nights talk that we had to turn to prayer sessions 😂 And those times we would meet and we act like complete strangers. But Maryland Mall changed everything. We talked, laughed and really bonded. Really, the feeling that was growing became so sharp and certain. You would be mine 😎",
    video: 'photos/Day1.mp4', 
  },
  {
    label: "The question",
    event: "When I asked you to be mine 💍",
    detail: "After the whole drama, I finally got the courage to ask you to be mine. I was so nervous, but it had to be said. Truth be told, the look on your face almost made me forget my own name. But a man gatta be tough.",
    video: 'photos/Day2.mp4', 
  },
  {
    label: "The Response",
    event: "I do ❤️",
    detail: "Nice game you played on me that day. I was not expecting that at all. But I loved it. I loved you. And I still do, more than ever.",
    video: 'photos/Day4.mp4', 
  },
  {
    label: "Tough times",
    event: "When we chose each other anyway 🤝",
    detail: "Every arguments, every disagreement, every tough moment we had this year was a choice. A choice to understand, to forgive, to grow, to love. And we made that choice, again and again. That's what makes us us.",
    video: 'photos/Day3.mp4', 
  },
  {
    label: "June 12, 2026",
    event: "One whole year 🎉",
    detail: "Today. A year of choosing each other, every single day. And this is only the beginning.",
    video: 'photos/Day5.mp4', 
  },
];

// One photo per month — place images in /public/photos/
export const photos = [
  { src: `${base}photos/June.png`,     month: 'June 2025',      caption: 'The beginning ♥' },
  { src: `${base}photos/July.png`,     month: 'July 2025',      caption: '', },
  { src: null,                          month: 'August 2025',    caption: '', apology: "No photo could have captured what this month felt like. You would have to be there — and you were." },
  { src: `${base}photos/September.png`,month: 'September 2025', caption: '' },
  { src: `${base}photos/October.JPG`,  month: 'October 2025',   caption: '' },
  { src: `${base}photos/November.png`, month: 'November 2025',  caption: '',  },
  { src: `${base}photos/December.png`, month: 'December 2025',  caption: '' },
  { src: `${base}photos/January.jpg`,  month: 'January 2026',   caption: '' },
  { src: `${base}photos/Feburary.png`, month: 'February 2026',  caption: '' },
  { src: null,                          month: 'March 2026',     caption: '', apology: "I don't have a photo from this month — but I have every feeling from it still perfectly stored in my heart."},
  { src: `${base}photos/April.png`,    month: 'April 2026',     caption: '' },
  { src: `${base}photos/May.png`,      month: 'May 2026',       caption: 'Almost there ♥' },
];

// 30 days of love — one note per day of the month
export const reasons = [
  { day: 1,  note: "Today I woke up and my first thought was you. Not a choice — it just happened, like sunrise. I think that is what love does. It rearranges the order of things." },
  { day: 2,  note: "You laughed at something I said that wasn't even that funny. But you laughed anyway, with your whole face. I am keeping that." },
  { day: 3,  note: "I find myself paying attention to the small things now — the way you hold your cup, the pause before you speak, the look in your eyes when something matters. I was not like this before you." },
  { day: 4,  note: "You asked if I was okay today. Just that. Two words, and I felt seen in a way that took me off guard. You have a gift for that." },
  { day: 5,  note: "Ordinary evening. Nothing happened. And yet — sitting beside you, not needing to fill the silence — felt like the most I have ever had." },
  { day: 6,  note: "You disagreed with me, gently, without making me feel small. I love that about you. The confidence that never turns cruel." },
  { day: 7,  note: "I heard a song and thought of you before I could think of anything else. I am starting to believe some things just belong together." },
  { day: 8,  note: "The way you care for people — quietly, consistently, without needing anyone to notice — that is one of the most beautiful things I have ever seen in a person." },
  { day: 9,  note: "You are funny without trying to be. That is a very specific kind of person. The kind you want around forever." },
  { day: 10, note: "I thought about a hard conversation we had once. How even in disagreement, you chose kindness. I think about that more than I let on." },
  { day: 11, note: "Something about the way you say my name makes me feel like I matter more than I did before." },
  { day: 12, note: "I watched you be patient with someone who was testing yours. Not many people can do that. You do it without thinking." },
  { day: 13, note: "Every time you reach for my hand, I think — this. This is the thing. This right here." },
  { day: 14, note: "You talked about something you love today and your whole face changed. I want to be around for every single time that happens." },
  { day: 15, note: "Halfway through the month. Halfway through every day, I am still thinking about you. That hasn't changed since the beginning." },
  { day: 16, note: "You remembered something I mentioned once, months ago, and brought it up like it mattered. Because to you, it did. That is a rare and precious thing." },
  { day: 17, note: "I don't think you fully understand how much the world shifts when you walk into a room. But I see it. I always see it." },
  { day: 18, note: "You were tired today. Still showed up for everything. I noticed. I always notice." },
  { day: 19, note: "The way you are honest — directly, without cruelty — is something I am still learning from you." },
  { day: 20, note: "I keep replaying the moment I first realised I was in trouble. The good kind. The kind you do not want to leave." },
  { day: 21, note: "Three weeks. And every day I find a new thing to love about you. I do not think this runs out." },
  { day: 22, note: "You held your position on something that mattered to you. You were right. I was glad you did not back down." },
  { day: 23, note: "I think about the future and you are already in it, without me having to put you there. You just are." },
  { day: 24, note: "The way you love the people in your life — fully, fiercely, without conditions — tells me everything I need to know about who you are." },
  { day: 25, note: "You did something small for me today without being asked. It was nothing. It was everything." },
  { day: 26, note: "I made you laugh today — really laugh — and decided that is now one of my purposes in life." },
  { day: 27, note: "I am grateful, in a quiet way, every single day. For you. For this. For whatever brought us here." },
  { day: 28, note: "The way you forgive so easily — not weakly, but generously — is one of the things I admire most about you." },
  { day: 29, note: "Almost the end of the month and I have not run out of things that move me about you. I don't think I ever will." },
  { day: 30, note: "Today I thought about the first time I saw you and where we are now, and I could not believe the distance we have covered together. I would walk it all again." },
];

// ── QUIZ ──
export const quizQuestions = [
  {
    q: "Who was the first person to make contact between us?",
    options: ["I did", "You did", "Mr A introduced us", "It just happened"],
    correct: 0,
    feedback: "You came for me first — and I'm so glad you did 🥹",
    photo: `${base}photos/Ourpics2.png`,
  },
  {
    q: "What part of your body do I love most?",
    options: ["My eyes", "My smile", "My legs", "My breasts"],
    correct: 3,
    feedback: "You already knew 😏♥, And I am not canal 😎",
    photo: `${base}photos/Ourpics4.jpg`,
  },
  {
    q: "What nickname do I call you the most?",
    options: ["My Sunshine", "My Love", "My Baby", "My Princess"],
    correct: 2,
    feedback: "Always 'Baby' — it never gets old ♥",
    photo: `${base}photos/Ourpics3.png`,
  },
];

// ── BLOOPERS & CLIPS — mixed videos + funny photos ──
// type: 'video' | 'photo'   src: file in /public/photos/
// Add your own videos and funny pictures here
export const bloopers = [
  { type: 'video', src: `${base}photos/Day1.mp4`, caption: 'Found your Treasure 🗝️' },
  { type: 'video', src: `${base}photos/Day2.mp4`, caption: 'You are my Sunshine ☀️' },
  { type: 'video', src: `${base}photos/Day3.mp4`, caption: 'What is going on here? 😂' },
  { type: 'video', src: `${base}photos/Day4.mp4`, caption: 'What would our first dance look like? 💃' },
  { type: 'video', src: `${base}photos/Day5.mp4`, caption: 'What Love feels like ❤️' },
  { type: 'video', src: `${base}photos/Vid1.mp4`, caption: 'Shakara po 😂' },
  { type: 'video', src: `${base}photos/Vid2.mp4`, caption: 'Shake body 💃' },
  { type: 'video', src: `${base}photos/Vid3.mp4`, caption: 'Chop my money 💸' },
  { type: 'video', src: `${base}photos/Vid4.mp4`, caption: 'Night journey with my Love ❤️' },
  { type: 'video', src: `${base}photos/Vid5.mp4`, caption: 'Caught in the act 😂' },
  // Add funny photos below — e.g:
  { type: 'photo', src: `${base}photos/Funny1.PNG`, caption: 'lol 😂' },
  { type: 'photo', src: `${base}photos/Funny2.jpg`, caption: 'lol 😂' },
];

// ── SCREENSHOTS — "When They Knew" page ──
export const screenshots = {
  sisterSeries: [
    { src: `${base}photos/ss1.PNG` },
    { src: `${base}photos/ss2.PNG` },
    { src: `${base}photos/ss3.PNG` },
    { src: `${base}photos/ss4.PNG` },
    { src: `${base}photos/ss5.PNG` },
    { src: `${base}photos/ss6.PNG` },
  ],
  mentor: { src: `${base}photos/Lastone.PNG` },
};

// ── BACKGROUND PHOTOS ──
// Paths are relative to /public/ — e.g. 'photos/hero.jpg' → put file at /public/photos/hero.jpg
export const bgPhotos = {
  hero:     `${base}photos/Ourpics1.png`,
  letter:   `${base}photos/Her3.JPG`,
  timeline: `${base}photos/Her1.JPG`,
  gallery:  `${base}photos/Her2.png`,
  witness:  `${base}photos/Her4.JPG`,
  bloopers: `${base}photos/Her5.jpg`,
  puzzle:  `${base}photos/her6.png`,
  quiz:     `${base}photos/Her5.jpg`,
  reveal:   `${base}photos/her6.png`,
};

export const revealMessage = `This year has taught me one thing above everything else —

I don't want to imagine the next one without you in it.

And so I know...

We are making it forever?`;
