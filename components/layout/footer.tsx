import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="w-full py-6 bg-[#1a1a1a] text-[#ffffff]">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="flex flex-col space-y-2">
            <h3 className="text-lg font-semibold mb-2">Portfolio App Dashboard</h3>
            <p className="text-sm text-[#cccccc]">
              個人用ポートフォリオサイト掲載アプリ管理ダッシュボード
            </p>
          </div>
          
          <div className="flex flex-col space-y-2">
            <h3 className="text-lg font-semibold mb-2">リンク</h3>
            <a href="/privacy" className="text-sm text-[#cccccc] hover:text-[#ffffff] transition-colors">
              プライバシーポリシー
            </a>
            <a href="/terms" className="text-sm text-[#cccccc] hover:text-[#ffffff] transition-colors">
              利用規約
            </a>
            <a href="/contact" className="text-sm text-[#cccccc] hover:text-[#ffffff] transition-colors">
              お問い合わせ
            </a>
          </div>

          <div className="flex flex-col space-y-2">
            <h3 className="text-lg font-semibold mb-2">SNS</h3>
            <a 
              href="https://twitter.com/portfolio_dash" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-sm text-[#cccccc] hover:text-[#ffffff] transition-colors"
            >
              Twitter
            </a>
            <a 
              href="https://github.com/portfolio-dashboard" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-sm text-[#cccccc] hover:text-[#ffffff] transition-colors"
            >
              GitHub
            </a>
          </div>
        </div>

        <Separator className="my-6 bg-[#333333]" />

        <div className="text-center text-sm text-[#cccccc]">
          © {new Date().getFullYear()} Portfolio App Dashboard. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;