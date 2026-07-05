import profileData from '@/data/dummy/profile.json';
import { delay } from '@/utils/async';

const LOAD_DELAY_MS = 400;
const SAVE_DELAY_MS = 600;

function buildFormValues(user) {
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

export const profileService = {
  async getPageData() {
    await delay(LOAD_DELAY_MS);
    return profileData;
  },

  async saveProfile(formValues, currentUser) {
    await delay(SAVE_DELAY_MS);
    return {
      success: true,
      user: mergeFormIntoUser(currentUser, formValues),
      savedAt: new Date().toISOString(),
    };
  },

  buildFormValues,
};

export default profileService;
