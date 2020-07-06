/**
 * INDEX
 */
export const INDEX_PATH = '/';
export const LOGIN_PATH = '/login';
export const REGISTER_PATH = '/register';
export const DASHBOARD_PATH = '/dashboard';
export const CREATE_ORG_PATH = '/org/create';
export const SCHEDULE_ARCHIVE_PATH = '/schedule/archive';
export const EDIT_PROFILE_PATH = '/profile/edit';
export const PROFILE_SETTINGS_PATH = '/profile/settings';
export const PROFILE_HELP_PATH = '/profile/help';
export const PROFILE_ABOUT_PATH = '/profile/about';
export const ORG_EDIT_CHANNELS_PATH = '/org/channels/edit';
export const ORG_DETAILS_PATH = '/org/details';
export const ORG_NOTIFICATIONS_PATH = '/org/notifications';
export const ORG_INVITE_PATH = '/org/invite';
export const ORG_JOIN_PATH = '/org/join';
export const CREATE_EVENT_PATH = '/org/events/create';
export const EDIT_EVENT_PATH = '/org/events/single/:id/edit';
export const INVITE_PARTICIPANT_PATH = '/org/events/single/:id/invite';
export const PARTICIPANT_LIST_PATH = '/org/events/single/:id/participants';
export const SINGLE_EVENT_PATH = '/org/events/single/:id';
// index function paths
export const editEventPath = id => `/org/events/single/${id}/edit`;
export const inviteParticipantPath = id => `/org/events/single/${id}/invite`;
export const participantListPath = id =>
  `/org/events/single/${id}/participants`;
export const singleEventPath = id => `/org/events/single/${id}`;

/**
 * DASHBOARD
 */
export const D_ACTIVITY_PATH = 'activity';
export const D_SCHEDULE_PATH = 'schedule';
export const D_MESSAGES_PATH = 'messages';
export const D_CALENDAR_PATH = 'calendar';
export const D_TEAM_PATH = 'team';
export const D_HELP_PATH = 'help';
export const D_PROFILE_PATH = 'profile';

export const D_SCHEDULE_CURRENT_PATH = 'current';
export const D_SCHEDULE_DRAFTS_PATH = 'drafts';
// org dashboard
export const D_ORG_POSTS_PATH = 'posts';
export const D_ORG_EVENTS_PATH = 'events';
export const D_ORG_CHANNELS_PATH = 'channels';
export const D_ORG_WORKERS_PATH = 'workers';
export const D_ORG_SETTINGS_PATH = 'settings';

// dashbaord function paths
export const dashboardOrgItemPath = path => `${path}/org/:orgItem`;
export const dashboardMenuItemPath = path => `${path}/:menuItem`;

export const dashboardActivityPath = url => `${url}/${D_ACTIVITY_PATH}`;
export const dashboardSchedulePath = url => `${url}/${D_SCHEDULE_PATH}`;
export const dashboardMessagesPath = url => `${url}/${D_MESSAGES_PATH}`;
export const dashboardCalendarPath = url => `${url}/${D_CALENDAR_PATH}`;
export const dashboardTeamPath = url => `${url}/${D_TEAM_PATH}`;
export const dashboardHelpPath = url => `${url}/${D_HELP_PATH}`;
export const dashboardProfilePath = url => `${url}/${D_PROFILE_PATH}`;

export const dashboardScheduleCurrentPath = url =>
  `${url}/${D_SCHEDULE_CURRENT_PATH}`;
export const dashboardScheduleDraftsPath = url =>
  `${url}/${D_SCHEDULE_DRAFTS_PATH}`;
export const dashboardScheduleFilterPath = path => `${path}/:filter`;

export const dashboardOrgPostsPath = url => `${url}/org/${D_ORG_POSTS_PATH}`;
export const dashboardOrgEventsPath = url => `${url}/org/${D_ORG_EVENTS_PATH}`;
export const dashboardOrgChannelsPath = url =>
  `${url}/org/${D_ORG_CHANNELS_PATH}`;
export const dashboardOrgWorkersPath = url =>
  `${url}/org/${D_ORG_WORKERS_PATH}`;
export const dashboardOrgSettingsPath = url =>
  `${url}/org/${D_ORG_SETTINGS_PATH}`;

/**
 * EXTRAS
 */
export const buildUrl = url => `https://${url}`;
