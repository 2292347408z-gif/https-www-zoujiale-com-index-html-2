# ZJL — Personal Portfolio

邹佳乐个人作品集网站，使用 React、Vite、GSAP、TechText 和 ScrollReveal 构建。

原 PDF 画面以完整页面图片的方式保存在 `public/pages` 中；网页只在画面外围增加排版、滚动和交互动效，不修改作品本身。

## 本地运行

需要 Node.js 18 或更高版本。

```bash
pnpm install
pnpm dev
```

如果使用 npm：

```bash
npm install
npm run dev
```

## 生产构建

```bash
pnpm build
pnpm preview
```

构建结果输出到 `dist/`。

## 上传到 GitHub

1. 在 GitHub 创建一个空仓库，不需要额外生成 README。
2. 解压源码包，在该目录打开终端。
3. 执行：

```bash
git init
git add .
git commit -m "Initial portfolio site"
git branch -M main
git remote add origin 你的仓库地址
git push -u origin main
```

## 部署到 Vercel

### 从 GitHub 导入（推荐）

1. 登录 Vercel，点击 **Add New → Project**。
2. 选择刚上传的 GitHub 仓库。
3. Vercel 会自动识别为 Vite 项目。
4. 保持以下配置后点击 **Deploy**：
   - Build Command：`pnpm build`
   - Output Directory：`dist`
   - Install Command：`pnpm install`

### 使用 Vercel CLI

```bash
npx vercel --prod
```

项目不需要环境变量，也不需要 React Bits Pro License Key。
