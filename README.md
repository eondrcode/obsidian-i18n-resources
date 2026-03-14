# Obsidian i18n Resources

<div align="center">

[![GitHub](https://img.shields.io/badge/GitHub-eondrcode%2Fobsidian--i18n--resources-blue?logo=github)](https://github.com/eondrcode/obsidian-i18n-resources)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](CONTRIBUTING.md)

**Obsidian 插件国际化翻译资源社区目录**

[English](#english) | [简体中文](#简体中文)

</div>

---

## 简体中文

### 项目简介

**Obsidian i18n Resources** 是一个专注于收集和管理 Obsidian 插件国际化翻译资源的社区驱动项目。本项目旨在为 Obsidian 用户提供一个便捷的翻译资源发现平台，帮助用户找到适合自己语言的插件翻译，同时也为翻译贡献者提供一个展示和分享翻译作品的平台。

Obsidian 作为一款强大的知识管理和笔记应用，拥有丰富的插件生态系统。然而，许多优秀的插件仅提供英文界面，这对于非英语母语的用户来说可能存在使用障碍。本项目通过整合社区翻译资源，让更多用户能够以母语使用 Obsidian 的各种插件，提升用户体验和工作效率。

### 核心功能

#### 📦 翻译仓库注册系统

本项目提供了一套完整的翻译仓库注册流程，翻译贡献者可以通过简单的 Issue 提交将自己的翻译仓库收录到社区目录中。整个流程完全自动化，包括仓库验证、数据采集、统计更新等环节，确保收录过程的便捷性和数据的准确性。

注册系统支持自动验证翻译仓库的合法性，检查必要的 `metadata.json` 文件格式，并自动提取翻译语言、插件列表等关键信息。管理员只需在 Issue 上添加标签即可完成审核，系统会自动处理后续的数据更新工作。

#### 📊 统计数据与排行榜

系统每日自动更新所有已收录翻译仓库的统计数据，包括但不限于：仓库 Stars 数量、翻译插件数量、支持语言种类、贡献者人数、近期活跃度等。这些数据不仅帮助用户了解各翻译仓库的质量和活跃程度，也为翻译贡献者提供了展示自己贡献的窗口。

排行榜系统根据多个维度对翻译仓库进行排名，包括按 Stars 数量排名、按活跃度评分排名、按贡献者排名等。活跃度评分算法综合考虑了翻译数量、更新频率、近期提交次数、社区关注度等多个因素，确保排名结果能够真实反映翻译仓库的质量和维护状态。

#### 🔥 活跃度评分算法

本项目采用了一套科学的活跃度评分算法，用于评估各翻译仓库的活跃程度和维护质量。评分算法主要考虑以下几个维度：

- **近期提交活跃度（35%）**：统计近 30 天内的提交次数，反映翻译仓库的维护活跃程度
- **翻译插件数量（25%）**：翻译的插件种类数量，体现翻译覆盖范围
- **社区关注度（15%）**：仓库获得的 Stars 数量，反映社区认可度
- **更新时效性（25%）**：距离上次更新的时间间隔，越近得分越高

评分结果归一化到 0-1 之间，方便用户直观比较各翻译仓库的活跃程度。已归档的仓库将获得 0 分，避免用户选择不再维护的翻译资源。

### 如何参与

#### 申请收录翻译仓库

如果您是翻译贡献者，希望将自己的翻译仓库收录到社区目录中，请按照以下步骤操作：

1. **准备翻译仓库**：确保您的翻译仓库包含有效的 `metadata.json` 文件，文件格式符合 Obsidian 插件翻译规范

2. **创建 Issue**：在本仓库创建一个新的 Issue，标题格式为 `[Register] 用户名/仓库名`，例如 `[Register] voxrs/obsidian-translations`

3. **等待审核**：系统会自动为您的 Issue 添加"申请收录"标签，管理员审核通过后会添加"同意收录"标签

4. **完成收录**：系统自动处理收录请求，更新注册表和统计数据，并在 Issue 中回复收录结果

#### 翻译仓库格式要求

为了确保翻译仓库能够被正确识别和收录，您的仓库需要包含以下文件：

**metadata.json**

```json
[
  {
    "plugin": "obsidian-git",
    "language": "zh-cn",
    "updated_at": "2026-03-13T09:00:36.339Z"
  },
  {
    "plugin": "obsidian-excalidraw-plugin",
    "language": "zh-cn",
    "updated_at": "2026-03-13T09:00:36.339Z"
  }
]
```

每个条目应包含以下字段：
- `plugin`：插件 ID（必填）
- `language`：翻译语言代码（必填）
- `updated_at`：翻译更新时间（可选）

### 项目结构

```
obsidian-i18n-resources/
├── .github/
│   └── workflows/
│       ├── register.yml    # 翻译仓库注册工作流
│       └── stats.yml       # 统计数据更新工作流
├── registry.json           # 已注册翻译仓库列表
├── stats.json              # 统计数据和排行榜
└── README.md               # 项目说明文档
```

#### 核心文件说明

**registry.json**

存储所有已注册翻译仓库的基本信息，包括仓库地址和注册时间。每次有新仓库被收录或现有仓库被移除时，此文件会自动更新。

```json
[
  {
    "repoAddress": "voxrs/obsidian-translations",
    "registeredAt": "2026-03-13T10:00:00.000Z"
  }
]
```

**stats.json**

存储详细的统计数据和排行榜信息，包括各仓库的详细指标、活跃度评分、排行榜数据等。此文件每日自动更新，确保数据的时效性。

主要包含以下数据结构：
- `repos`：各仓库的详细统计数据
- `leaderboard`：排行榜数据（按 Stars、活跃度、贡献者排名）
- `summary`：汇总统计（总仓库数、总翻译数、语言分布等）

### GitHub Actions 工作流

#### 注册工作流（register.yml）

注册工作流负责处理翻译仓库的收录申请，主要功能包括：

- **自动标签**：当新 Issue 标题以 `[Register]` 开头时，自动添加"申请收录"标签
- **审核处理**：当管理员添加"同意收录"标签时，自动验证仓库、采集数据、更新注册表
- **拒绝处理**：当管理员添加"拒绝收录"标签时，自动关闭 Issue 并通知申请人
- **移除处理**：当管理员添加"取消收录"标签时，自动从注册表中移除仓库并更新统计

#### 统计工作流（stats.yml）

统计工作流每日自动执行（UTC 16:00 / 北京时间 0:00），主要功能包括：

- **数据采集**：遍历所有已注册仓库，采集最新的统计数据
- **活跃度计算**：根据评分算法计算各仓库的活跃度得分
- **排行榜更新**：更新各维度的排行榜数据
- **汇总统计**：更新总体统计数据和语言分布

### 数据使用

本项目产生的统计数据可供社区自由使用，您可以：

- 在您的翻译仓库中展示收录状态和排名
- 开发第三方工具或网站展示翻译资源
- 进行 Obsidian 插件生态相关的数据分析

使用数据时请注明数据来源为本项目。

### 贡献指南

我们欢迎所有形式的贡献，包括但不限于：

- 📝 改进文档和说明
- 🐛 报告问题或提出建议
- 🔧 优化工作流代码
- 🌍 翻译本项目文档
- ⭐ 推荐本项目给其他用户

---

## English

### Overview

**Obsidian i18n Resources** is a community-driven project dedicated to collecting and managing internationalization translation resources for Obsidian plugins. This project aims to provide Obsidian users with a convenient platform for discovering translation resources, helping users find plugin translations in their native languages, while also offering translators a platform to showcase and share their translation work.

Obsidian, as a powerful knowledge management and note-taking application, boasts a rich plugin ecosystem. However, many excellent plugins only provide English interfaces, which may create usage barriers for non-native English speakers. This project integrates community translation resources, enabling more users to use various Obsidian plugins in their native languages, enhancing user experience and productivity.

### Core Features

#### 📦 Translation Repository Registration System

This project provides a complete translation repository registration workflow. Translation contributors can submit their translation repositories to the community directory through a simple Issue submission. The entire process is fully automated, including repository verification, data collection, and statistics updates, ensuring convenience and data accuracy.

The registration system automatically verifies the legitimacy of translation repositories, checks the format of required `metadata.json` files, and automatically extracts key information such as translation languages and plugin lists. Administrators only need to add labels to Issues to complete the review, and the system automatically handles subsequent data updates.

#### 📊 Statistics and Leaderboards

The system automatically updates statistics for all registered translation repositories daily, including but not limited to: repository Stars count, number of translated plugins, supported languages, contributor count, recent activity, etc. This data not only helps users understand the quality and activity level of each translation repository but also provides a window for translation contributors to showcase their contributions.

The leaderboard system ranks translation repositories based on multiple dimensions, including by Stars count, by activity score, by contributors, etc. The activity scoring algorithm comprehensively considers factors such as translation quantity, update frequency, recent commit count, and community attention, ensuring ranking results truly reflect the quality and maintenance status of translation repositories.

#### 🔥 Activity Scoring Algorithm

This project adopts a scientific activity scoring algorithm to evaluate the activity level and maintenance quality of each translation repository. The scoring algorithm mainly considers the following dimensions:

- **Recent Commit Activity (35%)**: Counts commits within the last 30 days, reflecting maintenance activity
- **Translation Plugin Count (25%)**: Number of translated plugin types, showing translation coverage
- **Community Attention (15%)**: Stars received by the repository, reflecting community recognition
- **Update Timeliness (25%)**: Time since last update, with more recent updates scoring higher

Scores are normalized to 0-1, making it easy for users to intuitively compare activity levels across translation repositories. Archived repositories receive a score of 0, preventing users from selecting unmaintained translation resources.

### How to Participate

#### Submitting a Translation Repository

If you are a translation contributor wishing to include your translation repository in the community directory, please follow these steps:

1. **Prepare Your Repository**: Ensure your translation repository contains a valid `metadata.json` file that conforms to Obsidian plugin translation specifications

2. **Create an Issue**: Create a new Issue in this repository with the title format `[Register] username/repository-name`, for example `[Register] voxrs/obsidian-translations`

3. **Wait for Review**: The system will automatically add the "申请收录" (Pending Review) label to your Issue. After administrator approval, a "同意收录" (Approved) label will be added

4. **Complete Registration**: The system automatically processes the registration request, updates the registry and statistics, and replies with the registration result in the Issue

#### Translation Repository Format Requirements

To ensure your translation repository can be correctly identified and registered, your repository needs to contain the following file:

**metadata.json**

```json
[
  {
    "plugin": "obsidian-git",
    "language": "zh-cn",
    "updated_at": "2026-03-13T09:00:36.339Z"
  },
  {
    "plugin": "obsidian-excalidraw-plugin",
    "language": "zh-cn",
    "updated_at": "2026-03-13T09:00:36.339Z"
  }
]
```

Each entry should contain the following fields:
- `plugin`: Plugin ID (required)
- `language`: Translation language code (required)
- `updated_at`: Translation update time (optional)

### Project Structure

```
obsidian-i18n-resources/
├── .github/
│   └── workflows/
│       ├── register.yml    # Translation repository registration workflow
│       └── stats.yml       # Statistics update workflow
├── registry.json           # Registered translation repositories list
├── stats.json              # Statistics and leaderboards
└── README.md               # Project documentation
```

### GitHub Actions Workflows

#### Registration Workflow (register.yml)

The registration workflow handles translation repository registration requests with the following main functions:

- **Auto Labeling**: When a new Issue title starts with `[Register]`, automatically adds the "申请收录" label
- **Approval Processing**: When an administrator adds the "同意收录" label, automatically verifies the repository, collects data, and updates the registry
- **Rejection Processing**: When an administrator adds the "拒绝收录" label, automatically closes the Issue and notifies the applicant
- **Removal Processing**: When an administrator adds the "取消收录" label, automatically removes the repository from the registry and updates statistics

#### Statistics Workflow (stats.yml)

The statistics workflow runs automatically daily (UTC 16:00), with the following main functions:

- **Data Collection**: Iterates through all registered repositories to collect the latest statistics
- **Activity Calculation**: Calculates activity scores for each repository based on the scoring algorithm
- **Leaderboard Updates**: Updates leaderboard data across all dimensions
- **Summary Statistics**: Updates overall statistics and language distribution

### Data Usage

The statistics data generated by this project is freely available for community use. You can:

- Display registration status and rankings in your translation repository
- Develop third-party tools or websites to display translation resources
- Conduct data analysis related to the Obsidian plugin ecosystem

Please credit this project as the data source when using the data.

### Contributing

We welcome all forms of contributions, including but not limited to:

- 📝 Improving documentation and instructions
- 🐛 Reporting issues or making suggestions
- 🔧 Optimizing workflow code
- 🌍 Translating project documentation
- ⭐ Recommending this project to other users


---

<div align="center">

**Made with ❤️ by the Obsidian i18n Community**

[⬆ Back to Top](#obsidian-i18n-resources)

</div>
