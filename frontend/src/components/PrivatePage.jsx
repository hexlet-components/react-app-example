// @ts-check

import React from 'react';
import { useTranslation } from 'react-i18next';

import { useAuth } from '../hooks/index.js';

const PrivatePage = () => {
  const { t } = useTranslation();
  const { user: { username } } = useAuth();

  return (
    <div className="text-center mt-5">
      <h1 className="h4 text-muted">
        {t('private.header')}
      </h1>
      <p className="text-muted">
        {t('private.message', { username })}
      </p>
    </div>
  );
};

export default PrivatePage;
