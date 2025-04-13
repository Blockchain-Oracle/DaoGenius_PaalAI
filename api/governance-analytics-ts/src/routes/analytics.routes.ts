import { Router } from 'express';
import { AnalyticsController } from '../controllers/analytics.controller';
import { authenticate } from '../middleware/auth';

// Create router
const router: Router = Router();

// Create controller instance
const analyticsController = new AnalyticsController();

/**
 * @route   GET /api/analytics
 * @desc    Get governance analytics overview
 * @access  Private
 */
router.get('/', authenticate, analyticsController.getAnalytics);

/**
 * @route   GET /api/analytics/proposals
 * @desc    Get detailed proposal analytics
 * @access  Private
 */
router.get('/proposals', authenticate, analyticsController.getProposalAnalytics);

/**
 * @route   GET /api/analytics/voters
 * @desc    Get voter analytics
 * @access  Private
 */
router.get('/voters', authenticate, analyticsController.getVoterAnalytics);

/**
 * @route   GET /api/analytics/compare
 * @desc    Compare DAO against similar DAOs
 * @access  Private
 */
router.get('/compare', authenticate, analyticsController.getComparison);

export default router; 