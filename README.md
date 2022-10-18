# Navig8s.dev
## Simplify and Visualize your Helm Deployments

[Logo *forthcoming from marketing*]

The Navig8 web user interface simpifies Kubernetes application deployment by guiding users through [Helm Chart values](https://helm.sh/docs/chart_best_practices/values/).

## Table of contents
* [Assumptions](#assumptions)
* [Local development](#local-development)
  + [Environment requirements](#environment-requirements)
  + [To start locally:](#to-start-locally)
    - [Using Makefile (from scratch)](#using-makefile-from-scratch)
    - [Using Makefile (after everything is already installed and set)](#using-makefile-after-everything-is-already-installed-and-set)
    - [Without Makefile (from scratch)](#without-makefile-from-scratch)
    - [Without Makefile (after everything is already installed and set)](#without-makefile-after-everything-is-already-installed-and-set)
* [Customization options](#customization-options)
  + [Build time environment variables for the FE:](#build-time-environment-variables-for-the-fe)
  + [Custom logo](#custom-logo)
  + [Themization](#themization)
* [Examples](#examples)
* [Roadmap](#roadmap)

## Assumptions
- Navig8's initial design is lightweight: all functionality is in the web client for easy web hosting.
    - There is no persistence for values or back-end requirements, see the [Roadmap](#roadmap) section for more on this topic.
- The target Helm Chart repository is network accessible to the web client running Navig8.
    - OPTIONAL: the target Helm Chart has [values.schema.json](https://helm.sh/docs/topics/charts/#schema-files) and a `README.md`.
    - Navig8 leverages existing Helm Chart value specifications, see the [Roadmap](#roadmap) section for more on this topic.
- Navig8 provides `helm` commands for execution.

## Local development
### Environment requirements
- [Node.js](https://nodejs.org/en/) with version ^16
- [pnpm](https://pnpm.io/) with version ^7
- (Optional) Makefile support

### To start locally:
#### Using Makefile (from scratch)
```shell
make install # Or run commands from the
cd frontend & cp .env.template .env # Add values for required variables there. Each variable is documented inside the file.
cd .. # Go to the root of the repo
make start
```
#### Using Makefile (after everything is already installed and set)
```shell
make start
```
#### Without Makefile (from scratch)
```shell
cd backend && pnpm install && pnpm start # Install and run backend
# Go to the separate terminal/cmd
cd frontend && pnpm install
cp .env.template .env # Add values for required variables there. Each variable is documented inside the file.
pnpm dev
```
#### Without Makefile (after everything is already installed and set)
```shell
cd backend && pnpm start # Install and run backend
# Go to the separate terminal/cmd
cd frontend && pnpm dev
```

## Customization options
### Build time environment variables for the FE:
| Name                        | Required | Description                                                                                                                                                                                                                                                 | Default                                                            |
|-----------------------------|----------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|--------------------------------------------------------------------|
| NAVIG8_REPO_URL             | *        | Url to the helm repository that is usually used in `helm add repo` command                                                                                                                                                                                  |                                                                    |
| NAVIG8_REPO_ENTRY           | *        | Entry is a unique key of the entries hash map (<br>https://helm.sh/docs/topics/chart_repository/#the-index-file<br>)                                                                                                                                        |                                                                    |
| NAVIG8_REPO_NAME            | *        | The name of the repo used in the command `helm repo add $NAVIG8_REPO_NAME $NAVIG8_REPO_URL`                                                                                                                                                                 |                                                                    |
| NAVIG8_PREDEFINED_NAMESPACE |          | The k8s namespace that will be created and used for the helm installation                                                                                                                                                                                   |                                                                    |
| NAVIG8_CORS_PROXY_URL       |          | This value is usually used for the local development or for a package solutions like Docker image where cors proxy in the backend folder could be run<br><br>You probably don't need to edit it                                                             |                                                                    |
| NAVIG8_FAVICON              |          | Icon that can be usually seen inside the tab of the browser and is usually important for crawlers of social media, chat applications and search engines.                                                                                                    | http://localhost:9000/ (Is used by CORS proxy in `backend` folder) |
| NAVIG8_SEO_TITLE            |          | A small string that represent the content of the page that can be usually seen inside the tab of the browser and is usually important for crawlers of social media, chat applications and search engines.                                                   |                                                                    |
| NAVIG8_METAS                |          | A json string with data for custom `<meta>` elements in html<br><br>The structure is (Typescript definition):<br>`type Metas = Array<{name: string, content: string}>`<br><br>Example: <br>`[{"name": "description", "content": "This is my description"}]` | []                                                                 |
| NAVIG8_LINKS                |          | A json string with attributes for custom `<link>` elements in html<br><br>The structure is (Typescript definition):<br>`type Links = Array<Record<string, string>>`<br><br>Example: `[{"rel": "canonical", "href": "http://example.com"}]`                  | []                                                                 |

### Custom logo
By default an `icon` from the manifest of specified helm repo is used as logo in the header of the interface.

It can be overwritten with css rule `background-image` inside `.logo` class in the `frontend/light.css` that is responsible for light theme (We assume that we will support dark theme as well in the nearest future) 

### Themization
The interface is built using [PrimeVue UI-kit](https://www.primefaces.org/primevue/) that makes it possible to customize theme. 

It's possible to make color scheme more brand specific by setting it css variable in `frontend/light.css` file that is dedicated to CSS overwrites for the light theme (We assume that we will support dark theme as well in the nearest future).

[There is](https://www.primefaces.org/primevue/colors) a description color palettes that this UI-kit uses.

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