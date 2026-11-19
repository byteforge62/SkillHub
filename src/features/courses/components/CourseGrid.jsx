import { Link } from "react-router-dom";
import { SearchX } from "lucide-react";

import Button from "@/components/ui/Button";
import EmptyState from "@/components/ui/EmptyState";

import { CourseCard } from "./CourseCard";

export const CourseGrid = ({ courses = [], filtered = false }) => {
  if (courses.length === 0) {
    return filtered ? (
      <EmptyState
        icon={SearchX}
        title="No courses match those filters"
        description="Try a different level or a shorter search term."
      />
    ) : (
      <EmptyState
        icon={SearchX}
        title="No courses published yet"
        description="New courses appear here as soon as they are published."
        action={
          <Button as={Link} to="/events" variant="secondary" size="sm">
            Browse events instead
          </Button>
        }
      />
    );
  }

  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
      {courses.map((course) => (
        <CourseCard key={course._id} course={course} />
      ))}
    </div>
  );
};

export default CourseGrid;
