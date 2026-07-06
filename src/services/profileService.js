import profileData from '@/data/dummy/profile.json';
import settingsData from '@/data/dummy/settings.json';
import { delay } from '@/utils/async';

/**
 * Profile service — frontend data layer for user profile and workspace settings.
 * Replace dummy resolution with ASP.NET Core API calls (e.g. GET /api/profile).
 */

function buildProfileFormValues(user) {
  return {
    firstName: user.firstName,
    lastName: user.lastName,
    jobTitle: user.jobTitle,
    department: user.department,
    bio: user.bio,
    email: user.contact.email,
    phone: user.contact.phone,
    location: user.contact.location,
    slackHandle: user.contact.slackHandle,
  };
}

function mergeFormIntoUser(user, formValues) {
  return {
    ...user,
    firstName: formValues.firstName,
    lastName: formValues.lastName,
    displayName: `${formValues.firstName} ${formValues.lastName}`.trim(),
    jobTitle: formValues.jobTitle,
    department: formValues.department,
    bio: formValues.bio,
    avatar: {
      ...user.avatar,
      initials: `${formValues.firstName.charAt(0)}${formValues.lastName.charAt(0)}`.toUpperCase(),
    },
    contact: {
      email: formValues.email,
      phone: formValues.phone,
      location: formValues.location,
      slackHandle: formValues.slackHandle,
    },
  };
}

function buildSettingsFormValues(data) {
  return {
    theme: data.defaults.theme,
    language: data.defaults.language,
    timezone: data.defaults.timezone,
    notifications: { ...data.defaults.notifications },
    dashboard: { ...data.defaults.dashboard },
  };
}

export const profileService = {
  async getPageData() {
    await delay(400);
    return Promise.resolve(profileData);
  },

  async saveProfile(formValues, currentUser) {
    await delay(600);
    return Promise.resolve({
      success: true,
      user: mergeFormIntoUser(currentUser, formValues),
      savedAt: new Date().toISOString(),
    });
  },

  buildFormValues: buildProfileFormValues,

  async getSettingsPageData() {
    await delay(400);
    return Promise.resolve(settingsData);
  },

  async saveSettings(formValues) {
    await delay(600);
    return Promise.resolve({
      success: true,
      settings: formValues,
      savedAt: new Date().toISOString(),
    });
  },

  buildSettingsFormValues,
};

export default profileService;
