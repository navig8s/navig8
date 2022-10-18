# Navig8s.dev
## Simplify and Visualize your Helm Deployments

[Logo *forthcoming from marketing*]

The Navig8 web user interface simpifies Kubernetes application deployment by guiding users through [Helm Chart values](https://helm.sh/docs/chart_best_practices/values/).

## Assumptions

- Navig8's initial design is lightweight: all functionality is in the web client for easy web hosting.
    - There is no persistence for values or back-end requirements, see the [Roadmap](#roadmap) section for more on this topic.
- The target Helm Chart repository is network accessible to the web client running Navig8.
    - OPTIONAL: the target Helm Chart has [values.schema.json](https://helm.sh/docs/topics/charts/#schema-files) and a `README.md`.
    - Navig8 leverages existing Helm Chart value specifications, see the [Roadmap](#roadmap) section for more on this topic.
- Navig8 provides `helm` commands for execution.

## Examples

- TODO: [install.kasten.io](https://install.kasten.io) is a public Navig8 instance for the K10 Helm Chart.

## Roadmap

- Launch Navig8 at KubeCon NA 2022 with open source license
- Take a look at GitHub issues.

- Move to good first issue, etc.:
    - Provision community facilities and guidance
        - e.g.: Code of Conduct, GitHub Issues, Discussions?
    - User Interface/eXperience:
    - Back-end:
    - Suggest Helm.sh upstream project improvements: