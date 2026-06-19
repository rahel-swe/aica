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
import { m } from '../../paraglide/messages';

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
        <CardTitle className="text-lg">{m.profile_readiness_title()}</CardTitle>

        <CardDescription>{m.profile_readiness_description()}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <AssessmentStatusRow
          title={m.pathway_profile_title()}
          description={m.pathway_profile_description()}
          completed={pathwayAssessmentCompleted ?? false}
          actionTrigger={
            !pathwayAssessmentCompleted ? (
              <Button asChild variant="outline" size="lg">
                <Link to="/pathway-assessment">
                  <Play />
                  {m.start()}
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
                    {m.edit()}
                  </Button>
                }
                title={m.restart_pathway_profile_title()}
                description={m.restart_pathway_profile_description()}
                actionLabel={m.start()}
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
          title={m.roadmap_setup_title()}
          description={m.roadmap_setup_description()}
          completed={roadmapSetupCompleted ?? false}
          actionTrigger={
            <>
              {!roadmapSetupCompleted ? (
                <Button asChild variant="outline" size="lg">
                  <Link to="/roadmap-setup-assessment" viewTransition>
                    <Play />
                    {m.start()}
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
                      {m.edit()}
                    </Button>
                  }
                  title={m.update_roadmap_setup_title()}
                  description={m.update_roadmap_setup_description()}
                  actionLabel={m.update_setup()}
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
