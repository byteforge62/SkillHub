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
import { getCourses, getFeaturedCourses } from "@/features/courses/api/courseApi";
import { getEvents } from "@/features/events/api/eventsApi";
import { getCommunities } from "@/features/community/api/communityApi";
import toolRegistry from "@/features/tools/toolRegistry";

export const LandingPage = () => {
  const { data: user } = useCurrentUser();

  const eventsQuery = useQuery({
    queryKey: ["events", "upcoming", 1],
    queryFn: () => getEvents({ page: 1, limit: 4 }),
  });

  const communitiesQuery = useQuery({
    queryKey: ["communities"],
    queryFn: getCommunities,
  });

  const featuredQuery = useQuery({
    queryKey: ["courses", "featured"],
    queryFn: () => getFeaturedCourses({ limit: 3 }),
  });

  const coursesQuery = useQuery({
    queryKey: ["courses", { page: 1, limit: 4, sort: "newest" }],
    queryFn: () => getCourses({ page: 1, limit: 4, sort: "newest" }),
    enabled: Boolean(user),
  });

  const courseList = coursesQuery.data?.data?.courses ?? [];
  const featured = featuredQuery.data?.data ?? [];
  const events = eventsQuery.data?.data ?? [];
  const communities = communitiesQuery.data?.data ?? [];

  const metrics = [
    {
      label: "Courses & resources",
      value: user
        ? coursesQuery.data?.meta?.total ?? courseList.length
        : featured.length,
      icon: BookOpen,
    },
    {
      label: "Events & workshops",
      value: eventsQuery.data?.meta?.total ?? events.length,
      icon: CalendarDays,
    },
    {
      label: "Tools in the browser",
      value: toolRegistry.length,
      icon: Wrench,
    },
    {
      label: "Learning communities",
      value: communities.length,
      icon: Users,
    },
  ];

  return (
    <div className="relative isolate">
      <LandingBackdrop />

      <div className="relative z-10">
        <HeroSection
          course={featured[0] ?? courseList[0] ?? null}
          event={events[0] ?? null}
          community={communities[0] ?? null}
          toolCount={toolRegistry.length}
        />

        <div className="container-wide relative z-20 -mt-8 pb-4">
          <MetricsStrip items={metrics} />
        </div>

        <BentoFeatures
          courses={featured.length > 0 ? featured : courseList}
          events={events}
          communities={communities}
        />

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
          events={events}
          isLoading={eventsQuery.isLoading}
          isError={eventsQuery.isError}
          refetch={eventsQuery.refetch}
        />
      </div>
    </div>
  );
};

export default LandingPage;
