/**
 * Route map:
 *   POST   /generate                  → generate recommendations for auth user
 *   GET    /me                        → get stored overview (read-only)
 *   GET    /:id/explanation           → on-demand "Why?" LLM explanation
 *
 *   POST   /admin/rescore/user/:id    → admin: rescore one specific user
 *   POST   /admin/rescore/pathway     → admin: rescore all users for a pathway slug
 *   POST   /admin/rescore/stale       → admin: batch rescore stale recommendations
 *   GET    /admin/rescore/stale/count → admin: how many users are stale
 */

import { Router } from 'express';

import { authorize } from '../middleware/auth-middleware';
import { recommendationController } from '../controller/recommendation-controller';

const recommendationRouter = Router();

recommendationRouter.post(
  '/generate',
  authorize,
  recommendationController.generate
);

recommendationRouter.get(
  '/me',
  authorize,
  recommendationController.getOverview
);

recommendationRouter.get(
  '/:id/explanation',
  authorize,
  recommendationController.getExplanation
);

// recommendationRouter.post(
//   '/admin/rescore/user/:id',
//   authorize,
//   authorizeAdmin,
//   recommendationController.rescoreUser
// );

// recommendationRouter.post(
//   '/admin/rescore/pathway',
//   authorize,
//   authorizeAdmin,
//   recommendationController.rescoreByPathway
// );

// recommendationRouter.post(
//   '/admin/rescore/stale',
//   authorize,
//   authorizeAdmin,
//   recommendationController.rescoreStale
// );

// recommendationRouter.get(
//   '/admin/rescore/stale/count',
//   authorize,
//   authorizeAdmin,
//   recommendationController.getStaleCount
// );

export default recommendationRouter;
