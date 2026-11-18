import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { AnimatedReveal } from "@/components/animation/AnimatedReveal";
import { AnimatedButton } from "@/components/animation/AnimatedButton";
import { SectionBackground } from "./SectionBackground";

const featuredCourse = {
  title: "React Fundamentals",
  instructor: "Sarah Chen",
  level: "Beginner",
  duration: "12 hours",
  lessons: 24,
  students: "12.4k",
  rating: 4.9,
  progress: 68,
  currentLesson: "State Management Patterns",
  nextLesson: "Performance Optimization",
  skills: ["React", "Hooks", "State", "Effects"],
};

export const HeroSection = () => (
  <SectionBackground variant="forest-deep" showDepth depthPosition="center" showBorder borderPosition="bottom">
    <div className="container-wide grid min-h-[calc(100vh-5.5rem)] items-start gap-10 lg:gap-16 py-16 lg:py-24 xl:py-32 lg:grid-cols-[1fr_1.1fr]">
      <div className="relative z-20 max-w-[680px] pt-8 lg:pt-16">
        <div className="space-y-8">