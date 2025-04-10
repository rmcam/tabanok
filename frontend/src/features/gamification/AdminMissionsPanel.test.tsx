import { render, screen } from '@testing-library/react';
import AdminMissionsPanel from './AdminMissionsPanel';

describe('AdminMissionsPanel', () => {
  it('debe renderizar el panel de administración de misiones', () => {
    render(<AdminMissionsPanel />);

    expect(screen.getByText(/misiones/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /crear/i })).toBeInTheDocument();
  });
});
