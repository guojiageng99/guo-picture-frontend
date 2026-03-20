# guo-picture-frontend

Guo Picture 项目的前端：**Vue 3 + TypeScript + Vite**，对接后端 API（用户、图片、空间、分析等）。后端需单独启动，见下文「与后端联调」。

---

## 技术栈

| 类别 | 依赖 |
|------|------|
| 框架 | Vue 3、Vue Router 4、Pinia |
| 构建 | Vite 5、TypeScript |
| UI | Ant Design Vue 4、@ant-design/icons-vue |
| 请求 | Axios（封装见 `src/request`） |
| 图表 | ECharts、vue-echarts、echarts-wordcloud |
| 其他 | dayjs、file-saver、vue-cropper、vue3-colorpicker |

OpenAPI 客户端代码通过 `@umijs/openapi` 生成（`npm run openapi`）。

---

## 环境要求

- **Node.js**：建议 **20 LTS** 或 **22**（与 `@tsconfig/node22` 等 dev 依赖一致）
- 包管理器：npm（或 pnpm / yarn，需自行等价替换命令）

---

## 快速开始

```bash
cd E:\code\guo-picture-frontend
npm install
npm run dev
```

开发服务器默认：**http://localhost:5173**（`host: 0.0.0.0` 时也可局域网访问）。

---

## 常用脚本

| 命令 | 说明 |
|------|------|
| `npm run dev` | 开发模式（热更新） |
| `npm run build` | `vue-tsc` 类型检查 + `vite build` 生产构建 |
| `npm run build-only` | 仅 Vite 构建（跳过类型检查） |
| `npm run pure-build` | 同 `vite build` |
| `npm run preview` | 本地预览构建产物 |
| `npm run openapi` | 根据后端 Swagger 文档生成 `src` 下的请求代码（需后端已启动） |
| `npm run type-check` | 仅 TypeScript / Vue 类型检查 |
| `npm run lint` | ESLint 检查并尝试自动修复 |
| `npm run format` | Prettier 格式化 `src/` |

---

## 与后端联调

1. 启动后端（默认 **http://localhost:9123**，上下文 **`/api`**）。
2. 本仓库 `vite.config.ts` 已将 **`/api`** 代理到 **`http://localhost:9123`**，并开启 **WebSocket** 代理。
3. 前端请求应使用 **`/api/...`** 路径，由开发服务器转发到后端。

若后端地址或端口变更，请同步修改 `vite.config.ts` 中的 `server.proxy['/api'].target`。

### 生成 API 代码

`openapi.config.js` 中 `schemaPath` 为：

`http://localhost:9123/api/v2/api-docs`

请先启动后端，再执行：

```bash
npm run openapi
```

生成结果输出在 `./src`（与 `serversPath` 配置一致）。

---

## 目录与路由说明

- 源码目录：`src/`，路径别名 **`@`** 指向 `src/`（见 `vite.config.ts`）。
- 主要页面在 `src/pages/`，路由定义见 `src/router/index.ts`，功能包括：
  - 首页、用户登录/注册  
  - 图片：创建、批量创建、详情、搜索、管理  
  - 空间：创建、详情、我的空间、团队空间、分析、成员管理、后台空间管理  
  - 管理端：用户管理、图片管理、空间管理  

---

## 推荐 IDE

[VS Code](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar)。Vue 3 项目请勿再启用 Vetur 处理 `.vue`。

TypeScript 对 `.vue` 的类型依赖 **vue-tsc**；编辑器需 Volar 才能较好解析单文件组件类型。

---

## 相关仓库

- 后端（Spring Boot）：与前端配套的 API 服务，通常位于 `guo-picture-backend` 工程；端口 **9123**、接口文档一般为 **http://localhost:9123/api/doc.html**（Knife4j，以后端实际配置为准）。

---

## 更多配置

- Vite：[官方配置文档](https://vite.dev/config/)
