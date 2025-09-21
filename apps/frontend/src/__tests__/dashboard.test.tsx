import React from 'react';
import { render } from '@testing-library/react';
import DashboardPage from '../app/[locale]/(dashboard)/dashboard/page';

jest.mock('next-intl', () => ({
  NextIntlClientProvider: ({ children }: { children: React.ReactNode }) => <>{children}</>,
}));

jest.mock('next-intl/server', () => ({
  getTranslations: async () => (key: string) => {
    const messages: Record<string, string> = {
      openCases: 'Dossiers ouverts',
      pendingSignature: 'En signature',
      overdue: 'En retard',
    };
    return messages[key];
  },
}));

test('renders dashboard headline', async () => {
  const view = await DashboardPage();
  const { findByText } = render(<>{view}</>);

  expect(await findByText(/Dossiers ouverts/)).toBeInTheDocument();
});
