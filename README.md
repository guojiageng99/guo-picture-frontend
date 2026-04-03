# guo-picture-frontend（图多多云图库 · 前端）

**图多多云图库** 的 Web 前端：**Vue 3 + TypeScript + Vite**，对接后端 Spring Boot API（用户、图片、空间、分类标签、消息、**AI 扩图**等）。后端需单独启动，见下文「与后端联调」。

| 项目 | 说明 |
|------|------|
| **本仓库** | 前端 SPA |
| **后端仓库** | `guo-picture-backend`（默认端口 **9123**，上下文 **`/api`**） |

---

## 技术栈

| 类别 | 依赖 |
|------|------|
| 框架 | Vue 3、Vue Router 4、Pinia |
| 构建 | Vite 5、TypeScript ~5.6 |
| UI | Ant Design Vue 4、@ant-design/icons-vue |
| 请求 | Axios（实例与超时见 `src/request.ts`） |
| 图表 | ECharts 6、vue-echarts、echarts-wordcloud |
| 其他 | dayjs、file-saver、vue-cropper、vue3-colorpicker |

OpenAPI 客户端代码通过 `@umijs/openapi` 生成（`npm run openapi`，配置见 `openapi.config.js`）。

---

## 环境要求

- **Node.js**：建议 **20 LTS** 或 **22**（与 `@tsconfig/node22` 等 dev 依赖一致）
- 包管理器：**npm**（或 pnpm / yarn，需自行等价替换命令）

---

## 快速开始

```bash
cd guo-picture-frontend
npm install
npm run dev
```

- 开发服务器默认：**http://localhost:5173**（`vite.config.ts` 中 `host: 0.0.0.0` 时可局域网访问）。
- 接口走 **`/api/...`**，由 Vite 代理到后端 **`http://localhost:9123`**（勿写死带端口的后端域名，避免 Cookie 跨域问题）。

---

## 常用脚本

| 命令 | 说明 |
|------|------|
| `npm run dev` | 开发模式（热更新） |
| `npm run build` | `vue-tsc` 类型检查 + `vite build` 生产构建 |
| `npm run build-only` | 仅 Vite 构建（跳过类型检查） |
| `npm run pure-build` | 同 `vite build` |
| `npm run preview` | 本地预览构建产物 |
| `npm run openapi` | 根据后端 Swagger 生成 `src/api` 等请求代码（需后端已启动） |
| `npm run type-check` | 仅 TypeScript / Vue 类型检查 |
| `npm run lint` | ESLint 检查并尝试自动修复 |
| `npm run format` | Prettier 格式化 `src/` |

---

## 与后端联调

1. 启动后端（默认 **http://localhost:9123**，上下文 **`/api`**）。  
2. 本仓库 `vite.config.ts` 已将 **`/api`** 代理到 **`http://localhost:9123`**，并开启 **WebSocket**（`ws: true`）。  
3. 前端业务代码里请求路径使用 **`/api/...`**。

若后端地址或端口变更，请同步修改 `vite.config.ts` 中 `server.proxy['/api'].target`。

### 生成 API 代码

`openapi.config.js` 中 `schemaPath` 一般为：

`http://localhost:9123/api/v2/api-docs`

请先启动后端，再执行：

```bash
npm run openapi
```

生成结果输出目录以 `openapi.config.js` 中 `serversPath` 为准（通常为 `./src`）。

### 请求超时（重要）

全局 Axios 实例在 **`src/request.ts`** 中配置，**默认超时为 60000 ms（60 秒）**，与后端通过 URL 下载图片（如 **应用 AI 扩图结果**、URL 上传）的耗时相匹配。

若仍出现超时，可在此调大 `timeout`；后端对应项为 `picture.url-download-timeout-ms`（见后端 `application.yml`）。

---

## 目录与功能说明

- 源码：**`src/`**，路径别名 **`@`** → `src/`（见 `vite.config.ts`）。
- 路由：**`src/router/index.ts`**  
- 主要页面：**`src/pages/`**  
  - 首页、登录/注册、个人资料、消息中心  
  - 图片：创建（含裁剪、**AI 扩图** `ImageOutPainting`）、批量创建、详情、搜索、管理  
  - 空间：创建、详情、我的空间、团队空间、分析、成员管理、后台空间管理  
  - 管理端：用户 / 图片 / 标签 / 分类管理  
- WebSocket 等与编辑协同相关逻辑见 **`src/utils/pictureEditWebSocket.ts`** 等。

---

## 生产部署注意

- `src/request.ts` 中生产环境 `PROD_BASE_URL` 需按部署方式填写（例如与前端同域反向代理到后端，或完整后端 origin），并保证 **`withCredentials`** 与 Cookie 域策略一致。

---

## 推荐 IDE

[VS Code](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar)。Vue 3 项目请勿再启用 Vetur 处理 `.vue`。

TypeScript 对 `.vue` 的类型检查依赖 **vue-tsc**。

---

## 相关仓库

- **后端**：`guo-picture-backend`  
- 接口文档（Knife4j）：**http://localhost:9123/api/doc.html**（以后端实际配置为准）

---

## 更多参考

- [Vite 配置](https://vite.dev/config/)
