# Workflow Template

可直接开发的 Vue 3 + TypeScript + Vite npm 项目，内置完整 Matt skills，再增加三个自有 workflow skills。GitHub 仓库：[linziyao1998-eng/workflow-template](https://github.com/linziyao1998-eng/workflow-template)。

## 开始使用

使用 Node 24.11.x 和 npm 11：

```sh
npm ci
npx playwright install chromium
npm run dev
```

验证：

```sh
npm run check
npm run check:all
```

开发依赖在 package-lock.json 中固定；CI 使用 npm ci。测试界面是无持久化计数器，可替换为真实业务。门禁会真正执行，失败返回非零状态。

## 目录

| 路径                       | 用途                                          |
| -------------------------- | --------------------------------------------- |
| src/                       | Vue 示例与组件测试                            |
| e2e/                       | Chromium 浏览器测试                           |
| .agents/skills/            | 全部上游 skills、3 个自有入口、common         |
| .workflow/config.json      | 当前仓库、规则、依赖与门禁配置                |
| .workflow/skills-lock.json | 来源版本和完整文件哈希                        |
| docs/agents/               | 就绪、标签、tracker、领域、验证和 skills 说明 |
| docs/adr/                  | 后续真实架构决策                              |
| scripts/                   | 离线 workflow 接入检查及其测试                |
| .github/                   | CI、Issue 与 PR 模板                          |
| .workflow-local/           | 运行时按需创建，Git 忽略，保存恢复状态        |

## 使用工作流

从本项目根目录启动 Codex，下一轮发现项目内 skills 后，可分别显式调用：

1. `$workflow-clarify-spec`：澄清并批准当前版本规格。
2. `$workflow-plan-tickets`：人工启动，审核并发布完整票集。
3. `$workflow-implement-tickets`：人工授权，实现、独立审查、完整门禁后提交正式 PR。

上游 skills 保持可用。项目规则与三个增强入口的区别见 [AGENTS.md](AGENTS.md)；安装来源与兼容范围见 [skills 说明](docs/agents/skills.md)。自有入口依赖 Codex 子代理、Git/worktree、Python 3、gh 登录及 GitHub 所需权限。本地静态检查不替代宿主能力和真实 GitHub 流程验收。

模板库初次提交前 Git 没有 HEAD；正式实现与代码审查前应先保存并审核初始提交。此工程初始化不会自动创建真实规格或代替人工批准。

## 复制到其他业务项目

更新 Git origin 与 .workflow/config.json 的 tracker.repo/remote，同步 docs/agents/issue-tracker.md 和 package.json.repository；审阅项目规则和门禁适用条件，再运行 npm run workflow:check。使用目标项目自己的 Node/工具链时同步工程配置与 CI。不要携带 .workflow-local 中的旧项目状态。

上游 skills 是固定版本的项目副本，不会自动更新。升级时保留来源、审阅变化并重新验证，不能直接覆盖后继续引用旧验证结论。不会因初始化生成缺乏领域事实的 CONTEXT.md。
