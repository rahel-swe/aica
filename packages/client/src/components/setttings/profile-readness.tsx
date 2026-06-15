import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '../ui/card';
import { Separator } from '@/components/ui/separator';
import { AssessmentStatusRow } from './assessment-status-row';
import { useProfileStatusQuery } from '@/queries/profile-query';
import {
  useRoadmapDeleteMutation,
  useRoadmapQuery,
} from '@/queries/roadmap-query';
import { useRoadmapSetupAssessmentDeleteMutation } from '@/queries/roadmap-setup-assessment-queries';
import { Button } from '../ui/button';
import { Pencil, Play } from 'lucide-react';
import ErrorState from '../error-state';
import ActionDialog from '../action-dialog';
import { Link, useNavigate } from 'react-router-dom';
import { usePathwayAssessmentDeleteMutationQuery } from '@/queries/pathway-assessment-query';
import { useRecommendationDeleteMutationQuery } from '@/queries/recommendation-query';
import { useState } from 'react';

const ProfileReadness = () => {
  const { mutateAsync: deleteRoadmap, isPending: isRoadmapDeleting } =
    useRoadmapDeleteMutation();

  const { mutateAsync: deleteRoadmapSetup, isPending: isRoadmpaSetupDeleting } =
    useRoadmapSetupAssessmentDeleteMutation();

  const {
    mutateAsync: deleteMyRecommendations,
    isPending: isRecommendationsDeleting,
  } = useRecommendationDeleteMutationQuery();

  const {
    mutateAsync: deletePathwayAssessment,
    isPending: isPathwayAssessmentDeleting,
  } = usePathwayAssessmentDeleteMutationQuery();

  const { data: roadmapQueryResponse, isPending: isRoadmapPending } =
    useRoadmapQuery();

  const navigate = useNavigate();

  const {
    data: profileStatus,
    isPending: isProfilePending,
    refetch,
  } = useProfileStatusQuery();

  const [openPathwayAssessmentDialog, setOpenPathwayAssessmentDialog] =
    useState(false);
  const [openRoadmapAssessmentDialog, setOpenRoadmapAssessmentDialog] =
    useState(false);

  if (isProfilePending || isRoadmapPending) return <p>Pending...</p>;

  if (!profileStatus?.data) return <ErrorState onRetry={refetch} />;

  const {
    assessments: {
      pathwayAssessmentCompleted,
      pathwayAssessmentId,
      roadmapSetupAssessmentId,
      roadmapSetupCompleted,
    },
  } = profileStatus!.data;

  const roadmapData = roadmapQueryResponse?.data;

  return (
    <Card className="shadow-none">
      <CardHeader>
        <CardTitle className="text-lg">Readiness</CardTitle>
        <CardDescription>
          These are the profile inputs AICA uses before stronger guidance.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <AssessmentStatusRow
          title="Pathway profile"
          description="Strengths, interests, goals, and work preferences."
          completed={pathwayAssessmentCompleted ?? false}
          actionTrigger={
            !pathwayAssessmentCompleted ? (
              <Button asChild variant="outline" size="lg">
                <Link to="/pathway-assessment">
                  <Play />
                  Start
                </Link>
              </Button>
            ) : (
              <ActionDialog
                open={openPathwayAssessmentDialog}
                setOpen={setOpenPathwayAssessmentDialog}
                trigger={
                  <Button
                    variant="outline"
                    size="lg"
                    disabled={
                      isRoadmapDeleting ||
                      isRoadmpaSetupDeleting ||
                      isPathwayAssessmentDeleting ||
                      isRecommendationsDeleting
                    }
                    onClick={() => setOpenPathwayAssessmentDialog(true)}
                  >
                    <Pencil />
                    Edit
                  </Button>
                }
                title="Restart pathway profile?"
                description="This will remove your pathway profile, recommendations, roadmap setup, and generated roadmap. You'll need to complete the assessment again."
                actionLabel="Start over"
                onAction={async () => {
                  try {
                    await Promise.all([
                      roadmapData?._id
                        ? deleteRoadmap(roadmapData._id)
                        : Promise.resolve(),
                      deleteRoadmapSetup(roadmapSetupAssessmentId),
                      deletePathwayAssessment(pathwayAssessmentId),
                      deleteMyRecommendations(),
                    ]);

                    navigate('/pathway-assessment', {
                      viewTransition: true,
                    });
                  } catch (error) {
                    console.log(error);
                  }
                }}
              />
            )
          }
        />
        <Separator />
        <AssessmentStatusRow
          title="Roadmap setup"
          description="Starting point, weekly time, constraints, and plan style."
          completed={roadmapSetupCompleted ?? false}
          actionTrigger={
            <>
              {!roadmapSetupCompleted ? (
                <Button asChild variant="outline" size="lg">
                  <Link to="/roadmap-setup-assessment" viewTransition>
                    <Play />
                    Start
                  </Link>
                </Button>
              ) : (
                <ActionDialog
                  open={openRoadmapAssessmentDialog}
                  setOpen={setOpenRoadmapAssessmentDialog}
                  trigger={
                    <Button
                      variant="outline"
                      size="lg"
                      disabled={
                        isRoadmapDeleting ||
                        isRoadmpaSetupDeleting ||
                        isPathwayAssessmentDeleting ||
                        isRecommendationsDeleting
                      }
                      onClick={() => {
                        if (roadmapData) setOpenRoadmapAssessmentDialog(true);
                        else
                          navigate('/roadmap-setup-assessment', {
                            viewTransition: true,
                          });
                      }}
                    >
                      <Pencil />
                      Edit
                    </Button>
                  }
                  title="Update roadmap setup?"
                  description="This will delete your current roadmap and generate a new one using your updated preferences."
                  actionLabel="Update Setup"
                  onAction={() => {
                    if (roadmapData) {
                      deleteRoadmap(roadmapData!._id, {
                        onSuccess: () => {
                          navigate('/roadmap-setup-assessment', {
                            viewTransition: true,
                          });
                        },
                      });
                      return;
                    }

                    navigate('/roadmap-setup-assessment', {
                      viewTransition: true,
                    });
                  }}
                />
              )}
            </>
          }
        />
      </CardContent>
    </Card>
  );
};

export default ProfileReadness;
