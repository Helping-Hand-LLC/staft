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
export const SINGLE_EVENT_PATH = '/org/events/single/:id';
export const EDIT_EVENT_PATH = '/org/events/single/:id/edit';
export const INVITE_PARTICIPANT_PATH = '/org/events/single/:id/invite';
export const PARTICIPANT_LIST_PATH = '/org/events/single/:id/participants';

// function paths
export const singleEventPath = id => `/org/events/single/${id}`;
export const editEventPath = id => `/org/events/single/${id}/edit`;
export const inviteParticipantPath = id => `/org/events/single/${id}/invite`;
export const participantListPath = id =>
  `/org/events/single/${id}/participants`;
