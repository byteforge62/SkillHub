import { useQuery } from "@tanstack/react-query";
import { BookOpen, CalendarDays, Users, Wrench } from "lucide-react";

import { HeroSection } from "../components/HeroSection";
import { LandingBackdrop } from "../components/LandingBackdrop";
import { MetricsStrip } from "../components/MetricsStrip";
import { BentoFeatures } from "../components/BentoFeatures";
import {
  CatalogInvite,
  TrendingCourses,
} from "../components/TrendingCourses";
import { EventsPreview } from "../components/EventsPreview";

import useCurrentUser from "@/features/auth/hooks/useCurrentUser";
import { getCourses } from "@/features/courses/api/courseApi";
import { getEvents } from "@/features/events/api/eventsApi";
import { getCommunities } from "@/features/community/api/communityApi";
import toolRegistry from "@/features/tools/toolRegistry";

export const LandingPage = () => {
  const { data: user } = useCurrentUser();

  const eventsQuery = useQuery({
    queryKey: ["events", "upcoming", 1],
    queryFn: () => getEvents({ page: 1, limit: 3 }),
  });

  const communitiesQuery = useQuery({
    queryKey: ["communities"],
    queryFn: getCommunities,
  });

  const coursesQuery = useQuery({
    queryKey: ["courses", { page: 1, limit: 4, sort: "newest" }],
    queryFn: () => getCourses({ page: 1, limit: 4, sort: "newest" }),
    enabled: Boolean(user),
  });

  const courseList = coursesQuery.data?.data?.courses ?? [];

  const metrics = [
    {
      label: "Courses & resources",
      value: user
        ? coursesQuery.data?.meta?.total ?? courseList.length
        : null,
      icon: BookOpen,
    },
    {
      label: "Events & workshops",
      value:
        eventsQuery.data?.meta?.total ?? eventsQuery.data?.data?.length ?? null,
      icon: CalendarDays,
    },
    {
      label: "Tools in the browser",
      value: toolRegistry.length,
      icon: Wrench,
    },
    {
      label: "Learning communities",
      value: communitiesQuery.data?.data?.length ?? null,
      icon: Users,
    },
  ];

  return (
    <div className="relative isolate">
      <LandingBackdrop />

      <div className="relative z-10">
        <HeroSection />

        <div className="container-wide relative z-20 -mt-10 pb-4 lg:-mt-14">
          <MetricsStrip items={metrics} />
        </div>

        <BentoFeatures />

        {user ? (
          <TrendingCourses
            courses={courseList}
            isLoading={coursesQuery.isLoading}
            isError={coursesQuery.isError}
            refetch={coursesQuery.refetch}
          />
        ) : (
          <CatalogInvite toolCount={toolRegistry.length} />
        )}

        <EventsPreview
          events={eventsQuery.data?.data || []}
          isLoading={eventsQuery.isLoading}
          isError={eventsQuery.isError}
          refetch={eventsQuery.refetch}
        />
      </div>
    </div>
  );
};

export default LandingPage;
