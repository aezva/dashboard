'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import styles from './Login.module.css';
import { useLanguage } from '../../shared/i18n/LanguageContext';
import { translations } from '../../shared/i18n/translations';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import LoadingSpinner from '../LoadingSpinner';
import { useAuth } from '../../shared/auth/AuthContext';

const Login: React.FC = () => {
  const { language } = useLanguage();
  const router = useRouter();
  const t = translations[language].login;
  const supabase = createClientComponentClient();
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();

  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!email) {
      newErrors.email = t.errors.required;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = t.errors.invalidEmail;
    }
    if (!password) {
      newErrors.password = t.errors.required;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsLoading(true);
    try {
      await login(email, password);
    } catch (error) {
      console.error('Error en login:', error);
      setErrors({ submit: t.errors.generic });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      {isLoading && <LoadingSpinner />}
      <div className={styles.loginBox}>
        <div className={styles.logoContainer}>
          <div className={styles.logo}>NNIA</div>
        </div>
        <h1 className={styles.title}>{t.title}</h1>
        <p className={styles.subtitle}>{t.subtitle}</p>
        
        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.inputGroup}>
            <label className={styles.label} htmlFor="email">
              {t.form.email}
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={styles.input}
              placeholder="Email"
              required
            />
            {errors.email && <span className={styles.error}>{errors.email}</span>}
          </div>

          <div className={styles.inputGroup}>
            <label className={styles.label} htmlFor="password">
              {t.form.password}
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={styles.input}
              placeholder="Password"
              required
            />
            {errors.password && <span className={styles.error}>{errors.password}</span>}
          </div>

          {errors.submit && <span className={styles.error}>{errors.submit}</span>}

          <button type="submit" className={styles.submitButton}>
            {t.form.submit}
          </button>
        </form>

        <div className={styles.signUpLink}>
          {t.form.dontHaveAccount}{' '}
          <Link href="/register">{t.form.signUp}</Link>
        </div>
      </div>
    </div>
  );
};

export default Login; 