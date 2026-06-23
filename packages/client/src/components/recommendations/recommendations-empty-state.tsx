import { useNavigate } from 'react-router-dom';

import { Button } from '@/components/ui/button';
import { useGenerateRecommendationsMutation } from '@/queries/recommendation-query';

import { m } from '../../paraglide/messages';

type RecommendationsEmptyStateProps = {
  pathwayAssessmentCompleted: boolean;
};

const RecommendationsEmptyState = ({
  pathwayAssessmentCompleted,
}: RecommendationsEmptyStateProps) => {
  const navigate = useNavigate();

  const { mutate: generateRecommendations, isPending: isGenerating } =
    useGenerateRecommendationsMutation();

  const title = pathwayAssessmentCompleted
    ? m.pathway_recommendations_empty_no_recommendations_title()
    : m.pathway_recommendations_empty_complete_assessment_title();

  const description = pathwayAssessmentCompleted
    ? m.pathway_recommendations_empty_no_recommendations_description()
    : m.pathway_recommendations_empty_complete_assessment_description();

  const buttonLabel = pathwayAssessmentCompleted
    ? isGenerating
      ? m.pathway_recommendations_empty_generating_button()
      : m.pathway_recommendations_empty_generate_button()
    : m.pathway_recommendations_empty_start_assessment_button();

  const handleClick = () => {
    if (pathwayAssessmentCompleted) {
      generateRecommendations();
      return;
    }

    navigate('/pathway-assessment');
  };

  return (
    <div className="grid min-h-dvh place-items-center px-6">
      <div className="w-full max-w-md  text-center">
        <h1 className="text-2xl font-semibold tracking-tight font-heading">
          {title}
        </h1>

        <p className="mt-3 text-sm leading-6 text-muted-foreground">
          {description}
        </p>

        <Button
          onClick={handleClick}
          disabled={pathwayAssessmentCompleted && isGenerating}
          className="mt-6 py-7 min-w-[220px]"
          size="lg"
        >
          {buttonLabel}
        </Button>
      </div>
    </div>
  );
};

export default RecommendationsEmptyState;
