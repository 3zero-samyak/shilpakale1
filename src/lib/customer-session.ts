/**
 * Customer Session Interface
 * 
 * Prepared for future Shopify Customer Account API integration.
 * Currently returns unauthenticated state until Shopify connection is completed.
 * 
 * Do not store authentication state in localStorage.
 * Do not simulate authenticated sessions.
 */

export type CustomerSession = {
  isAuthenticated: boolean;
  customer?: {
    firstName?: string;
    lastName?: string;
    email?: string;
    mobileNumber?: string;
  };
};

/**
 * Hook to access customer session state
 * 
 * @returns CustomerSession object with authentication status
 * 
 * TODO: Replace with Shopify Customer Account API session provider
 */
export function useCustomerSession(): CustomerSession {
  // TODO: Connect to Shopify Customer Account API
  // This will be replaced with actual Shopify session management
  
  return {
    isAuthenticated: false,
  };
}

/**
 * Sign In Form Values
 */
export type SignInValues = {
  email: string;
  password: string;
  agreeToTerms: boolean;
};

/**
 * Submit sign-in form
 * 
 * @param values - Sign-in form values
 * 
 * TODO: Connect to Shopify Customer Account API sign-in endpoint
 */
export async function submitSignInForm(values: SignInValues): Promise<{ success: boolean; message: string }> {
  // TODO: Connect to Shopify Customer Account API
  
  // Validation for required fields
  if (!values.email || !values.password || !values.agreeToTerms) {
    return {
      success: false,
      message: 'All fields are required',
    };
  }
  
  // Do not store credentials
  // Do not create fake sessions
  // Do not write to localStorage
  
  return {
    success: false,
    message: 'Customer account sign-in will be enabled when the Shopify connection is completed.',
  };
}

/**
 * Create Account Form Values
 */
export type CreateAccountValues = {
  firstName: string;
  lastName: string;
  email: string;
  mobileNumber: string;
  password: string;
  confirmPassword: string;
};

/**
 * Submit create account form
 * 
 * @param values - Create account form values
 * 
 * TODO: Connect to Shopify Customer Account API create account endpoint
 */
export async function submitCreateAccountForm(values: CreateAccountValues): Promise<{ success: boolean; message: string }> {
  // TODO: Connect to Shopify Customer Account API
  
  // Validation
  if (!values.firstName || !values.lastName || !values.email || !values.mobileNumber || !values.password || !values.confirmPassword) {
    return {
      success: false,
      message: 'All fields are required',
    };
  }
  
  if (values.password !== values.confirmPassword) {
    return {
      success: false,
      message: 'Passwords do not match',
    };
  }
  
  // Do not store account details
  // Do not create fake accounts
  
  return {
    success: false,
    message: 'Customer account creation will be enabled when the Shopify connection is completed.',
  };
}

/**
 * Forgot Password Form Values
 */
export type ForgotPasswordValues = {
  email: string;
};

/**
 * Submit forgot password form
 * 
 * @param values - Forgot password form values
 * 
 * TODO: Connect to Shopify Customer Account API password reset endpoint
 */
export async function submitForgotPasswordForm(values: ForgotPasswordValues): Promise<{ success: boolean; message: string }> {
  // TODO: Connect to Shopify Customer Account API
  
  if (!values.email) {
    return {
      success: false,
      message: 'Email is required',
    };
  }
  
  // Do not pretend email was sent
  
  return {
    success: false,
    message: 'Password recovery will be enabled when the Shopify connection is completed.',
  };
}

/**
 * Enquiry Form Values
 */
export type EnquiryFormValues = {
  firstName: string;
  lastName: string;
  email?: string; // Only required when not authenticated
  mobileNumber: string;
  suggestion: string;
  source?: string; // product handle, collection slug, or page context
};

/**
 * Submit enquiry form
 * 
 * @param values - Enquiry form values
 * @param session - Current customer session
 * 
 * TODO: Send through approved Shopify/customer-enquiry workflow
 */
export async function submitEnquiry(values: EnquiryFormValues, session: CustomerSession): Promise<{ success: boolean; message: string }> {
  // TODO: Send through the approved Shopify/customer-enquiry workflow
  
  // Validation
  if (!values.firstName || !values.lastName || !values.mobileNumber || !values.suggestion) {
    return {
      success: false,
      message: 'All fields are required',
    };
  }
  
  // Email is required when not authenticated
  if (!session.isAuthenticated && !values.email) {
    return {
      success: false,
      message: 'Email is required',
    };
  }
  
  // Minimum suggestion length
  if (values.suggestion.length < 10) {
    return {
      success: false,
      message: 'Please provide at least 10 characters for your message',
    };
  }
  
  // Do not save enquiry details in localStorage
  // Do not log personal details to console
  // Do not pretend the enquiry was delivered
  
  return {
    success: false,
    message: 'Online enquiries will be enabled when the Shopify connection is completed.',
  };
}
