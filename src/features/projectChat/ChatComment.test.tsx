import { describe, it, expect, vi } from 'vitest';
import { render, fireEvent, screen } from '@testing-library/react';
import { ChatComment } from './ChatComment';
import { Comment } from '@src/services/api/index';

vi.mock('@src/services/api/hooks/projects', () => ({
  useDeleteComment: vi.fn(() => ({
    mutate: vi.fn(),
    isPending: false,
  })),
}));

const mockComment: Comment = {
  _id: 1,
  created_at: '2024-01-07T13:08:30.164Z',
  images: [],
  message: 'test message',
  project_id: 1,
  status: 'read',
  updated_at: '2024-01-07T13:08:30.164Z',
};

const deleteMock = vi.fn();

describe('ChatComment Component', () => {
  it('renders correctly', () => {
    render(<ChatComment message={mockComment} openImageGallery={() => {}} />);
    expect(screen.getByText(new Date(mockComment.created_at).toLocaleDateString('pl'))).toBeVisible();
    expect(screen.getByText(mockComment.message)).toBeVisible();
  });

  it('triggers delete function on trash icon click', async () => {
    vi.mock('@src/services/api/hooks/projects', () => ({
      useDeleteComment: vi.fn(() => ({
        mutate: deleteMock,
        isPending: false,
      })),
    }));

    render(<ChatComment message={mockComment} openImageGallery={() => {}} />);
    const deleteButton = screen.getByRole('button');
    fireEvent.click(deleteButton);
    expect(deleteMock).toHaveBeenCalled();
  });
});
