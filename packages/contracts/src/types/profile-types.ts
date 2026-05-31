export type ProfileStatusResponse = {
  success: boolean;
  message: string;
  data: {
    user: {
      id: string;
      name?: string | null;
      email: string;
      image?: string | null;
      emailVerified?: boolean;
      createdAt?: string | Date;
      updatedAt?: string | Date;
    };
    assessments: {
      pathwayCompleted: boolean;
      roadmapSetupCompleted: boolean;
    };
  };
};
