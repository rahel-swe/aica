import { Separator } from '@/components/ui/separator';
import { useProfileStatusQuery } from '@/queries/profile-query';
import { useRoadmapQuery } from '@/queries/roadmap-query';
import { Pencil, Play } from 'lucide-react';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import ActionDialog from '../action-dialog';
import ErrorState from '../error-state';
import { Button } from '../ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '../ui/card';
import { AssessmentStatusRow } from './assessment-status-row';

const ProfileReadness = () => {
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
                    onClick={() => setOpenPathwayAssessmentDialog(true)}
                  >
                    <Pencil />
                    Edit
                  </Button>
                }
                title="Restart pathway profile?"
                description="This will regenarate your recommendations!"
                actionLabel="Start"
                onAction={() => {
                  navigate('/pathway-assessment', {
                    viewTransition: true,
                  });
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
                  description="May you need to regenerate your roadmap, and use your updated preferences."
                  actionLabel="Update Setup"
                  onAction={() => {
                    if (roadmapData) {
                      navigate('/roadmap-setup-assessment', {
                        viewTransition: true,
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
