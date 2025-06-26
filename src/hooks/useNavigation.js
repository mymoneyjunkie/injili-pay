import { useNavigate } from 'react-router-dom';

/**
 * Custom hook to handle navigation in the application
 * @returns {Object} Navigation utility functions
 */
const useNavigation = () => {
  const navigate = useNavigate();

  /**
   * Navigate to home page (authenticated)
   */
  const goToHome = () => {
    navigate('/home', { replace: true });
  };

  /**
   * Navigate to landing page (unauthenticated)
   */
  const goToLanding = () => {
    navigate('/', { replace: true });
  };

  /**
   * Navigate to the pricing page
   */
  const goToPricing = () => {
    navigate('/pricing');
  };

  /**
   * Navigate to the changelog page
   */
  const goToChangelog = () => {
    navigate('/changelog');
  };

  /**
   * Navigate to the billing page
   */
  const goToBilling = () => {
    navigate('/billing');
  };

  return {
    goToHome,
    goToLanding,
    goToPricing,
    goToChangelog,
    goToBilling,
    navigate,
  };
};

export default useNavigation; 