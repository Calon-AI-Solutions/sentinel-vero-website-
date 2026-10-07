// Customer stories for /proof. Only facts already published on the site are used as-is.
// Anything else is a placeholder: `confirm: true` on a tag, or a stat with `value: null`.
// Placeholders render with a dashed "to confirm" treatment until Mahbubul signs them off.

export type StoryTag = { value: string; confirm?: boolean };

export type StoryStat = {
  /** null means the figure has not been confirmed yet and renders as a placeholder. */
  value: string | null;
  label: string;
};

export type Story = {
  slug: string;
  company: string;
  logo?: string;
  headline: string;
  summary: string;
  person: { name: string; role: string; photo: string };
  quote: string;
  size: StoryTag;
  region: StoryTag;
  trade: StoryTag;
  about: string;
  problem: { title: string; body: string[] };
  change: { title: string; body: string[] };
  results: string[];
  stats: StoryStat[];
  secondQuote?: { quote: string; who: string };
  takeaway: string;
};

export const stories: Story[] = [
  {
    slug: "volt-secure",
    company: "Volt Secure",
    logo: "/partners/volt-secure.png",
    headline: "How Volt Secure brought quoting, compliance and payroll into one system",
    summary:
      "Volt Secure runs its whole operation on Sentinel Vero every day, from the first enquiry to the payroll run.",
    person: {
      name: "Cai",
      role: "Founder & Managing Director",
      photo: "/testimonials/cai-award.webp",
    },
    quote:
      "Quoting, compliance and payroll used to live in different places. Now it’s all in one system.",
    size: { value: "11 to 50", confirm: true },
    region: { value: "UK", confirm: true },
    trade: { value: "Fire & Security" },
    about:
      "Volt Secure is a fire and security business led by its founder, Cai. It is also the live environment where Sentinel Vero is built and tested, so every workflow in the platform has been used on real jobs, with real customers and real engineers.",
    problem: {
      title: "Too many places to look",
      body: [
        "Like most growing contractors, Volt Secure had its work spread across separate tools. Quotes lived in one place, compliance in another and payroll somewhere else again. Keeping them in step meant people rekeying the same details and remembering where everything was.",
        "Payroll was the clearest example. Before every run, someone spent hours checking timesheets and mileage by hand. And once a job was done, any follow on work spotted on site depended on someone remembering to raise it.",
      ],
    },
    change: {
      title: "One record from enquiry to payroll",
      body: [
        "Volt Secure moved quoting, jobs, compliance and payroll into Sentinel Vero. Every customer, site and job now has one record with its full history, so the office and the field are always looking at the same thing.",
        "Time and mileage are logged from the field app as engineers work. The system checks them before they flow into payroll and Xero. At the same time, the AI advisory reads the photos engineers take on site and flags work the customer is likely to need next, ready to become a quote.",
      ],
    },
    results: [
      "Quoting, compliance and payroll run from one system instead of several.",
      "Timesheets and mileage are verified before they reach Xero, not checked by hand afterwards.",
      "Follow on work is spotted from site photos and turned into quotes, so less revenue slips through.",
    ],
    stats: [
      { value: null, label: "Hours a week no longer spent checking timesheets" },
      { value: null, label: "Follow on quotes raised from site photos each month" },
      { value: "1", label: "System for quoting, compliance and payroll" },
    ],
    secondQuote: {
      quote:
        "We used to spend hours checking timesheets and mileage before payroll. Volt verifies it for us, so by the time it reaches Xero, it’s already right.",
      who: "Cai, Founder & Managing Director, Volt Secure",
    },
    takeaway:
      "Putting every part of the job in one record gave Volt Secure back the hours it spent reconciling systems, and a way to catch the work it used to miss.",
  },
  {
    slug: "volt-secure-field-team",
    company: "Volt Secure",
    logo: "/partners/volt-secure.png",
    headline: "Why an engineer with 17 years on the tools finished with paperwork",
    summary:
      "Volt Secure’s engineers capture time, photos and notes on site, so the working day ends when the job does.",
    person: {
      name: "Field engineer",
      role: "Volt Secure",
      photo: "/testimonials/volt-engineer.webp",
    },
    quote:
      "In 17 years as an engineer, this is the easiest app I’ve used. No paperwork at the end of the day.",
    size: { value: "11 to 50", confirm: true },
    region: { value: "UK", confirm: true },
    trade: { value: "Fire & Security" },
    about:
      "Volt Secure’s field team carries out the installs, services and repairs that keep its customers compliant. They use the Sentinel Vero field app on every job, on Apple and Android.",
    problem: {
      title: "The job ended, the paperwork didn’t",
      body: [
        "For most engineers, finishing on site is only half the day. Timesheets, mileage, notes and photos still need writing up and sending back to the office, usually from the van or the kitchen table.",
        "That admin is easy to put off and easy to get wrong, and the office can’t move a job forward until it arrives.",
      ],
    },
    change: {
      title: "Captured on site, seen in the office",
      body: [
        "With the field app, engineers log their time and mileage as they work. Photos and notes go in on site, attached to the right job, and the office sees them live.",
        "Nothing needs retyping later, so the end of the job really is the end of the day.",
      ],
    },
    results: [
      "Time and mileage log automatically as engineers work.",
      "Photos and notes are captured on site and reach the office straight away.",
      "No paperwork left over at the end of the day.",
    ],
    stats: [
      { value: "17", label: "Years in the trade before finding the easiest app yet" },
      { value: "0", label: "Paperwork left at the end of the day" },
      { value: null, label: "Minutes of admin saved per engineer each day" },
    ],
    secondQuote: {
      quote: "Time and mileage log automatically, photos and notes go in on site, and I’m done.",
      who: "Engineer, Volt Secure",
    },
    takeaway:
      "When the app fits how engineers already work, the admin gets done on site, and the office gets what it needs without chasing.",
  },
  {
    slug: "joc-security-growth",
    company: "JOC Security Growth",
    logo: "/partners/joc.png",
    headline: "Why JOC Security Growth recommended a platform built for security firms",
    summary:
      "John O’Connell helps security companies grow. When a client needed new systems, the big platforms weren’t the answer.",
    person: {
      name: "John O’Connell",
      role: "Senior Security Partner",
      photo: "/testimonials/john-oconnell.webp",
    },
    quote:
      "My client looked at the big platforms, but this was built around how security companies actually work.",
    size: { value: "1 to 10", confirm: true },
    region: { value: "UK", confirm: true },
    trade: { value: "Security" },
    about:
      "JOC Security Growth works with security companies on how they grow. John O’Connell, its Senior Security Partner, brings the industry relationships and sector knowledge that help firms choose the right tools as they scale.",
    problem: {
      title: "Big platforms, wrong shape",
      body: [
        "One of John’s clients had outgrown the way it was running its operation and started looking at the large, well known platforms.",
        "The trouble was fit. Generic job software is built for every trade at once, which leaves a security company working around the software instead of the other way round.",
      ],
    },
    change: {
      title: "Set up around the way they work",
      body: [
        "Sentinel Vero was configured around how the client already worked, rather than asking the team to adopt someone else’s process. It was set up quickly.",
        "As the client’s needs changed, the team listened, and new features arrived when they were needed instead of waiting on a generic roadmap.",
      ],
    },
    results: [
      "A platform shaped around how security companies actually work.",
      "Set up quickly, without forcing the team into a new process.",
      "New features delivered as the client’s needs changed.",
    ],
    stats: [
      { value: null, label: "Weeks from Discovery to live" },
      { value: null, label: "Custom features delivered since launch" },
    ],
    secondQuote: {
      quote: "It was set up quickly, the team listens, and new features arrive when we need them.",
      who: "John O’Connell, Senior Security Partner, JOC Security Growth",
    },
    takeaway:
      "For a security firm, fit matters more than feature lists. A platform built around the trade, with a team that keeps building, beat the big names.",
  },
];

export const featuredSlug = "volt-secure";

export function getStory(slug: string) {
  return stories.find((s) => s.slug === slug);
}
