import { useEffect, useMemo, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import {
  Bell,
  BookOpen,
  CalendarDays,
  ChevronDown,
  GraduationCap,
  LogOut,
  Menu,
  Search,
  Settings,
  Sparkles,
  User,
  Users,
  Wrench,
} from 'lucide-react';
import { useQuery } from '@tanstack/react-query';

import Avatar from '@/components/ui/Avatar';
import ProgressBar from '@/components/ui/ProgressBar';
import SearchDialog from '@/components/ui/SearchDialog';
import { dropdownMotion } from '@/lib/motion';
import useCurrentUser from '@/features/auth/hooks/useCurrentUser';
import useLogout from '@/features/auth/hooks/useLogout';
import useMyEnrollments from '@/features/enrollment/hooks/useEnrollment';
import { getEvents } from '@/features/events/api/eventsApi';
import { formatEventDate } from '@/features/events/utils/eventDate';
import toolRegistry from '@/features/tools/toolRegistry';

const TITLES = {
  '/dashboard': 'Workspace',
  '/learning': 'My learning',
  '/courses': 'Course catalog',
  '/communities': 'Communities',
  '/events': 'Events',
  '/events/manage': 'Manage events',
  '/tools': 'Developer tools',
  '/profile': 'Profile',
  '/profile/edit': 'Edit profile',
  '/profile/settings': 'Settings',
};

const titleFor = (pathname) => {
  if (TITLES[pathname]) return TITLES[pathname];
  if (pathname.startsWith('/courses/')) return 'Course';
  if (pathname.startsWith('/learning/')) return 'Lesson workspace';
  if (pathname.startsWith('/events/')) return 'Event';
  if (pathname.startsWith('/tools/')) return 'Tool';
  if (pathname.startsWith('/communities/')) return 'Community';
  return 'Workspace';
};

export const Header = ({ onMenuClick }) => {
  const location = useLocation();
  const { data: user } = useCurrentUser();
  const logoutMutation = useLogout();
  const enrollmentsQuery = useMyEnrollments();

  const eventsQuery = useQuery({
    queryKey: ['events', 'header-stats'],
    queryFn: () => getEvents({ page: 1, limit: 10 }),
    staleTime: 5 * 60 * 1000,
  });

  const [searchOpen, setSearchOpen] = useState(false);
  const [activePopover, setActivePopover] = useState(null); // 'notifications' | 'account' | null
  const headerRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (headerRef.current && !headerRef.current.contains(e.target)) {
        setActivePopover(null);
      }
    };

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setActivePopover(null);
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setSearchOpen((prev) => !prev);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const enrollments = enrollmentsQuery.data?.data || [];
  const activeCourses = useMemo(
    () => enrollments.filter((e) => e.status === 'active'),
    [enrollments],
  );

  const upcomingEvents = useMemo(
    () =>
      eventsQuery.data?.data?.filter(
        (e) => new Date(e.startDate) > new Date(),
      ) || [],
    [eventsQuery.data],
  );

  const notificationCount = upcomingEvents.length + activeCourses.length;

  const searchItems = useMemo(
    () => [
      { label: 'Dashboard', to: '/dashboard', group: 'Pages', description: 'Your learning overview', icon: BookOpen },
      { label: 'My learning', to: '/learning', group: 'Pages', description: 'Enrolled courses', icon: GraduationCap },
      { label: 'Course catalog', to: '/courses', group: 'Pages', description: 'Browse all courses', icon: Sparkles },
      { label: 'Communities', to: '/communities', group: 'Pages', description: 'Discussion rooms', icon: Users },
      { label: 'Events', to: '/events', group: 'Pages', description: 'Upcoming workshops', icon: CalendarDays },
      { label: 'Profile', to: '/profile', group: 'Pages', description: 'Your public profile', icon: User },
      { label: 'Settings', to: '/profile/settings', group: 'Pages', description: 'Preferences', icon: Settings },
      ...toolRegistry.map((tool) => ({
        label: tool.name,
        to: `/tools/${tool.slug || tool.id || ''}`,
        group: 'Tools',
        description: tool.description,
        icon: Wrench,
      })),
    ],
    [],
  );

  const togglePopover = (name) => {
    setActivePopover((prev) => (prev === name ? null : name));
  };

  return (
    <header ref={headerRef} className='sticky top-0 z-30 px-3 pt-3 sm:px-5'>
      <div className='relative mx-auto flex h-[60px] max-w-[1200px] items-center justify-between gap-3 rounded-full border border-[color:var(--color-line)] bg-white/80 px-3 shadow-[0_6px_22px_rgba(20,46,33,0.05)] backdrop-blur-xl sm:px-4'>
        {/* Left: Mobile Menu & Page Title */}
        <div className='flex min-w-0 items-center gap-2.5'>
          <button
            type='button'
            aria-label='Open navigation'
            onClick={onMenuClick}
            className='flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-text-secondary transition-colors hover:bg-sage hover:text-primary lg:hidden'
          >
            <Menu size={18} aria-hidden='true' />
          </button>

          <h1 className='truncate pl-1 text-[14px] font-semibold tracking-[-0.02em] text-text-primary lg:pl-2'>
            {titleFor(location.pathname)}
          </h1>
        </div>

        {/* Center: Search Trigger (Desktop) */}
        <div className='hidden flex-1 justify-center md:flex'>
          <button
            type='button'
            onClick={() => setSearchOpen(true)}
            className='group flex w-full max-w-[420px] items-center justify-between gap-3 rounded-full border border-[color:var(--color-line)] bg-white/80 px-4 py-2 text-[13px] text-text-muted transition-all hover:border-primary/40 hover:bg-white focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20'
          >
            <span className='flex items-center gap-2.5 truncate'>
              <Search
                size={16}
                className='shrink-0 text-text-muted transition-colors group-hover:text-primary'
                aria-hidden='true'
              />
              <span className='truncate'>Search courses, tools, events, people…</span>
            </span>
            <kbd className='shrink-0 rounded-md border border-[color:var(--color-line)] bg-white px-1.5 py-0.5 text-[10px] font-medium text-text-muted'>
              ⌘K
            </kbd>
          </button>
        </div>

        {/* Right: Actions & Account Menu */}
        <div className='flex items-center gap-1.5'>
          <button
            type='button'
            onClick={() => setSearchOpen(true)}
            aria-label='Search'
            className='flex h-9 w-9 items-center justify-center rounded-full text-text-secondary transition-colors hover:bg-sage hover:text-primary md:hidden'
          >
            <Search size={17} strokeWidth={1.9} aria-hidden='true' />
          </button>

          <button
            type='button'
            onClick={() => togglePopover('notifications')}
            aria-expanded={activePopover === 'notifications'}
            aria-label='Notifications'
            className={`relative flex h-9 w-9 items-center justify-center rounded-full transition-colors ${
              activePopover === 'notifications'
                ? 'bg-sage text-primary'
                : 'text-text-secondary hover:bg-sage hover:text-primary'
            }`}
          >
            <Bell size={18} aria-hidden='true' />
            {notificationCount > 0 && (
              <span className='absolute right-1.5 top-1.5 flex h-4 min-w-[16px] items-center justify-center rounded-full bg-error px-1 text-[9px] font-bold text-white'>
                {notificationCount > 9 ? '9+' : notificationCount}
              </span>
            )}
          </button>

          <button
            type='button'
            onClick={() => togglePopover('account')}
            aria-expanded={activePopover === 'account'}
            aria-haspopup='true'
            aria-label='Account menu'
            className={`flex items-center gap-1.5 rounded-full p-0.5 pl-1.5 transition-colors ${
              activePopover === 'account' ? 'bg-sage' : 'hover:bg-sage'
            }`}
          >
            <span className='hidden max-w-[140px] truncate text-[12.5px] font-medium text-text-secondary sm:block'>
              {user?.fullname || 'Member'}
            </span>

            <Avatar
              src={user?.avatar}
              name={user?.fullname}
              email={user?.email}
              size='sm'
            />

            <ChevronDown
              size={13}
              className={`mr-1 hidden text-text-muted transition-transform duration-150 sm:block ${
                activePopover === 'account' ? 'rotate-180 text-primary' : ''
              }`}
              aria-hidden='true'
            />
          </button>
        </div>

        {/* Notifications Popover */}
        <AnimatePresence>
          {activePopover === 'notifications' && (
            <motion.div
              variants={dropdownMotion}
              initial='hidden'
              animate='visible'
              exit='exit'
              className='absolute right-0 top-full z-50 mt-3 w-[350px] max-w-[calc(100vw-2rem)] overflow-hidden rounded-3xl border border-[color:var(--color-line)] bg-white p-2 shadow-[0_28px_70px_rgba(18,40,29,0.16)]'
            >
              <div className='flex items-center justify-between px-3 py-2'>
                <p className='text-[13px] font-semibold text-text-primary'>
                  Notifications
                </p>
                {notificationCount > 0 && (
                  <span className='text-[11px] font-medium text-primary'>
                    {notificationCount} active
                  </span>
                )}
              </div>

              <div className='h-px bg-border-subtle' />

              <div className='max-h-[340px] overflow-y-auto'>
                {upcomingEvents.length > 0 && (
                  <div className='px-1.5 py-2'>
                    <p className='mb-1.5 px-2 text-[11px] font-medium text-primary'>
                      Upcoming events ({upcomingEvents.length})
                    </p>
                    {upcomingEvents.slice(0, 3).map((event) => (
                      <Link
                        key={event._id}
                        to={`/events/${event._id}`}
                        onClick={() => setActivePopover(null)}
                        className='block rounded-xl px-3 py-2 text-[12.5px] font-medium text-text-secondary transition-colors hover:bg-sage/70 hover:text-primary'
                      >
                        <div className='flex items-center gap-2'>
                          <CalendarDays size={14} className='shrink-0 text-primary' />
                          <span className='truncate'>{event.title}</span>
                        </div>
                        <p className='mt-0.5 pl-5.5 text-[11px] text-text-muted'>
                          {formatEventDate(event.startDate, event.endDate)}
                        </p>
                      </Link>
                    ))}
                  </div>
                )}

                {upcomingEvents.length > 0 && activeCourses.length > 0 && (
                  <div className='h-px bg-border-subtle' />
                )}

                {activeCourses.length > 0 && (
                  <div className='px-1.5 py-2'>
                    <p className='mb-1.5 px-2 text-[11px] font-medium text-primary'>
                      Active learning ({activeCourses.length})
                    </p>
                    {activeCourses.slice(0, 3).map((enrollment) => {
                      const courseId =
                        typeof enrollment.courseId === 'object'
                          ? enrollment.courseId._id
                          : enrollment.courseId;
                      const courseTitle =
                        typeof enrollment.courseId === 'object'
                          ? enrollment.courseId.title
                          : 'Course';

                      return (
                        <Link
                          key={enrollment._id}
                          to={`/learning/${courseId}`}
                          onClick={() => setActivePopover(null)}
                          className='block rounded-xl px-3 py-2 text-[12.5px] font-medium text-text-secondary transition-colors hover:bg-sage/70 hover:text-primary'
                        >
                          <div className='flex items-center gap-2'>
                            <BookOpen size={14} className='shrink-0 text-primary' />
                            <span className='truncate'>{courseTitle}</span>
                          </div>
                          <div className='mt-1.5 flex items-center gap-2 pl-5.5'>
                            <ProgressBar
                              value={enrollment.progress || 0}
                              size='sm'
                              tone='light'
                              className='w-[110px]'
                            />
                            <span className='text-[11px] font-medium text-text-muted'>
                              {enrollment.progress || 0}%
                            </span>
                          </div>
                        </Link>
                      );
                    })}
                  </div>
                )}

                {notificationCount === 0 && (
                  <div className='px-3 py-8 text-center text-[13px] text-text-muted'>
                    You&apos;re all caught up
                  </div>
                )}
              </div>

              <div className='h-px bg-border-subtle' />

              <Link
                to='/events'
                onClick={() => setActivePopover(null)}
                className='mt-1 block rounded-xl px-3 py-2 text-center text-[12.5px] font-medium text-primary transition-colors hover:bg-sage/70'
              >
                View all events
              </Link>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Account Menu Popover */}
        <AnimatePresence>
          {activePopover === 'account' && (
            <motion.div
              variants={dropdownMotion}
              initial='hidden'
              animate='visible'
              exit='exit'
              className='absolute right-0 top-full z-50 mt-3 w-[232px] overflow-hidden rounded-3xl border border-[color:var(--color-line)] bg-white p-2 shadow-[0_28px_70px_rgba(18,40,29,0.16)]'
            >
              <div className='px-3 pb-2 pt-2'>
                <p className='truncate text-[13px] font-semibold text-text-primary'>
                  {user?.fullname || 'SkillHub member'}
                </p>
                <p className='truncate text-[11.5px] text-text-muted'>
                  {user?.email}
                </p>
              </div>

              <div className='h-px bg-border-subtle' />

              <Link
                to='/profile'
                onClick={() => setActivePopover(null)}
                className='mt-1 flex items-center gap-2.5 rounded-xl px-3 py-2 text-[13px] font-medium text-text-secondary transition-colors hover:bg-sage/70 hover:text-primary'
              >
                <User size={15} aria-hidden='true' />
                Profile
              </Link>

              <Link
                to='/profile/settings'
                onClick={() => setActivePopover(null)}
                className='flex items-center gap-2.5 rounded-xl px-3 py-2 text-[13px] font-medium text-text-secondary transition-colors hover:bg-sage/70 hover:text-primary'
              >
                <Settings size={15} aria-hidden='true' />
                Settings
              </Link>

              <div className='my-1 h-px bg-border-subtle' />

              <button
                type='button'
                onClick={() => logoutMutation.mutate()}
                disabled={logoutMutation.isPending}
                className='flex w-full items-center gap-2.5 rounded-xl px-3 py-2 text-left text-[13px] font-medium text-text-secondary transition-colors hover:bg-error-soft hover:text-error disabled:opacity-60'
              >
                <LogOut size={15} aria-hidden='true' />
                {logoutMutation.isPending ? 'Signing out...' : 'Sign out'}
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <SearchDialog
        open={searchOpen}
        onClose={() => setSearchOpen(false)}
        items={searchItems}
      />
    </header>
  );
};

export default Header;