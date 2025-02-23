import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import AppForm from '../../../components/apps/app-form';

describe('AppForm', () => {
  it('基本的なフォーム要素が表示されること', () => {
    render(<AppForm />);
    
    // 必須フィールドの存在確認
    expect(screen.getByLabelText(/アプリ名/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/説明/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/開発言語/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/GitHub URL/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/ステータス/i)).toBeInTheDocument();
    
    // 送信ボタンの確認
    expect(screen.getByRole('button', { name: /登録/i })).toBeInTheDocument();
  });

  it('フォーム入力が正しく動作すること', () => {
    render(<AppForm />);
    
    const nameInput = screen.getByLabelText(/アプリ名/i);
    const descriptionInput = screen.getByLabelText(/説明/i);
    const githubUrlInput = screen.getByLabelText(/GitHub URL/i);

    // 入力のテスト
    fireEvent.change(nameInput, { target: { value: 'テストアプリ' } });
    fireEvent.change(descriptionInput, { target: { value: 'テストの説明文' } });
    fireEvent.change(githubUrlInput, { target: { value: 'https://github.com/test/repo' } });

    expect(nameInput).toHaveValue('テストアプリ');
    expect(descriptionInput).toHaveValue('テストの説明文');
    expect(githubUrlInput).toHaveValue('https://github.com/test/repo');
  });

  it('必須フィールドのバリデーションが機能すること', async () => {
    render(<AppForm />);
    
    // 空の状態で送信
    const submitButton = screen.getByRole('button', { name: /登録/i });
    fireEvent.click(submitButton);

    // エラーメッセージの確認
    expect(await screen.findByText('アプリ名は必須です')).toBeInTheDocument();
  });

  it('GitHubのURLバリデーションが機能すること', async () => {
    render(<AppForm />);
    
    const githubUrlInput = screen.getByLabelText(/GitHub URL/i);
    fireEvent.change(githubUrlInput, { target: { value: 'https://invalid-url.com' } });

    const submitButton = screen.getByRole('button', { name: /登録/i });
    fireEvent.click(submitButton);

    // GitHubのURLエラーメッセージの確認
    expect(await screen.findByText('有効なGitHubのURLを入力してください')).toBeInTheDocument();
  });

  it('ステータスの選択が正しく動作すること', () => {
    render(<AppForm />);
    
    const statusSelect = screen.getByLabelText(/ステータス/i);
    fireEvent.change(statusSelect, { target: { value: 'IN_PROGRESS' } });

    expect(statusSelect).toHaveValue('IN_PROGRESS');
    expect(screen.getByText('開発中')).toBeInTheDocument();
  });

  it('フォーム送信時にconsole.logが呼ばれること', () => {
    const consoleSpy = vi.spyOn(console, 'log');
    render(<AppForm />);
    
    // 必須フィールドを入力
    fireEvent.change(screen.getByLabelText(/アプリ名/i), { target: { value: 'テストアプリ' } });
    
    // フォーム送信
    fireEvent.click(screen.getByRole('button', { name: /登録/i }));
    
    expect(consoleSpy).toHaveBeenCalled();
    consoleSpy.mockRestore();
  });
});