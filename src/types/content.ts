import {
  Profile,
  Skill,
  Project,
  Achievement,
  Experience,
  SocialLink,
  SectionSetting,
  SiteSettingsMap,
  ActivityLog,
} from './database';

export interface WebsiteContent {
  profile: Profile;
  skills: Skill[];
  projects: Project[];
  achievements: Achievement[];
  experiences: Experience[];
  socialLinks: SocialLink[];
  sections: SectionSetting[];
  settings: SiteSettingsMap;
  lastUpdated?: string;
}

export interface PublishResult {
  success: boolean;
  versionNumber?: number;
  publishedAt?: string;
  error?: string;
}

export interface StatsOverview {
  publishedProjects: number;
  draftProjects: number;
  activeAchievements: number;
  experiencesCount: number;
  skillsCount: number;
  lastPublishedAt: string | null;
  recentLogs: ActivityLog[];
}
