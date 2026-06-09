import type { RoadmapResource } from '@contracts/shared/types/roadmap-types';
import RoadmapResourceItem from './roadmap-resource-item';

const RoadmapStepCardResources = ({
  stepResources,
}: {
  stepResources: RoadmapResource[];
}) => {
  if (!stepResources?.length) return null;

  return (
    <section className="space-y-3">
      <h3 className="text-sm">Suggested resources</h3>

      <ul className="flex flex-wrap">
        {stepResources.map((resource) => (
          <li key={resource.url ?? resource.title}>
            <RoadmapResourceItem resource={resource} />
          </li>
        ))}
      </ul>
    </section>
  );
};

export default RoadmapStepCardResources;
