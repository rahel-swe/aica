import {
  School,
  GraduationCap,
  Award,
  Laptop,
  Briefcase,
  Coffee,
  Clock,
  Zap,
  Flame,
  Wind,
  CalendarDays,
  TrendingUp,
  Map,
  Wallet,
  WifiOff,
  Smartphone,
  Leaf,
  CalendarOff,
  Rocket,
  Scale,
  Brain,
} from 'lucide-react';

import type {
  PathwayAssessmentOption,
  PathwayAssessmentStepType,
} from './pathway-assessment-steps-data';

import type { RoadmapSetupAssessmentFormValues } from '@contracts/shared/types/roadmap-setup-assessment-types';

import { m } from '../paraglide/messages';

export const roadmapSetupDefaultValues: RoadmapSetupAssessmentFormValues = {
  constraints: ['beginner'],
  currentStage: 'self_learning',
  roadmapStyle: 'balanced',
  timeline: 'medium',
  weeklyTime: 'medium',
};

export type RoadmapStepId =
  | 'welcome'
  | 'current-stage'
  | 'weekly-time'
  | 'timeline'
  | 'constraints'
  | 'roadmap-style'
  | 'finish';

export type RoadmapSetupStep = {
  id: RoadmapStepId;
  type: PathwayAssessmentStepType;
  title: string;
  description?: string;
  helperText?: string;
  fieldName?: keyof RoadmapSetupAssessmentFormValues;
  minSelect?: number;
  maxSelect?: number;
  options?: PathwayAssessmentOption[];
};

const currentStageOptions: PathwayAssessmentOption[] = [
  {
    value: 'high_school',
    label: m.roadmap_setup_current_stage_high_school_label(),
    description: m.roadmap_setup_current_stage_high_school_description(),
    icon: School,
  },
  {
    value: 'university',
    label: m.roadmap_setup_current_stage_university_label(),
    description: m.roadmap_setup_current_stage_university_description(),
    icon: GraduationCap,
  },
  {
    value: 'graduate',
    label: m.roadmap_setup_current_stage_graduate_label(),
    description: m.roadmap_setup_current_stage_graduate_description(),
    icon: Award,
  },
  {
    value: 'self_learning',
    label: m.roadmap_setup_current_stage_self_learning_label(),
    description: m.roadmap_setup_current_stage_self_learning_description(),
    icon: Laptop,
  },
  {
    value: 'working',
    label: m.roadmap_setup_current_stage_working_label(),
    description: m.roadmap_setup_current_stage_working_description(),
    icon: Briefcase,
  },
];

const weeklyTimeOptions: PathwayAssessmentOption[] = [
  {
    value: 'low',
    label: m.roadmap_setup_weekly_time_low_label(),
    description: m.roadmap_setup_weekly_time_low_description(),
    icon: Coffee,
  },
  {
    value: 'medium',
    label: m.roadmap_setup_weekly_time_medium_label(),
    description: m.roadmap_setup_weekly_time_medium_description(),
    icon: Clock,
  },
  {
    value: 'high',
    label: m.roadmap_setup_weekly_time_high_label(),
    description: m.roadmap_setup_weekly_time_high_description(),
    icon: Zap,
  },
  {
    value: 'intense',
    label: m.roadmap_setup_weekly_time_intense_label(),
    description: m.roadmap_setup_weekly_time_intense_description(),
    icon: Flame,
  },
];

const timelineOptions: PathwayAssessmentOption[] = [
  {
    value: 'sprint',
    label: m.roadmap_setup_timeline_sprint_label(),
    description: m.roadmap_setup_timeline_sprint_description(),
    icon: Wind,
  },
  {
    value: 'short',
    label: m.roadmap_setup_timeline_short_label(),
    description: m.roadmap_setup_timeline_short_description(),
    icon: CalendarDays,
  },
  {
    value: 'medium',
    label: m.roadmap_setup_timeline_medium_label(),
    description: m.roadmap_setup_timeline_medium_description(),
    icon: TrendingUp,
  },
  {
    value: 'long',
    label: m.roadmap_setup_timeline_long_label(),
    description: m.roadmap_setup_timeline_long_description(),
    icon: Map,
  },
] as const;

const constraintOptions: PathwayAssessmentOption[] = [
  {
    value: 'low_budget',
    label: m.roadmap_setup_constraints_low_budget_label(),
    description: m.roadmap_setup_constraints_low_budget_description(),
    icon: Wallet,
  },
  {
    value: 'weak_internet',
    label: m.roadmap_setup_constraints_weak_internet_label(),
    description: m.roadmap_setup_constraints_weak_internet_description(),
    icon: WifiOff,
  },
  {
    value: 'no_laptop',
    label: m.roadmap_setup_constraints_no_laptop_label(),
    description: m.roadmap_setup_constraints_no_laptop_description(),
    icon: Smartphone,
  },
  {
    value: 'beginner',
    label: m.roadmap_setup_constraints_beginner_label(),
    description: m.roadmap_setup_constraints_beginner_description(),
    icon: Leaf,
  },
  {
    value: 'inconsistent_schedule',
    label: m.roadmap_setup_constraints_inconsistent_schedule_label(),
    description:
      m.roadmap_setup_constraints_inconsistent_schedule_description(),
    icon: CalendarOff,
  },
];

const roadmapStyleOptions: PathwayAssessmentOption[] = [
  {
    value: 'fast_track',
    label: m.roadmap_setup_roadmap_style_fast_track_label(),
    description: m.roadmap_setup_roadmap_style_fast_track_description(),
    icon: Rocket,
  },
  {
    value: 'balanced',
    label: m.roadmap_setup_roadmap_style_balanced_label(),
    description: m.roadmap_setup_roadmap_style_balanced_description(),
    icon: Scale,
  },
  {
    value: 'deep',
    label: m.roadmap_setup_roadmap_style_deep_label(),
    description: m.roadmap_setup_roadmap_style_deep_description(),
    icon: Brain,
  },
];

export const ROADMAP_SETUP_STEPS: RoadmapSetupStep[] = [
  {
    id: 'welcome',
    type: 'intro',
    title: m.roadmap_setup_welcome_title(),
    helperText: m.roadmap_setup_welcome_helper(),
  },
  {
    id: 'current-stage',
    type: 'single-select',
    title: m.roadmap_setup_current_stage_title(),
    fieldName: 'currentStage',
    options: currentStageOptions,
  },
  {
    id: 'weekly-time',
    type: 'single-select',
    title: m.roadmap_setup_weekly_time_title(),
    fieldName: 'weeklyTime',
    options: weeklyTimeOptions,
  },
  {
    id: 'timeline',
    type: 'single-select',
    title: m.roadmap_setup_timeline_title(),
    helperText: m.roadmap_setup_timeline_helper(),
    fieldName: 'timeline',
    options: timelineOptions,
  },
  {
    id: 'constraints',
    type: 'multi-select',
    title: m.roadmap_setup_constraints_title(),
    fieldName: 'constraints',
    minSelect: 0,
    maxSelect: 3,
    options: constraintOptions,
  },
  {
    id: 'roadmap-style',
    type: 'single-select',
    title: m.roadmap_setup_roadmap_style_title(),
    fieldName: 'roadmapStyle',
    options: roadmapStyleOptions,
  },
  {
    id: 'finish',
    type: 'cta',
    title: m.roadmap_setup_finish_title(),
    description: m.roadmap_setup_finish_description(),
  },
] as const;
