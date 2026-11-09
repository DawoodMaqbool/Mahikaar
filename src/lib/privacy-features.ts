/** Temporary hold until the Privacy Policy is finalized and approved.
 * Defaults OFF in every environment, including Production. Set to exactly
 * "true" at build time to restore the policy and allow configured, opt-in GA4.
 * See docs/analytics.md for reactivation prerequisites.
 */
export const privacyFeaturesEnabled = process.env.NEXT_PUBLIC_PRIVACY_FEATURES_ENABLED === 'true';
