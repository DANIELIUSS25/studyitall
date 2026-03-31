import Link from "next/link";
import { Check, ArrowRight, Sparkles, Crown, Users } from "lucide-react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Pricing — StudyItAll.com",
  description:
    "Free lessons to start, affordable plans to master everything. Coding, AI, math, science, languages — all on StudyItAll.com.",
};

const MICRO_OFFERS = [
  {
    price: "$0.99",
    name: "Module Unlock",
    desc: "Unlock all lessons in a single module. Keep your progress forever.",
    example: 'e.g. "Python: Variables & Loops"',
  },
  {
    price: "$1.99",
    name: "Subject Starter",
    desc: "All beginner modules in one subject. Includes quizzes and a PDF cheatsheet.",
    example: 'e.g. "Beginner Python Path"',
  },
  {
    price: "$2.99\u2013$4.99",
    name: "Exam Cram Pack",
    desc: "Condensed notes, 50\u2013100 practice questions, timed quiz mode, and a study schedule.",
    example: 'e.g. "Intro Programming Interview Basics"',
  },
];

const PLANS = [
  {
    name: "Free",
    price: "$0",
    period: "forever",
    desc: "Start learning any subject right now. No account required.",
    cta: "Start free",
    ctaHref: "/lesson/module-01-fundamentals/lesson-01-what-is-programming",
    ctaStyle: "border border-[var(--border)] hover:bg-[var(--muted)]",
    features: [
      "First 2 modules per subject",
      "Live code editor (Python & JS)",
      "Audio narration on free lessons",
      "All blog articles",
      "3 quizzes with explanations",
    ],
  },
  {
    name: "Basic",
    price: "$4.99",
    period: "/month",
    desc: "Full access to one subject. Progress tracking and streaks.",
    cta: "Get Basic",
    ctaHref: "#",
    ctaStyle: "border border-[var(--border)] hover:bg-[var(--muted)]",
    features: [
      "Everything in Free",
      "Full access to 1 subject of choice",
      "All lessons, audio, and quizzes",
      "Progress dashboard and streaks",
      "Continue where you left off",
    ],
  },
  {
    name: "All Subjects",
    price: "$9.99",
    period: "/month",
    desc: "Every subject, every level. The best value for serious learners.",
    cta: "Get All Subjects",
    ctaHref: "#",
    ctaStyle: "bg-brand-500 hover:bg-brand-600 text-white",
    popular: true,
    features: [
      "Everything in Basic",
      "Full access to all 8+ subjects",
      "Unlimited quizzes and practice sets",
      "Downloadable PDF notes",
      "Priority feature requests",
    ],
  },
  {
    name: "Plus",
    price: "$14.99",
    period: "/month",
    desc: "AI tutor, guided projects, and certificates. For power learners.",
    cta: "Get Plus",
    ctaHref: "#",
    ctaStyle: "border border-[var(--border)] hover:bg-[var(--muted)]",
    features: [
      "Everything in All Subjects",
      'AI assistant: "Ask the lesson"',
      "Auto-generated practice from mistakes",
      "Guided coding projects with checks",
      "Certificates of completion",
    ],
  },
];

const LIFETIME = [
  {
    name: "Lifetime Subject",
    price: "$29\u201339",
    desc: "One subject, forever. All current and future lessons included.",
    icon: <Sparkles size={20} />,
  },
  {
    name: "Lifetime All Subjects",
    price: "$79\u201399",
    desc: "Every subject, forever. Limited promotional pricing.",
    icon: <Crown size={20} />,
  },
  {
    name: "Teacher / Family",
    price: "$14.99/mo",
    desc: "Up to 5 accounts. Shared dashboard and weekly progress reports.",
    icon: <Users size={20} />,
  },
];

