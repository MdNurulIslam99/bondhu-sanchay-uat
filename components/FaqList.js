"use client";
import { useState } from "react";
import { Plus, Minus } from "lucide-react";
import { faqs } from "@/lib/data";

export default function FaqList({ limit }) {
  const [active, setActive] = useState(0);

  return (
    <div className="faq-list space-y-3">
      {faqs.slice(0, limit || faqs.length).map(([q, a], i) => (
        <div
          className={
            "faq-item border border-stone-200 rounded-2xl p-5 bg-stone-50 transition-all " +
            (active === i ? "expanded" : "")
          }
          key={q}
        >
          <button
            className="w-full flex justify-between items-center text-left font-semibold text-stone-900 text-lg gap-4"
            onClick={() => setActive(active === i ? null : i)}
            aria-expanded={active === i}
            aria-controls={"answer-" + i}
          >
            <span>{q}</span>
            {active === i ? <Minus size={19} className="shrink-0" /> : <Plus size={19} className="shrink-0" />}
          </button>
          
          {active === i && (
            <p id={"answer-" + i} className="mt-3 text-stone-600 leading-relaxed">
              {a}
            </p>
          )}
        </div>
      ))}
    </div>
  );
}