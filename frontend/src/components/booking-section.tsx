"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Calendar,
  Clock,
  Video,
  Globe,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";

const currentMonth = new Date();
const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export default function BookingSection() {
  const [selectedDate, setSelectedDate] = useState<number | null>(null);
  const [currentMonthOffset, setCurrentMonthOffset] = useState(0);

  const displayDate = new Date(
    currentMonth.getFullYear(),
    currentMonth.getMonth() + currentMonthOffset,
    1,
  );
  const daysInMonth = new Date(
    displayDate.getFullYear(),
    displayDate.getMonth() + 1,
    0,
  ).getDate();
  const firstDayOfMonth = new Date(
    displayDate.getFullYear(),
    displayDate.getMonth(),
    1,
  ).getDay();

  const days = [];
  for (let i = 0; i < firstDayOfMonth; i++) {
    days.push(null);
  }
  for (let i = 1; i <= daysInMonth; i++) {
    days.push(i);
  }

  const today = new Date();
  const isCurrentMonth =
    displayDate.getMonth() === today.getMonth() &&
    displayDate.getFullYear() === today.getFullYear();

  return (
    <section className="py-20 lg:py-28 bg-[#1a1a1a] text-white">
      <div className="max-w-[1400px] mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <p className="text-xs tracking-[0.3em] uppercase text-white/50 mb-3">
              {"Let's Talk in 30 Minutes"}
            </p>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-medium leading-tight">
              Book Your Free Style Consultation Today
            </h2>
            <p className="mt-5 text-sm text-white/70 leading-relaxed max-w-md">
              Schedule a complimentary consultation with our expert designers.
              Discuss your vision, explore fabrics, and start your bespoke
              journey.
            </p>

            {/* Floating images */}
            <div className="mt-10 flex -space-x-3">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="w-14 h-14 overflow-hidden border border-white/20 bg-[#C4BBAF]"
                  style={{ transform: `rotate(${(i - 2) * 6}deg)` }}
                >
                  <Image
                    src={`https://images.unsplash.com/photo-150700321116${i}-0a1dd7228f2d?q=80&w=200`}
                    alt=""
                    width={56}
                    height={56}
                    className="object-cover w-full h-full"
                  />
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right Calendar */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <div className="bg-white text-foreground p-6">
              {/* Meeting info */}
              <div className="flex items-center gap-3 mb-5">
                <div className="w-9 h-9 bg-[#f8f7f5] flex items-center justify-center">
                  <Calendar className="w-4 h-4 text-[#66333A]" />
                </div>
                <div>
                  <p className="text-sm font-medium">Kaariq Design Team</p>
                  <p className="text-xs text-muted-foreground">
                    Style Consultation
                  </p>
                </div>
              </div>

              <h3 className="text-base font-medium mb-4">
                30 Min Consultation
              </h3>

              <div className="space-y-2 mb-5 text-xs text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Clock className="w-3 h-3" />
                  <span>30 minutes</span>
                </div>
                <div className="flex items-center gap-2">
                  <Video className="w-3 h-3" />
                  <span>Google Meet / Zoom</span>
                </div>
                <div className="flex items-center gap-2">
                  <Globe className="w-3 h-3" />
                  <span>Asia/Kolkata</span>
                </div>
              </div>

              {/* Calendar */}
              <div className="border-t border-[#e5e2de] pt-5">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="text-sm font-medium">
                    {monthNames[displayDate.getMonth()]}{" "}
                    {displayDate.getFullYear()}
                  </h4>
                  <div className="flex gap-1">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-7 w-7"
                      onClick={() =>
                        setCurrentMonthOffset(currentMonthOffset - 1)
                      }
                      disabled={currentMonthOffset === 0}
                    >
                      <ChevronLeft className="w-3 h-3" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-7 w-7"
                      onClick={() =>
                        setCurrentMonthOffset(currentMonthOffset + 1)
                      }
                    >
                      <ChevronRight className="w-3 h-3" />
                    </Button>
                  </div>
                </div>

                <div className="grid grid-cols-7 gap-1 text-center text-[10px] mb-2">
                  {["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"].map(
                    (day) => (
                      <div
                        key={day}
                        className="py-1 text-muted-foreground font-medium"
                      >
                        {day}
                      </div>
                    ),
                  )}
                </div>

                <div className="grid grid-cols-7 gap-1">
                  {days.map((day, index) => {
                    if (day === null) {
                      return (
                        <div key={`empty-${index}`} className="aspect-square" />
                      );
                    }

                    const isPast = isCurrentMonth && day < today.getDate();
                    const isToday = isCurrentMonth && day === today.getDate();
                    const isSelected =
                      selectedDate === day && currentMonthOffset === 0;

                    return (
                      <button
                        key={day}
                        onClick={() => !isPast && setSelectedDate(day)}
                        disabled={isPast}
                        className={`
                          aspect-square text-xs font-medium transition-colors
                          ${isPast ? "text-muted-foreground/40 cursor-not-allowed" : "hover:bg-[#66333A] hover:text-white"}
                          ${isToday ? "ring-1 ring-[#66333A]" : ""}
                          ${isSelected ? "bg-[#66333A] text-white" : ""}
                        `}
                      >
                        {day}
                      </button>
                    );
                  })}
                </div>

                {selectedDate && (
                  <Button className="w-full mt-5 bg-[#66333A] hover:bg-[#66333A]/90 text-white text-sm">
                    Continue with {monthNames[displayDate.getMonth()]}{" "}
                    {selectedDate}
                  </Button>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
