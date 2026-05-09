import { Button } from '@/components/ui/button';
import { useGenerateRoadmapMutation } from '@/queries/roadmap-query';
import { useRoadmapSetupAssessmentStatusQuery } from '@/queries/roadmap-setup-assessment-queries';

export function RoadmapEmptyState() {
  const { mutate } = useGenerateRoadmapMutation();
  const { data: roadmapStatusData, isPending } =
    useRoadmapSetupAssessmentStatusQuery();

  if (isPending) return <p>Loading...</p>;

  return (
    <Button
      onClick={() => {
        const { pickedPathwayId } = roadmapStatusData!.data;

        mutate({ pathwayId: pickedPathwayId });
      }}
    >
      Generate
    </Button>
  );
}
