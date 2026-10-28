# Workflow 接入简介

这份模板为前端项目提供一套从需求澄清到代码交付的 AI 工作流：先由人确认需求和任务拆分，再授权 Codex 实现、验证和独立审查，最后交付正式 PR 供人工审核。模板自带 Vue 3、TypeScript、Vite 示例，以及项目规则、skills 和质量检查。

## 接入准备

- 使用支持子代理和 Git worktree 的 Codex 环境，安装 Git、Python 3、GitHub CLI（`gh`），并确认 Git 身份、`gh` 登录及目标仓库的 Issue、标签、关联关系和 PR 权限。
- 当前实现面向 GitHub：需要目标仓库支持原生父子 Issue 和阻塞关系。其他平台需要另行适配，不能只修改仓库地址。
- 模板工程使用 Node 24.11.x 和 npm 11。新项目可基于模板建仓库；已有项目应结合自身技术栈迁入工作流文件和规则，保留并适配已有工程配置，不要直接覆盖业务代码。

## 配置目标项目

1. 将 Git `origin` 指向目标仓库，并在 `.workflow/config.json` 中更新 `tracker.repo`、`tracker.remote`、规则路径和实际检查命令；同步更新 `docs/agents/issue-tracker.md` 和 `package.json` 的仓库地址。
2. 审阅 `AGENTS.md` 和 `docs/agents/` 中的就绪标准、标签、领域规则和验证要求，按目标项目补充真实约束。确认 CI 与本地使用一致的检查命令。
3. 保留 `.agents/skills/`、`.workflow/` 中的依赖和版本记录，以及对应检查脚本；不要复制旧项目的 `.workflow-local/` 运行状态。上游 skills 是固定版本，更新时需同步锁文件并审查变更。
4. 确保仓库已有初始提交，然后安装依赖并验证。以下命令适用于本模板；已有项目应使用配置中声明的对应命令。

```sh
npm ci
npx playwright install chromium
npm run workflow:check
npm run check:all
```

`workflow:check` 是离线配置与完整性检查；`check:all` 还会运行类型、lint、格式、测试、构建和 Chromium E2E。检查通过不等于 GitHub 权限或完整远程流程已验证，首次接入还需在目标仓库验证真实操作。

## 如何使用

从目标项目根目录启动 Codex，发现项目 skills 后：

1. **`$workflow-clarify-spec`**：提供需求、设计及 API 资料，在这一阶段补充和核验全部契约，澄清全部就绪条件并批准精确全文；发布后为 `Spec + ready-for-agent`。输入不足时按最小门槛和来源承载规则决定继续追问或创建 `needs-info` 草案。
2. **`$workflow-plan-tickets`**：人工启动，复用已确认的 API，审核至少一张票的完整计划，批准后发布并核实原生父子及阻塞关系。计划批准仅授权发布票集。
3. **`$workflow-implement-tickets`**：人工明确授权并启动；独立票默认最多两个 worker 在隔离 worktree 编码，串行集成和验证；独立审查与最终完整门禁通过后创建正式 PR，并安全清理任务自有临时分支。

规格批准、方案批准与实现授权各自记录，不能互相推断。最终由人审核和合并 PR；部署后冒烟按需人工触发，当前没有独立 smoke skill。受阻时保留主状态与证据，按规则使用 `waiting-for-human` 并在人工明确恢复后移除。

详细规则见 [项目入口](../AGENTS.md)、[配置](../.workflow/config.json) 和 [验证约定](agents/verification.md)。[工作流手册](ai-frontend-workflow.md) 说明当前流程。
