// --- ROUTE PATHS
import * as paths from './paths';

// --- ROUTES
import pages from './pages';

export const routes = [
  { path: paths.INDEX_PATH, component: pages.Index },
  { path: paths.LOGIN_PATH, component: pages.Login },
  { path: paths.REGISTER_PATH, component: pages.Register },
  { path: paths.DASHBOARD_PATH, component: pages.Dashboard },
  { path: paths.CREATE_ORG_PATH, component: pages.CreateOrg },
  { path: paths.SCHEDULE_ARCHIVE_PATH, component: pages.Archive },
  { path: paths.EDIT_PROFILE_PATH, component: pages.ProfileForm },
  { path: paths.PROFILE_SETTINGS_PATH, component: pages.Settings },
  { path: paths.PROFILE_HELP_PATH, component: pages.Help },
  { path: paths.PROFILE_ABOUT_PATH, component: pages.About },
  { path: paths.ORG_EDIT_CHANNELS_PATH, component: pages.EditChannels },
  { path: paths.ORG_DETAILS_PATH, component: pages.Details },
  { path: paths.ORG_NOTIFICATIONS_PATH, component: pages.Notifications },
  { path: paths.ORG_INVITE_PATH, component: pages.Invite },
  { path: paths.ORG_JOIN_PATH, component: pages.Join },
  { path: paths.CREATE_EVENT_PATH, component: pages.CreateEvent },
  { path: paths.SINGLE_EVENT_PATH, component: pages.SingleEvent },
  { path: paths.EDIT_EVENT_PATH, component: pages.EditEvent },
  { path: paths.INVITE_PARTICIPANT_PATH, component: pages.InviteParticipant },
  { path: paths.PARTICIPANT_LIST_PATH, component: pages.ParticipantList }
];
