import { Router } from "express";
import { referralController } from "../controllers/referral.controller.js";
import { authenticate } from "../middleware/authenticate.js";
import { authorize } from "../middleware/authorize.js";

const router = Router();

router.use(authenticate);

// Coordinator routes
router.use(authorize("referral_coordinator", "hospital_admin"));

router.get("/internal", referralController.getInternalQueue);
router.get("/history", referralController.getHistory);
router.get("/:id", referralController.getReferralById);
router.get("/:id/recommendations", referralController.getRecommendations);
router.post("/:id/send", referralController.sendReferral);
router.post("/:id/cancel", referralController.cancelReferral);

router.get('/incoming', authorize('hospital_admin'), (req, res, next) => referralController.getIncomingReferrals(req, res).catch(next));
router.post('/:id/accept', authorize('hospital_admin'), (req, res, next) => referralController.acceptReferral(req, res).catch(next));
router.post('/:id/reject', authorize('hospital_admin'), (req, res, next) => referralController.rejectReferral(req, res).catch(next));

export default router;