export default function PricingPage() {
  return (
    <div>
      {/* Hero */}
      <section className="border-b border-[var(--border)]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 text-center">
          <p className="text-brand-500 font-semibold text-sm mb-3">Pricing</p>
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight">
            Start free. Upgrade when ready.
          </h1>
          <p className="mt-4 text-lg text-[var(--muted-foreground)] max-w-xl mx-auto">
            The first lessons in every subject are completely free. Pay only when
            you want full paths, projects, and AI help.
          </p>
        </div>
      </section>

      {/* Micro offers */}
      <section className="py-16 border-b border-[var(--border)] bg-[var(--surface)] dark:bg-[var(--muted)]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-lg mb-10">
            <h2 className="text-2xl font-extrabold tracking-tight">
              One-time unlocks
            </h2>
            <p className="mt-2 text-[var(--muted-foreground)]">
              Need just one module or a cram pack? Buy once, keep forever.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {MICRO_OFFERS.map((offer) => (
              <div
                key={offer.name}
                className="bg-[var(--card)] rounded-2xl border border-[var(--border)] p-6"
              >
                <div className="flex items-baseline gap-1 mb-2">
                  <span className="text-3xl font-black">{offer.price}</span>
                  <span className="text-xs text-[var(--muted-foreground)]">
                    one time
                  </span>
                </div>
                <h3 className="font-bold mb-1">{offer.name}</h3>
                <p className="text-sm text-[var(--muted-foreground)] mb-3">
                  {offer.desc}
                </p>
                <p className="text-xs text-brand-500 font-medium">
                  {offer.example}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Subscription plans */}
      <section className="py-20 sm:py-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
              Monthly plans
            </h2>
            <p className="mt-3 text-[var(--muted-foreground)]">
              Cancel anytime. No contracts.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {PLANS.map((plan) => (
              <div
                key={plan.name}
                className={`relative rounded-2xl border p-6 flex flex-col ${
                  plan.popular
                    ? "border-brand-500 ring-1 ring-brand-500/20 bg-[var(--card)]"
                    : "border-[var(--border)] bg-[var(--card)]"
                }`}
              >
                {plan.popular && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 bg-brand-500 text-white text-[10px] font-bold uppercase tracking-widest rounded-full">
                    Most Popular
                  </span>
                )}

                <div className="mb-5">
                  <h3 className="font-bold text-lg">{plan.name}</h3>
                  <div className="flex items-baseline gap-0.5 mt-2">
                    <span className="text-4xl font-black">{plan.price}</span>
                    <span className="text-sm text-[var(--muted-foreground)]">
                      {plan.period}
                    </span>
                  </div>
                  <p className="text-sm text-[var(--muted-foreground)] mt-2">
                    {plan.desc}
                  </p>
                </div>

                <ul className="space-y-3 mb-8 flex-1">
                  {plan.features.map((f) => (
                    <li
                      key={f}
                      className="flex items-start gap-2 text-sm"
                    >
                      <Check
                        size={16}
                        className="text-emerald-500 mt-0.5 shrink-0"
                      />
                      {f}
                    </li>
                  ))}
                </ul>

                <Link
                  href={plan.ctaHref}
                  className={`block text-center py-3 rounded-full text-sm font-semibold transition-all ${plan.ctaStyle}`}
                >
                  {plan.cta}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Lifetime & bundles */}
      <section className="py-16 border-y border-[var(--border)] bg-[var(--surface)] dark:bg-[var(--muted)]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-extrabold tracking-tight mb-8">
            Lifetime &amp; bundle options
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {LIFETIME.map((item) => (
              <div
                key={item.name}
                className="bg-[var(--card)] rounded-2xl border border-[var(--border)] p-6"
              >
                <div className="w-10 h-10 rounded-xl bg-brand-500/10 text-brand-500 flex items-center justify-center mb-4">
                  {item.icon}
                </div>
                <h3 className="font-bold mb-1">{item.name}</h3>
                <span className="text-2xl font-black">{item.price}</span>
                <p className="text-sm text-[var(--muted-foreground)] mt-2">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-extrabold tracking-tight mb-8 text-center">
            Common questions
          </h2>

          <div className="space-y-6">
            {[
              {
                q: "What's included for free?",
                a: "The first 2 modules in every subject, audio narration, the live code editor for Python and JavaScript, all blog articles, and quizzes with explanations. No account needed.",
              },
              {
                q: "Can I cancel anytime?",
                a: "Yes. All subscriptions are month-to-month with no contracts. Cancel in one click and keep access until the end of your billing period.",
              },
              {
                q: "What's the difference between Basic and All Subjects?",
                a: "Basic gives you full access to one subject (e.g., just Coding or just Math). All Subjects unlocks everything across all 8+ subjects for $9.99/month.",
              },
              {
                q: "Are lifetime purchases really lifetime?",
                a: "Yes. Pay once and get access to all current and future lessons in your chosen subject(s) forever. No recurring charges.",
              },
              {
                q: "Do I need to pay to run code?",
                a: "No. The live code editor for Python and JavaScript is free for everyone. C++ and Java execution is available on paid plans.",
              },
            ].map((faq) => (
              <div
                key={faq.q}
                className="border-b border-[var(--border)] pb-5"
              >
                <h3 className="font-bold mb-2">{faq.q}</h3>
                <p className="text-sm text-[var(--muted-foreground)] leading-relaxed">
                  {faq.a}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-[var(--border)] bg-[var(--surface)] dark:bg-[var(--muted)]">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
          <h2 className="text-2xl font-extrabold tracking-tight">
            Start for free right now
          </h2>
          <p className="mt-3 text-[var(--muted-foreground)]">
            No credit card. No account. Just open a lesson.
          </p>
          <Link
            href="/lesson/module-01-fundamentals/lesson-01-what-is-programming"
            className="inline-flex items-center gap-2 mt-6 px-7 py-3.5 bg-brand-500 hover:bg-brand-600 text-white rounded-full font-semibold transition-all hover:shadow-lg hover:shadow-brand-500/25"
          >
            Open your first lesson
            <ArrowRight size={16} />
          </Link>
        </div>
      </section>
    </div>
  );
}
