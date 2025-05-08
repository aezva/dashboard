import { Language } from './LanguageContext';

export type TranslationKey = keyof typeof translations['en'];

export const translations = {
  en: {
    // Common
    'welcome': 'Welcome to NNIA',
    'save': 'Save',
    'cancel': 'Cancel',
    'next': 'Next',
    'previous': 'Previous',
    'finish': 'Finish',
    
    // Setup
    'setup.title': 'NNIA Setup',
    'setup.description': 'Customize your AI assistant to fit your business needs',
    'setup.businessInfo': 'Business Information',
    'setup.businessName': 'Business Name',
    'setup.industry': 'Industry',
    'setup.email': 'Email',
    
    // Integrations
    'integrations.title': 'Integrations',
    'integrations.shopify': 'Shopify',
    'integrations.whatsapp': 'WhatsApp Business',
    'integrations.email': 'Email',

    // Billing
    'billing.title': 'Credits and Subscription',
    'billing.description': 'Manage your credits and subscription plan',

    // Conversations
    'conversations.title': 'Conversations',
    'conversations.empty': 'No conversations yet',

    // Settings
    'settings.title': 'NNIA Settings',
    'settings.personalization': 'NNIA Personalization',
    'settings.assistantName': 'Assistant Name',
    'settings.description': 'Description',
    'settings.integration': 'Integration Settings',
    'settings.enableWidget': 'Enable Chat Widget',

    // Support
    'support.title': 'Support',
    'support.description': 'Get help and contact support',

    login: {
      title: 'Sign In',
      subtitle: 'Welcome back. Please sign in to continue.',
      form: {
        email: 'Email',
        password: 'Password',
        submit: 'Sign In',
        dontHaveAccount: "Don't have an account?",
        signUp: 'Sign Up'
      },
      errors: {
        required: 'This field is required',
        invalidEmail: 'Invalid email',
        invalidCredentials: 'Invalid credentials',
        generic: 'Error signing in'
      }
    },
    register: {
      title: 'Create Account',
      subtitle: 'Join NNIA. Create your account to get started.',
      form: {
        email: 'Email',
        password: 'Password',
        confirmPassword: 'Confirm Password',
        submit: 'Sign Up',
        alreadyHaveAccount: 'Already have an account?',
        signIn: 'Sign In'
      },
      errors: {
        required: 'This field is required',
        invalidEmail: 'Invalid email',
        minPassword: 'Password must be at least 6 characters',
        passwordMismatch: 'Passwords do not match',
        generic: 'Error signing up'
      }
    }
  },
  es: {
    // Common
    'welcome': 'Bienvenido a NNIA',
    'save': 'Guardar',
    'cancel': 'Cancelar',
    'next': 'Siguiente',
    'previous': 'Anterior',
    'finish': 'Finalizar',
    
    // Setup
    'setup.title': 'Configuración de NNIA',
    'setup.description': 'Personaliza tu asistente de IA para que se adapte a las necesidades de tu negocio',
    'setup.businessInfo': 'Información del Negocio',
    'setup.businessName': 'Nombre de la Empresa',
    'setup.industry': 'Industria',
    'setup.email': 'Email',
    
    // Integrations
    'integrations.title': 'Integraciones',
    'integrations.shopify': 'Shopify',
    'integrations.whatsapp': 'WhatsApp Business',
    'integrations.email': 'Email',

    // Billing
    'billing.title': 'Créditos y Suscripción',
    'billing.description': 'Administra tus créditos y plan de suscripción',

    // Conversations
    'conversations.title': 'Conversaciones',
    'conversations.empty': 'No hay conversaciones aún',

    // Settings
    'settings.title': 'Configuración de NNIA',
    'settings.personalization': 'Personalización de NNIA',
    'settings.assistantName': 'Nombre del Asistente',
    'settings.description': 'Descripción',
    'settings.integration': 'Configuración de Integración',
    'settings.enableWidget': 'Habilitar Widget de Chat',

    // Support
    'support.title': 'Soporte',
    'support.description': 'Obtén ayuda y contacta a soporte',

    login: {
      title: 'Iniciar Sesión',
      subtitle: 'Bienvenido al NNIA Dashboard. Por favor, inicia sesión para continuar.',
      form: {
        email: 'Correo electrónico',
        password: 'Contraseña',
        submit: 'Iniciar Sesión',
        dontHaveAccount: '¿No tienes una cuenta?',
        signUp: 'Regístrate'
      },
      errors: {
        required: 'Este campo es requerido',
        invalidEmail: 'Correo electrónico inválido',
        invalidCredentials: 'Credenciales inválidas',
        generic: 'Error al iniciar sesión'
      }
    },
    register: {
      title: 'Crear Cuenta',
      subtitle: 'Únete al NNIA Dashboard. Crea tu cuenta para comenzar.',
      form: {
        email: 'Correo electrónico',
        password: 'Contraseña',
        confirmPassword: 'Confirmar Contraseña',
        submit: 'Registrarse',
        alreadyHaveAccount: '¿Ya tienes una cuenta?',
        signIn: 'Inicia Sesión'
      },
      errors: {
        required: 'Este campo es requerido',
        invalidEmail: 'Correo electrónico inválido',
        minPassword: 'La contraseña debe tener al menos 6 caracteres',
        passwordMismatch: 'Las contraseñas no coinciden',
        generic: 'Error al registrar'
      }
    }
  }
} as const;

export function getTranslation(key: TranslationKey, language: Language): string {
  return translations[language][key];
} 